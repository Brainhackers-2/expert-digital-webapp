import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, Star, MessageSquare, X, User } from 'lucide-react';
import { ImageUploader } from '../../components/admin/ImageUploader';

export const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    client_name: '',
    company: '',
    rating: 5,
    message: '',
    photo_url: '',
    is_published: true
  });

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      client_name: '',
      company: '',
      rating: 5,
      message: '',
      photo_url: '',
      is_published: true
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (t) => {
    setIsEditing(true);
    setEditingId(t.id);
    setFormData({
      client_name: t.client_name,
      company: t.company || '',
      rating: t.rating || 5,
      message: t.message || '',
      photo_url: t.photo_url || '',
      is_published: t.is_published ?? true
    });
    setModalOpen(true);
  };

  const handleTogglePublished = async (t) => {
    const newStatus = !t.is_published;
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_published: newStatus })
        .eq('id', t.id);
      
      if (error) throw error;
      setTestimonials(testimonials.map(item => item.id === t.id ? { ...item, is_published: newStatus } : item));
    } catch (err) {
      console.error('Error toggling testimonial status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce témoignage ?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setTestimonials(testimonials.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting testimonial:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.client_name || !formData.message) return;

    const payload = {
      client_name: formData.client_name,
      company: formData.company,
      rating: parseInt(formData.rating),
      message: formData.message,
      photo_url: formData.photo_url,
      is_published: formData.is_published
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('testimonials')
          .update(payload)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([payload]);

        if (error) throw error;
      }

      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      console.error('Error saving testimonial:', err);
      alert('Erreur lors de l\'enregistrement du témoignage.');
    }
  };

  const filteredTestimonials = testimonials.filter(t => 
    t.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.company && t.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
    t.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Témoignages</h1>
          <p className="text-sm text-gray-500">Modérez et gérez les avis clients visibles sur le site web.</p>
        </div>
        
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 text-sm font-semibold bg-secondary text-white hover:bg-secondary/95 px-5 py-2.5 rounded-xl transition-all shadow-md shadow-secondary/20 shrink-0"
        >
          <Plus size={18} />
          Ajouter un Avis
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Rechercher un témoignage..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredTestimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTestimonials.map((t) => (
            <div 
              key={t.id} 
              className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
                !t.is_published ? 'border-dashed border-gray-300 opacity-75' : 'border-gray-100'
              }`}
            >
              <div className="p-6 space-y-4">
                {/* Author Info */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-light border border-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center text-primary font-bold">
                      {t.photo_url ? (
                        <img src={t.photo_url} alt={t.client_name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={20} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm leading-tight">{t.client_name}</h4>
                      <p className="text-xs text-gray-500">{t.company || 'Client individuel'}</p>
                    </div>
                  </div>
                  
                  {/* Status Toggle & Rating */}
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < (t.rating || 5) ? 'fill-current' : 'text-gray-200'} 
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => handleTogglePublished(t)}
                      className={`p-1 px-2.5 rounded-lg border text-[10px] font-bold transition-colors ${
                        t.is_published 
                          ? 'text-emerald-600 bg-emerald-50 border-emerald-100 hover:bg-emerald-100' 
                          : 'text-gray-400 bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {t.is_published ? 'En ligne' : 'Masqué'}
                    </button>
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <p className="text-xs text-gray-600 leading-relaxed italic pr-4 pl-2 border-l-2 border-primary/20">
                    "{t.message}"
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-50 flex justify-end gap-1">
                <button
                  onClick={() => handleOpenEditModal(t)}
                  className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 text-gray-400">
          Aucun témoignage trouvé.
        </div>
      )}

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Modifier le Témoignage' : 'Ajouter un Témoignage'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-xl transition-all">
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Client Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Nom du client *</label>
                    <input
                      type="text"
                      required
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Ex: Fatou Diop"
                    />
                  </div>

                  {/* Company/Role */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Entreprise / Poste</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Ex: Directrice, Dakar Mode"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Rating */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Note (1 à 5 étoiles) *</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      {[5, 4, 3, 2, 1].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Étoile' : 'Étoiles'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Photo URL */}
                  <div className="space-y-2">
                    <ImageUploader 
                      label="Photo de profil"
                      helpText="Format carré recommandé"
                      value={formData.photo_url}
                      onChange={(val) => setFormData({ ...formData, photo_url: val })}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Avis / Témoignage *</label>
                  <textarea
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Écrivez le message de recommandation du client..."
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