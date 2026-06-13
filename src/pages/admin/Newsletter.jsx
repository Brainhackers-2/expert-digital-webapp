import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Trash2, Search, Download, Copy, Check, Calendar } from 'lucide-react';

export const NewsletterAdmin = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });
      
      if (error) throw error;
      setSubscribers(data || []);
    } catch (err) {
      console.error('Error fetching subscribers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment désabonner cette adresse email ?')) return;

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSubscribers(subscribers.filter(sub => sub.id !== id));
    } catch (err) {
      console.error('Error deleting subscriber:', err);
    }
  };

  const handleCopyEmails = () => {
    const emails = filteredSubscribers.map(sub => sub.email).join(', ');
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCSV = () => {
    const headers = 'Email,Date d\'inscription\n';
    const rows = filteredSubscribers.map(sub => 
      `"${sub.email}","${new Date(sub.subscribed_at).toLocaleDateString('fr-FR')}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter_subscribers_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubscribers = subscribers.filter(sub => 
    sub.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletter</h1>
          <p className="text-sm text-gray-500">Gérez les adresses email inscrites pour recevoir vos actualités.</p>
        </div>
        
        {/* Header Actions */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopyEmails}
            disabled={filteredSubscribers.length === 0}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 px-4 py-2.5 rounded-xl transition-all"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            {copied ? 'Copié !' : 'Copier les emails'}
          </button>
          
          <button
            onClick={handleExportCSV}
            disabled={filteredSubscribers.length === 0}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs font-semibold bg-primary text-white hover:bg-primary/95 px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <Download size={14} />
            Exporter CSV
          </button>
        </div>
      </div>

      {/* Filters/Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Rechercher une adresse email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Subscribers Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-4 pl-6">Email</th>
                <th className="p-4">Date d'inscription</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="3" className="p-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </td>
                </tr>
              ) : filteredSubscribers.length > 0 ? (
                filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50 text-sm text-gray-700">
                    <td className="p-4 pl-6 font-semibold flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-light text-primary">
                        <Mail size={16} />
                      </div>
                      {sub.email}
                    </td>
                    <td className="p-4 text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-gray-400" />
                        {new Date(sub.subscribed_at).toLocaleDateString('fr-FR', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="p-2 text-red-500 hover:bg-red-50 hover:border-red-100 border border-transparent rounded-xl transition-colors"
                        title="Désabonner"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-12 text-center text-gray-400">
                    Aucun abonné trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};