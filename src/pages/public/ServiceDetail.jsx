import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { FadeIn } from '../../components/ui/FadeIn';
import { useSettings } from '../../hooks/useSettings';
import * as Icons from 'lucide-react';

// Helper to resolve icon from string name
const getIconComponent = (iconName) => {
  if (!iconName) return Icons.Sparkles;
  const ResolvedIcon = Icons[iconName];
  return ResolvedIcon || Icons.Sparkles;
};

export const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (error) throw error;
        setService(data);
      } catch (err) {
        console.error('Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!service) return;

    setStatus('loading');
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          subject: `Intérêt pour le service : ${service.title}`,
          message: formData.message,
          status: 'nouveau'
        }]);

      if (error) throw error;
      setStatus('success');
      setFormData({ full_name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Contact error:', err);
      setStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <Icons.Loader2 className="animate-spin text-primary mx-auto mb-4" size={40} />
          <p className="text-gray-500">Chargement de votre service...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6">
            <Icons.AlertTriangle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-3">Service introuvable</h2>
          <p className="text-gray-600 mb-6">Ce service n'existe pas ou a été désactivé par l'administration.</p>
          <Link to="/services" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-semibold">
            <Icons.ArrowLeft size={16} />
            Retour aux services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = getIconComponent(service.icon);
  const emailContact = settings.contact_email || 'expertdigital836@gmail.com';
  const phoneContact = settings.contact_phone || '+221 78 508 58 31 / 78 354 00 61';

  return (
    <div className="bg-white min-h-screen">
      {/* Detail Hero */}
      <section className="relative bg-gradient-to-br from-primary to-[#0c1a2f] text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,102,51,0.08),transparent_50%)]"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs font-semibold mb-6">
            <Icons.ArrowLeft size={14} />
            Retour aux services
          </Link>
          
          <div className="max-w-4xl flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-secondary shrink-0 backdrop-blur-md">
              <Icon size={32} />
            </div>
            <div>
              <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-secondary/15 px-3 py-1 rounded-full border border-secondary/10">
                {service.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-3">
                {service.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-8">
              <FadeIn>
                {service.image_url && (
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 aspect-video mb-8 bg-gray-50">
                    <img 
                      src={service.image_url} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-primary">Présentation du service</h2>
                  <div className="w-12 h-1 bg-secondary rounded-full"></div>
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    {service.short_description}
                  </p>
                  
                  {service.long_description ? (
                    <div className="text-gray-600 space-y-4 leading-relaxed whitespace-pre-wrap border-t border-gray-50 pt-6 mt-6">
                      {service.long_description}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Aucune description détaillée disponible pour le moment.</p>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Dynamic Quote Sidebar */}
            <div className="lg:col-span-1">
              <FadeIn delay={0.2} className="sticky top-28">
                <div className="bg-light/80 border border-gray-100 rounded-3xl p-8 shadow-xl shadow-primary/5">
                  <h3 className="text-xl font-bold text-primary mb-2">Ce service vous intéresse ?</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-6">
                    Remplissez ce formulaire rapide. Un conseiller de l'équipe vous contactera sous 24h ouvrées.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nom complet</label>
                      <input
                        type="text"
                        required
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Votre nom complet"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Ex: contact@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Téléphone</label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Ex: 77 000 00 00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Votre projet / message</label>
                      <textarea
                        required
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder={`Dites-nous en plus sur vos besoins en "${service.title}"`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-secondary hover:bg-secondary/95 disabled:bg-gray-400 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-secondary/15 flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? (
                        <Icons.Loader2 className="animate-spin" size={18} />
                      ) : (
                        <>
                          <span>Envoyer ma demande</span>
                          <Icons.Send size={16} />
                        </>
                      )}
                    </button>

                    {status === 'success' && (
                      <p className="text-emerald-600 text-xs font-semibold text-center mt-3 bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl">
                        Demande envoyée avec succès !
                      </p>
                    )}
                    {status === 'error' && (
                      <p className="text-red-600 text-xs font-semibold text-center mt-3 bg-red-50 border border-red-100 p-2.5 rounded-xl">
                        Une erreur est survenue lors de l'envoi.
                      </p>
                    )}
                  </form>

                  {/* Direct details info */}
                  <div className="border-t border-gray-200/60 mt-8 pt-6 space-y-3.5 text-xs text-gray-500">
                    <p className="font-semibold uppercase tracking-wider text-gray-400">Ou contactez-nous directement :</p>
                    <div className="flex items-center gap-2">
                      <Icons.Phone size={14} className="text-secondary" />
                      <span>{phoneContact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.Mail size={14} className="text-secondary" />
                      <a href={`mailto:${emailContact}`} className="hover:underline break-all">{emailContact}</a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};