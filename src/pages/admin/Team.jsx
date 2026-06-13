import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit2, Trash2, Search, Linkedin, X, User } from 'lucide-react';

export const TeamAdmin = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    role: '',
    bio: '',
    photo_url: '',
    linkedin_url: '',
    display_order: 0
  });

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      setMembers(data || []);
    } catch (err) {
      console.error('Error fetching team members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      full_name: '',
      role: '',
      bio: '',
      photo_url: '',
      linkedin_url: '',
      display_order: members.length + 1
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (member) => {
    setIsEditing(true);
    setEditingId(member.id);
    setFormData({
      full_name: member.full_name,
      role: member.role || '',
      bio: member.bio || '',
      photo_url: member.photo_url || '',
      linkedin_url: member.linkedin_url || '',
      display_order: member.display_order || 0
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce membre de l\'équipe ?')) return;

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setMembers(members.filter(m => m.id !== id));
    } catch (err) {
      console.error('Error deleting team member:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name) return;

    const payload = {
      full_name: formData.full_name,
      role: formData.role,
      bio: formData.bio,
      photo_url: formData.photo_url,
      linkedin_url: formData.linkedin_url,
      display_order: parseInt(formData.display_order) || 0
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('team_members')
          .update(payload)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([payload]);

        if (error) throw error;
      }

      setModalOpen(false);
      fetchTeam();
    } catch (err) {
      console.error('Error saving team member:', err);
      alert('Erreur lors de l\'enregistrement du membre.');
    }
  };

  const filteredMembers = members.filter(m => 
    m.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.role && m.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion de l'Équipe</h1>
          <p className="text-sm text-gray-500">Gérez les membres de l'équipe et collaborateurs affichés sur le site.</p>
        </div>
        
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 text-sm font-semibold bg-secondary text-white hover:bg-secondary/95 px-5 py-2.5 rounded-xl transition-all shadow-md shadow-secondary/20 shrink-0"
        >
          <Plus size={18} />
          Ajouter un Membre
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Rechercher un collaborateur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Team Members Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-2xl border border-gray-100 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md"
            >
              {/* Photo area */}
              <div className="relative aspect-square w-full bg-gray-50 border-b border-gray-50 overflow-hidden flex items-center justify-center">
                {member.photo_url ? (
                  <img src={member.photo_url} alt={member.full_name} className="w-full h-full object-cover" />
                ) : (
                  <User size={64} className="text-gray-300" />
                )}
                
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white text-gray-700 shadow-sm border border-gray-100">
                  Ordre : {member.display_order}
                </span>

                {member.linkedin_url && (
                  <a 
                    href={member.linkedin_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 p-2 rounded-xl bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin size={14} />
                  </a>
                )}
              </div>

              {/* Text content */}
              <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm leading-tight line-clamp-1">{member.full_name}</h4>
                  <p className="text-xs text-secondary font-semibold mt-0.5">{member.role || 'Collaborateur'}</p>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                    {member.bio || 'Aucune biographie rédigée.'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-50 flex justify-end gap-1">
                <button
                  onClick={() => handleOpenEditModal(member)}
                  className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 text-gray-400">
          Aucun membre d'équipe enregistré.
        </div>
      )}

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Modifier le Collaborateur' : 'Ajouter un Collaborateur'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-xl transition-all">
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Ex: Amadou Fall"
                    />
                  </div>

                  {/* Role */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Rôle / Poste</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Ex: Développeur Lead"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* LinkedIn URL */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">URL LinkedIn</label>
                    <input
                      type="text"
                      value={formData.linkedin_url}
                      onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>

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
                </div>

                {/* Photo URL */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase">Photo de profil (URL)</label>
                  <input
                    type="text"
                    value={formData.photo_url}
                    onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="https://images.unsplash.com/..."
                  />
                  {formData.photo_url && (
                    <div className="mt-2 flex items-center justify-center bg-gray-50 border border-gray-200/50 rounded-xl p-3 h-28">
                      <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 bg-white">
                        <img src={formData.photo_url} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Biography */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Biographie / Description</label>
                  <textarea
                    rows="3"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Courte description de son parcours, ses spécialités..."
                  />
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