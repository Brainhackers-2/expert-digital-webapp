import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Briefcase, Image, MessageSquare, Users, ArrowRight, Bell, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    messages: 0,
    newsletter: 0,
    services: 0,
    portfolio: 0,
    testimonials: 0,
    team: 0
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatsAndRecent = async () => {
      try {
        setLoading(true);
        
        // Fetch counts
        const { count: msgCount } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true });
        const { count: newsCount } = await supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true });
        const { count: srvCount } = await supabase.from('services').select('*', { count: 'exact', head: true });
        const { count: portCount } = await supabase.from('portfolio_items').select('*', { count: 'exact', head: true });
        const { count: testCount } = await supabase.from('testimonials').select('*', { count: 'exact', head: true });
        const { count: teamCount } = await supabase.from('team_members').select('*', { count: 'exact', head: true });

        setStats({
          messages: msgCount || 0,
          newsletter: newsCount || 0,
          services: srvCount || 0,
          portfolio: portCount || 0,
          testimonials: testCount || 0,
          team: teamCount || 0
        });

        // Fetch recent messages
        const { data: messages } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        
        setRecentMessages(messages || []);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatsAndRecent();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    { label: 'Messages Reçus', value: stats.messages, icon: Mail, color: 'bg-blue-50 text-blue-600', link: '/admin/messages' },
    { label: 'Abonnés Newsletter', value: stats.newsletter, icon: Bell, color: 'bg-indigo-50 text-indigo-600', link: '/admin/newsletter' },
    { label: 'Services Proposés', value: stats.services, icon: Briefcase, color: 'bg-emerald-50 text-emerald-600', link: '/admin/services' },
    { label: 'Projets Réalisés', value: stats.portfolio, icon: Image, color: 'bg-amber-50 text-amber-600', link: '/admin/portfolio' },
    { label: 'Témoignages Clients', value: stats.testimonials, icon: MessageSquare, color: 'bg-purple-50 text-purple-600', link: '/admin/testimonials' },
    { label: 'Membres d\'Équipe', value: stats.team, icon: Users, color: 'bg-rose-50 text-rose-600', link: '/admin/team' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-blue-900 p-8 md:p-12 text-white shadow-xl">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-12 -translate-y-12">
          <Sparkles size={400} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Bienvenue sur votre Panel d'Administration
          </h1>
          <p className="text-blue-100 text-base md:text-lg mb-0">
            Gérez en temps réel le contenu de votre site web, consultez vos messages clients et gérez vos leads facilement.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link 
              key={idx} 
              to={card.link}
              className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group"
            >
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">{card.label}</span>
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{card.value}</h3>
              </div>
              <div className={`p-4 rounded-2xl ${card.color} group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Messages */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Derniers Messages</h2>
              <Link to="/admin/messages" className="text-sm font-semibold text-secondary hover:text-secondary/80 flex items-center gap-1">
                Tout voir <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              {recentMessages.length > 0 ? (
                <div className="space-y-4">
                  {recentMessages.map((msg) => (
                    <div key={msg.id} className="p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-50 flex items-start justify-between gap-4">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-gray-800 truncate">{msg.full_name}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(msg.created_at).toLocaleDateString('fr-FR', {
                              day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-primary truncate">{msg.subject || 'Pas d\'objet'}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{msg.message}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${
                        msg.status === 'nouveau' 
                          ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                          : msg.status === 'lu'
                          ? 'bg-gray-50 text-gray-600 border border-gray-100'
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400 text-sm">
                  Aucun message reçu pour le moment.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions / Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Actions Rapides</h2>
          
          <div className="space-y-3">
            <Link 
              to="/admin/services" 
              className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:bg-primary hover:text-white transition-all group font-medium text-sm text-gray-700"
            >
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-white/20 group-hover:text-white">
                <Briefcase size={18} />
              </div>
              Ajouter un Nouveau Service
            </Link>
            
            <Link 
              to="/admin/portfolio" 
              className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:bg-primary hover:text-white transition-all group font-medium text-sm text-gray-700"
            >
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-white/20 group-hover:text-white">
                <Image size={18} />
              </div>
              Publier une Réalisation
            </Link>
            
            <Link 
              to="/admin/settings" 
              className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:bg-primary hover:text-white transition-all group font-medium text-sm text-gray-700"
            >
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-white/20 group-hover:text-white">
                <Users size={18} />
              </div>
              Configurer le Site Web
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100/50 flex flex-col gap-2">
              <h4 className="font-bold text-sm text-orange-800">Support Technique</h4>
              <p className="text-xs text-orange-700 leading-relaxed">
                Besoin d'aide ou d'une évolution sur l'application ? Contactez directement l'équipe de développement de l'agence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};