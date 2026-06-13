import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useSettings } from '../../hooks/useSettings';
import { FadeIn } from '../../components/ui/FadeIn';
import { Phone, Mail, MapPin, Send, CheckCircle2, Facebook, Instagram, Linkedin, MessageSquare } from 'lucide-react';

export const Contact = () => {
  const { settings, loading } = useSettings();
  
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          status: 'nouveau'
        }]);

      if (error) throw error;
      
      setStatus('success');
      setFormData({ full_name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Submit contact error:', err);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Coordinates from Supabase or default fallbacks
  const emailContact = settings.contact_email || 'expertdigital836@gmail.com';
  const phoneContact = settings.contact_phone || '+221 78 508 58 31 / 78 354 00 61';
  const addressContact = settings.contact_address || 'Ziguinchor, Sénégal';
  const whatsappNumber = settings.whatsapp_number || '221785085831';
  
  const facebookUrl = settings.social_facebook || 'https://facebook.com/expertdigital';
  const instagramUrl = settings.social_instagram || 'https://instagram.com';
  const linkedinUrl = settings.social_linkedin || 'https://linkedin';

  return (
    <div className="bg-white min-h-screen">
      {/* Contact Hero */}
      <section className="relative bg-gradient-to-br from-primary to-[#0c1a2f] text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,102,51,0.08),transparent_50%)]"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-secondary/15 px-4.5 py-1.5 rounded-full border border-secondary/10">
                Contactez-nous
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-6 leading-tight">
                Discutons de Votre <span className="text-secondary">Projet</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mt-6 leading-relaxed">
                Des questions ? Un besoin de devis ? Contactez-nous par e-mail, téléphone ou via le formulaire ci-dessous. Notre équipe vous répond rapidement.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            
            {/* Column Left: Details Coordinates */}
            <div className="lg:col-span-2 space-y-10">
              <FadeIn>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-primary">Nos coordonnées</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    N'hésitez pas à nous rendre visite, à nous téléphoner ou à nous écrire directement sur WhatsApp pour une prise de contact instantanée.
                  </p>
                </div>

                <div className="mt-10 space-y-8">
                  {/* Adresse */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0 border border-primary/5">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm uppercase tracking-wide">Adresse locale</h4>
                      <p className="text-gray-600 mt-1 text-base">{addressContact}</p>
                    </div>
                  </div>

                  {/* Telephone */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary shrink-0 border border-secondary/5">
                      <Phone size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm uppercase tracking-wide">Téléphone</h4>
                      <p className="text-gray-600 mt-1 text-base whitespace-pre-line">{phoneContact}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
                      <Mail size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm uppercase tracking-wide">E-mail</h4>
                      <a href={`mailto:${emailContact}`} className="text-gray-600 hover:text-secondary transition-colors mt-1 text-base block break-all">
                        {emailContact}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Callout */}
                <div className="bg-light/60 p-6 rounded-3xl border border-gray-100 mt-12 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center shrink-0 shadow-md">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-primary text-sm">Discuter en Direct</h5>
                      <p className="text-xs text-gray-500">Réponse immédiate sur WhatsApp</p>
                    </div>
                  </div>
                  <a 
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-primary text-white hover:bg-primary/95 text-xs font-bold px-5 py-2.5 rounded-xl shadow-md text-center transition-all"
                  >
                    Ouvrir WhatsApp
                  </a>
                </div>

                {/* Social Networks Connect */}
                <div className="mt-12 space-y-4">
                  <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Suivez-nous</h4>
                  <div className="flex gap-4">
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-secondary hover:text-white flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                      <Facebook size={18} />
                    </a>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-secondary hover:text-white flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                      <Instagram size={18} />
                    </a>
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-secondary hover:text-white flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Column Right: Contact Form */}
            <div className="lg:col-span-3">
              <FadeIn delay={0.2}>
                <div className="bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-xl shadow-primary/5">
                  <h3 className="text-2xl font-bold text-primary mb-6">Envoyez-nous un message</h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Votre Nom complet *</label>
                        <input
                          type="text"
                          required
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Nom Prénom"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Votre Adresse E-mail *</label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="nom@exemple.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Numéro de téléphone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Ex: +221 77 000 00 00"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Sujet de votre message *</label>
                        <input
                          type="text"
                          required
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Ex: Demande de devis creation site"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase">Détails de votre projet / message *</label>
                      <textarea
                        required
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Décrivez votre besoin en détail..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="bg-secondary hover:bg-secondary/95 disabled:bg-gray-400 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-secondary/15 flex items-center justify-center gap-2 text-sm"
                    >
                      {status === 'loading' ? (
                        <span>Envoi en cours...</span>
                      ) : (
                        <>
                          <span>Envoyer le message</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>

                    {status === 'success' && (
                      <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100 p-4 rounded-xl animate-fadeIn mt-4 text-sm font-semibold">
                        <CheckCircle2 size={20} className="shrink-0" />
                        <span>Message envoyé avec succès ! Notre équipe reviendra vers vous sous 24 heures.</span>
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="text-red-600 bg-red-50 border border-red-100 p-4 rounded-xl mt-4 text-sm font-semibold">
                        Une erreur est survenue lors de la transmission. Veuillez nous contacter directement par e-mail ou téléphone.
                      </div>
                    )}
                  </form>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};