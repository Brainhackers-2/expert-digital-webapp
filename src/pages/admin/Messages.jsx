import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Trash2, Eye, CheckCircle, Clock, Search, AlertCircle, Phone, Calendar } from 'lucide-react';

export const MessagesAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');

  const fetchMessages = async () => {
    try {
      setLoading(true);
      let query = supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      
      const { data, error } = await query;
      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setMessages(messages.map(msg => msg.id === id ? { ...msg, status: newStatus } : msg));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating message status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce message définitivement ?')) return;
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setMessages(messages.filter(msg => msg.id !== id));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  // Filtering
  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (msg.subject && msg.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'tous' || msg.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Boîte de réception</h1>
          <p className="text-sm text-gray-500">Consultez et gérez les messages envoyés depuis le formulaire de contact.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Rechercher un message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {['tous', 'nouveau', 'lu', 'traité'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all capitalize shrink-0 ${
                statusFilter === status 
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Mailbox Content */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col ${selectedMessage ? 'hidden lg:flex' : 'flex'} lg:col-span-1`}>
          <div className="p-4 border-b border-gray-50 bg-gray-50/50">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Messages ({filteredMessages.length})
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (msg.status === 'nouveau') {
                      handleUpdateStatus(msg.id, 'lu');
                    }
                  }}
                  className={`p-4 cursor-pointer hover:bg-light transition-all flex flex-col gap-2 border-l-4 ${
                    selectedMessage?.id === msg.id 
                      ? 'bg-light/80 border-secondary' 
                      : msg.status === 'nouveau'
                      ? 'border-blue-500 bg-blue-50/20'
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className={`text-sm font-semibold truncate ${msg.status === 'nouveau' ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>
                      {msg.full_name}
                    </span>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">
                      {new Date(msg.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'short'
                      })}
                    </span>
                  </div>
                  <h4 className={`text-xs truncate ${msg.status === 'nouveau' ? 'text-primary font-bold' : 'text-gray-600'}`}>
                    {msg.subject || 'Pas d\'objet'}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      msg.status === 'nouveau'
                        ? 'bg-blue-50 text-blue-600'
                        : msg.status === 'lu'
                        ? 'bg-gray-50 text-gray-600'
                        : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {msg.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-400 text-sm">
                Aucun message trouvé
              </div>
            )}
          </div>
        </div>

        {/* Message Detail Pane */}
        <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col ${selectedMessage ? 'flex' : 'hidden lg:flex'} lg:col-span-2`}>
          {selectedMessage ? (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Toolbar */}
              <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="lg:hidden text-sm font-semibold text-gray-500 hover:text-gray-800"
                >
                  ← Retour
                </button>
                <div className="flex items-center gap-2 ml-auto">
                  {selectedMessage.status !== 'traité' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedMessage.id, 'traité')}
                      className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-all"
                    >
                      <CheckCircle size={14} />
                      Marquer comme traité
                    </button>
                  )}
                  {selectedMessage.status === 'traité' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedMessage.id, 'lu')}
                      className="flex items-center gap-1.5 text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100 px-3 py-1.5 rounded-xl transition-all"
                    >
                      <Clock size={14} />
                      Remettre en attente
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="flex items-center justify-center p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
                    title="Supprimer définitivement"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Message Content Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Header Information */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedMessage.subject || 'Pas d\'objet'}</h2>
                      <p className="text-sm font-semibold text-primary">{selectedMessage.full_name}</p>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                      {new Date(selectedMessage.created_at).toLocaleString('fr-FR', {
                        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>

                  {/* Contact Methods Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="p-3 rounded-xl border border-gray-100 hover:bg-light transition-colors flex items-center gap-3 text-sm font-medium text-gray-700 min-w-0"
                    >
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                        <Mail size={16} />
                      </div>
                      <span className="truncate">{selectedMessage.email}</span>
                    </a>

                    {selectedMessage.phone ? (
                      <a 
                        href={`tel:${selectedMessage.phone}`}
                        className="p-3 rounded-xl border border-gray-100 hover:bg-light transition-colors flex items-center gap-3 text-sm font-medium text-gray-700 min-w-0"
                      >
                        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                          <Phone size={16} />
                        </div>
                        <span className="truncate">{selectedMessage.phone}</span>
                      </a>
                    ) : (
                      <div className="p-3 rounded-xl border border-gray-50 bg-gray-50/20 flex items-center gap-3 text-sm text-gray-400 italic">
                        <div className="p-2 rounded-lg bg-gray-100 text-gray-400">
                          <Phone size={16} />
                        </div>
                        Aucun téléphone
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100/50 min-h-[200px]">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 space-y-3">
              <div className="p-4 rounded-full bg-gray-50 text-gray-300">
                <Mail size={40} />
              </div>
              <p className="text-sm font-semibold">Sélectionnez un message pour l'afficher</p>
              <p className="text-xs text-center max-w-xs">Cliquez sur l'un des messages de la liste pour voir l'intégralité du contenu et y répondre.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};