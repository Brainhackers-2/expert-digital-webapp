import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';
import { supabase } from '../../lib/supabaseClient';

export const Footer = () => {
  const { settings, loading } = useSettings();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error', 'exists'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation (already subscribed)
          setStatus('exists');
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setEmail('');
      }
    } catch (err) {
      console.error('Newsletter error:', err);
      setStatus('error');
    }
  };

  // Coordonnées et liens par défaut si non configurés
  const emailContact = settings.contact_email || 'expertdigital836@gmail.com';
  const phoneContact = settings.contact_phone || '+221 78 508 58 31 / 78 354 00 61';
  const addressContact = settings.contact_address || 'Ziguinchor, Sénégal';
  const siteTagline = settings.site_tagline || 'Je propulse vos marques vers le succès digital';
  
  const facebookUrl = settings.social_facebook || 'https://facebook.com/expertdigital';
  const instagramUrl = settings.social_instagram || 'https://instagram.com';
  const linkedinUrl = settings.social_linkedin || 'https://linkedin.com';

  return (
    <footer className="bg-[#0b1424] text-gray-400 pt-20 pb-10 border-t border-gray-800/40">
      <div className="container mx-auto px-6 md:px-12">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-primary/80 to-[#10243e] rounded-3xl p-8 md:p-12 mb-16 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-secondary/10 blur-3xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">Abonnez-vous à notre newsletter</h3>
              <p className="text-gray-300 max-w-xl">
                Recevez nos derniers conseils pour booster votre visibilité en ligne, ainsi que nos offres spéciales réservées aux abonnés.
              </p>
            </div>
            
            <div className="lg:col-span-2">
              <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="w-full px-5 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 bg-secondary text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/20"
                >
                  {status === 'loading' ? 'Envoi...' : (
                    <>
                      <span>S'abonner</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
              
              {/* Feedback messages */}
              {status === 'success' && (
                <p className="text-emerald-400 text-xs font-semibold mt-2.5 flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 size={14} /> Inscription réussie ! Merci pour votre confiance.
                </p>
              )}
              {status === 'exists' && (
                <p className="text-amber-400 text-xs font-semibold mt-2.5 animate-fadeIn">
                  Cet e-mail est déjà inscrit à notre newsletter.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-xs font-semibold mt-2.5 animate-fadeIn">
                  Une erreur est survenue. Veuillez réessayer plus tard.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <img src="https://i.imgur.com/ur9GB01.jpeg" alt="Expert Digital Logo" className="w-10 h-10 object-contain rounded-lg shadow-md border border-gray-800" />
              <span>Expert Digital</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {siteTagline}
            </p>
            <div className="flex space-x-4">
              <a 
                href={facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800/60 flex items-center justify-center text-gray-300 hover:bg-secondary hover:text-white transition-all shadow-md"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800/60 flex items-center justify-center text-gray-300 hover:bg-secondary hover:text-white transition-all shadow-md"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800/60 flex items-center justify-center text-gray-300 hover:bg-secondary hover:text-white transition-all shadow-md"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Liens rapides</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/a-propos" className="hover:text-secondary transition-colors">À propos de nous</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Nos services</Link></li>
              <li><Link to="/realisations" className="hover:text-secondary transition-colors">Nos réalisations</Link></li>
              <li><Link to="/temoignages" className="hover:text-secondary transition-colors">Témoignages clients</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Nos expertises</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-secondary transition-colors">Création de sites web</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Gestion des réseaux sociaux</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Publicité digitale (Ads)</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Design graphique</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-secondary shrink-0 mt-0.5" size={18} />
                <span>{addressContact}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-secondary shrink-0 mt-0.5" size={18} />
                <span className="whitespace-pre-line">{phoneContact}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-secondary shrink-0" size={18} />
                <a href={`mailto:${emailContact}`} className="hover:text-secondary transition-colors break-all">
                  {emailContact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Expert Digital. Tous droits réservés. Propulsé par Expert Digital.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};