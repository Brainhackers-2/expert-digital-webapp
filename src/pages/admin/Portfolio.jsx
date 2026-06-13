import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, Calendar, X, Globe, User } from 'lucide-react';
import { ImageUploader } from '../../components/admin/ImageUploader';

export const PortfolioAdmin = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Sites Web',
    description: '',
    image_url: '',
    gallery_urls: '', // will be split by newline
    client_name: '',
    realized_at: '',
    is_published: true
  });

  const categories = [
    'Sites Web',
    'Réseaux Sociaux',
    'Branding & Design',
    'Stratégie Digitale'
  ];

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('realized_at', { ascending: false });
      
      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error('Error fetching portfolio items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Sites Web',
      description: '',
      image_url: '',
      gallery_urls: '',
      client_name: '',
      realized_at: new Date().toISOString().slice(0, 10),
      is_published: true
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setIsEditing(true);
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category || 'Sites Web',
      description: item.description || '',
      image_url: item.image_url || '',
      gallery_urls: item.gallery_urls ? item.gallery_urls.join('\n') : '',
      client_name: item.client_name || '',
      realized_at: item.realized_at ? new Date(item.realized_at).toISOString().slice(0, 10) : '',
      is_published: item.is_published ?? true
    });
    setModalOpen(true);
  };

  const handleTogglePublished = async (item) => {
    const newStatus = !item.is_published;
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .update({ is_published: newStatus })
        .eq('id', item.id);
      
      if (error) throw error;
      setItems(items.map(i => i.id === item.id ? { ...i, is_published: newStatus } : i));
    } catch (err) {
      console.error('Error toggling portfolio item status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce projet de votre portfolio ?')) return;

    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setItems(items.filter(i => i.id !== id));
    } catch (err) {
      console.error('Error deleting portfolio item:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const galleryArray = formData.gallery_urls
      ? formData.gallery_urls.split('\n').map(url => url.trim()).filter(Boolean)
      : [];

    const payload = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      image_url: formData.image_url,
      gallery_urls: galleryArray,
      client_name: formData.client_name,
      realized_at: formData.realized_at || null,
      is_published: formData.is_published
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('portfolio_items')
          .update(payload)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('portfolio_items')
          .insert([payload]);

        if (error) throw error;
      }

      setModalOpen(false);
      fetchPortfolio();
    } catch (err) {
      console.error('Error saving portfolio item:', err);
      alert('Erreur lors de l\'enregistrement de la réalisation.');
    }
  };

  const filteredItems = items.filter(i => 
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (i.category && i.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (i.client_name && i.client_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion du Portfolio</h1>
          <p className="text-sm text-gray-500">Gérez les projets et réalisations affichés dans la galerie publique.</p>
        </div>
        
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 text-sm font-semibold bg-secondary text-white hover:bg-secondary/95 px-5 py-2.5 rounded-xl transition-all shadow-md shadow-secondary/20 shrink-0"
        >
          <Plus size={18} />
          Ajouter un Projet
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Rechercher un projet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Portfolio Items Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
                !item.is_published ? 'border-dashed border-gray-300 opacity-75' : 'border-gray-100'
              }`}
            >
              {/* Image Preview & Category Badge */}
              <div className="relative aspect-video w-full bg-gray-100 border-b border-gray-100 overflow-hidden">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-semibold">
                    Aucune Image
                  </div>
                )}
                
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-primary text-white shadow-sm">
                  {item.category}
                </span>

                <button
                  onClick={() => handleTogglePublished(item)}
                  className={`absolute top-3 right-3 p-1.5 rounded-lg border backdrop-blur-md shadow-sm transition-all ${
                    item.is_published 
                      ? 'bg-white/95 border-emerald-100 text-emerald-600' 
                      : 'bg-white/90 border-gray-200 text-gray-400'
                  }`}
                  title={item.is_published ? 'En ligne - Cliquer pour masquer' : 'Brouillon - Cliquer pour publier'}
                >
                  {item.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-900 leading-snug text-base line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                    {item.description || 'Aucune description fournie.'}
                  </p>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50 text-[11px] text-gray-500 font-medium">
                  <span className="flex items-center gap-1 truncate">
                    <User size={13} className="text-gray-400" />
                    {item.client_name || 'Client Inconnu'}
                  </span>
                  <span className="flex items-center gap-1 justify-end">
                    <Calendar size={13} className="text-gray-400" />
                    {item.realized_at ? new Date(item.realized_at).toLocaleDateString('fr-FR', {
                      year: 'numeric', month: 'short'
                    }) : 'Non daté'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-50 flex justify-end gap-1.5">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-500 hover:text-red-650 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 text-gray-400">
          Aucun projet dans le portfolio.
        </div>
      )}

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Modifier la Réalisation' : 'Ajouter une Réalisation'}
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
                    <label className="text-xs font-bold text-gray-700 uppercase">Titre du projet *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Ex: Site e-commerce d'artisanat"
                    />
                  </div>

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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Client Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Nom du client</label>
                    <input
                      type="text"
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Ex: Atelier Fleuriste de Dakar"
                    />
                  </div>

                  {/* Realized At */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Date de réalisation</label>
                    <input
                      type="date"
                      value={formData.realized_at}
                      onChange={(e) => setFormData({ ...formData, realized_at: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Description du projet</label>
                  <textarea
                    rows="4"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Détails du projet, défis, technologies utilisées, résultats..."
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <ImageUploader 
                    label="Image Principale"
                    helpText="Format recommandé: 16:9 (ex: 1200x675px)"
                    value={formData.image_url}
                    onChange={(val) => setFormData({ ...formData, image_url: val })}
                  />
                </div>

                {/* Gallery URLs */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Galerie d'images secondaires (URLs - une par ligne)</label>
                  <textarea
                    rows="3"
                    value={formData.gallery_urls}
                    onChange={(e) => setFormData({ ...formData, gallery_urls: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="https://images.unsplash.com/image1&#10;https://images.unsplash.com/image2"
                  />
                </div>

                {/* Toggle Published */}
                <div className="flex items-center gap-3 pt-2">
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