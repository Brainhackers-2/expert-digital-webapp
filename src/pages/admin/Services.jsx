import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, Sparkles, X, Check } from 'lucide-react';

export const ServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Création de sites web',
    short_description: '',
    long_description: '',
    icon: 'Globe',
    image_url: '',
    display_order: 0,
    is_published: true
  });

  const categories = [
    'Création de sites web',
    'Gestion des réseaux sociaux',
    'Identité Visuelle',
    'Stratégie Digitale',
    'SEO & Référencement'
  ];

  const icons = ['Globe', 'Megaphone', 'Palette', 'TrendingUp', 'Search', 'Briefcase', 'Layers', 'MessageSquare'];

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Auto-generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/-+/g, '-'); // Replace multiple - with single -
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : generateSlug(title)
    }));
  };

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Création de sites web',
      short_description: '',
      long_description: '',
      icon: 'Globe',
      image_url: '',
      display_order: services.length + 1,
      is_published: true
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (service) => {
    setIsEditing(true);
    setEditingId(service.id);
    setFormData({
      title: service.title,
      slug: service.slug,
      category: service.category || 'Création de sites web',
      short_description: service.short_description || '',
      long_description: service.long_description || '',
      icon: service.icon || 'Globe',
      image_url: service.image_url || '',
      display_order: service.display_order || 0,
      is_published: service.is_published ?? true
    });
    setModalOpen(true);
  };

  const handleTogglePublished = async (service) => {
    const newStatus = !service.is_published;
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_published: newStatus })
        .eq('id', service.id);
      
      if (error) throw error;
      setServices(services.map(s => s.id === service.id ? { ...s, is_published: newStatus } : s));
    } catch (err) {
      console.error('Error toggling service status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce service ?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setServices(services.filter(s => s.id !== id));
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) return;

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('services')
          .update({
            title: formData.title,
            slug: formData.slug,
            category: formData.category,
            short_description: formData.short_description,
            long_description: formData.long_description,
            icon: formData.icon,
            image_url: formData.image_url,
            display_order: parseInt(formData.display_order),
            is_published: formData.is_published,
            updated_at: new Date()
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('services')
          .insert([
            {
              title: formData.title,
              slug: formData.slug,
              category: formData.category,
              short_description: formData.short_description,
              long_description: formData.long_description,
              icon: formData.icon,
              image_url: formData.image_url,
              display_order: parseInt(formData.display_order),
              is_published: formData.is_published
            }
          ]);

        if (error) throw error;
      }

      setModalOpen(false);
      fetchServices();
    } catch (err) {
      console.error('Error saving service:', err);
      alert('Erreur lors de l\'enregistrement. Le Slug est peut-être déjà utilisé.');
    }
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Services</h1>
          <p className="text-sm text-gray-500">Ajoutez, modifiez ou organisez les services proposés sur le site.</p>
        </div>
        
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 text-sm font-semibold bg-secondary text-white hover:bg-secondary/95 px-5 py-2.5 rounded-xl transition-all shadow-md shadow-secondary/20 shrink-0"
        >
          <Plus size={18} />
          Ajouter un Service
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Rechercher un service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Services Grid/List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
                !service.is_published ? 'border-dashed border-gray-300 opacity-75' : 'border-gray-100'
              }`}
            >
              <div className="p-6 space-y-4">
                {/* Service Header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="p-3 bg-light text-primary rounded-xl font-bold">
                    {service.icon || 'Globe'}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-500 font-semibold px-2 py-1 rounded-md">
                      Ordre : {service.display_order}
                    </span>
                    <button
                      onClick={() => handleTogglePublished(service)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        service.is_published 
                          ? 'text-emerald-600 bg-emerald-50 border-emerald-100 hover:bg-emerald-100' 
                          : 'text-gray-400 bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                      title={service.is_published ? 'En ligne - Cliquer pour masquer' : 'Brouillon - Cliquer pour publier'}
                    >
                      {service.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>

                {/* Service Text */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                    {service.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">{service.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                    {service.short_description || 'Aucune description courte.'}
                  </p>
                </div>
              </div>

              {/* Service Actions */}
              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex justify-between items-center gap-2">
                <span className="text-[11px] font-medium text-gray-400 truncate">
                  Slug: {service.slug}
                </span>
                
                <div className="flex gap-1">
                  <button
                    onClick={() => handleOpenEditModal(service)}
                    className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 text-gray-400">
          Aucun service trouvé.
        </div>
      )}

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Modifier le Service' : 'Ajouter un Service'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-xl transition-all">
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4 max-h-[calc(100vh-16rem)] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Titre du Service *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleTitleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Ex: Refonte Site E-commerce"
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Slug d'URL *</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
                      placeholder="ex-refonte-site-ecommerce"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Catégorie *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      {categories.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Icon */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Icône *</label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      {icons.map((ic, i) => (
                        <option key={i} value={ic}>{ic}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Short Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Description Courte * (Preview)</label>
                  <textarea
                    required
                    rows="2"
                    value={formData.short_description}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Une courte phrase d'accroche pour la grille des services..."
                  />
                </div>

                {/* Long Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Description Longue / Contenu Détaillé</label>
                  <textarea
                    rows="5"
                    value={formData.long_description}
                    onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Contenu complet affiché sur la page détaillée du service..."
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase">URL de l'image descriptive</label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="https://images.unsplash.com/..."
                  />
                  {formData.image_url && (
                    <div className="mt-2 relative rounded-xl overflow-hidden h-32 w-full border border-gray-200">
                      <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Display Order */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Ordre d'affichage</label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Toggle Published */}
                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="is_published"
                      checked={formData.is_published}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:outline-none"
                    />
                    <label htmlFor="is_published" className="text-sm font-semibold text-gray-700">
                      Publier immédiatement en ligne
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 font-semibold rounded-xl text-sm transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white hover:bg-primary/95 font-semibold rounded-xl text-sm transition-all shadow-sm"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};