import { useState } from 'react';
import { useTestimonials } from '../../hooks/useTestimonials';
import { FadeIn } from '../../components/ui/FadeIn';
import { supabase } from '../../lib/supabaseClient';
import { Star, Quote, Plus, X, Award, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Testimonials = () => {
  const { testimonials } = useTestimonials();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ client_name: '', company: '', rating: 5, message: '', photo_url: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (rate) => {
    setFormData({ ...formData, rating: rate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.client_name || !formData.message) return;

    setStatus('loading');
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([{
          client_name: formData.client_name,
          company: formData.company,
          rating: formData.rating,
          message: formData.message,
          photo_url: formData.photo_url || null,
          is_published: false // Awaiting admin moderation
        }]);

      if (error) throw error;
      setStatus('success');
      setFormData({ client_name: '', company: '', rating: 5, message: '', photo_url: '' });
      setTimeout(() => {
        setModalOpen(false);
        setStatus('');
      }, 3000);
    } catch (err) {
      console.error('Testimonial submission error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Testimonials Hero */}
      <section className="relative bg-gradient-to-br from-primary to-[#0c1a2f] text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(255,102,51,0.08),transparent_50%)]"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl flex flex-col md:flex-row md:items-center justify-between gap-8">
            <FadeIn className="flex-grow">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-secondary/15 px-4.5 py-1.5 rounded-full border border-secondary/10">
                Témoignages clients
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-6 leading-tight">
                Ils nous font <span className="text-secondary">Confiance</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mt-6 leading-relaxed">
                Découvrez les retours de nos clients partenaires sur la qualité de nos prestations et notre accompagnement au quotidien.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2} className="shrink-0">
              <button
                onClick={() => setModalOpen(true)}
                className="bg-secondary hover:bg-secondary/95 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/35 transition-all flex items-center gap-2 text-sm"
              >
                <Plus size={18} />
                Laisser un avis
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Grid of Testimonials */}
      <section className="py-24 bg-[#0B1120] relative overflow-hidden">
        {/* Subtle grid decorations */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -ml-48"></div>
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none -mr-48"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {testimonials.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              Chargement des témoignages...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <FadeIn key={testimonial.id} delay={0.1 * (idx % 3)}>
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(255,102,51,0.15)] hover:border-secondary/30 hover:translate-y-[-4px] transition-all duration-300 relative h-full flex flex-col justify-between">
                    <div>
                      {/* Quote Icon decorative */}
                      <Quote className="text-white/10 absolute top-6 right-8 w-12 h-12 pointer-events-none" />
                      
                      {/* Stars Rating */}
                      <div className="flex gap-1 mb-5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < testimonial.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-white/20'
                            }
                          />
                        ))}
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                        "{testimonial.message}"
                      </p>
                    </div>

                    {/* Customer Info */}
                    <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-auto">
                      {testimonial.photo_url ? (
                        <img
                          src={testimonial.photo_url}
                          alt={testimonial.client_name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-lg">
                          {testimonial.client_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-white text-sm">{testimonial.client_name}</h4>
                        <p className="text-xs text-gray-400">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Satisfaction Badge Banner */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0B1120]/80"></div>
        <div className="container mx-auto px-6 md:px-12 text-center max-w-2xl relative z-10">
          <FadeIn className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary/20 text-secondary flex items-center justify-center border border-secondary/30">
              <Award size={32} />
            </div>
            <h3 className="text-2xl font-extrabold text-white">100% de Clients Recommandés</h3>
            <p className="text-gray-400 text-sm">
              Nous nous engageons à offrir une expérience irréprochable et un accompagnement de proximité. Votre satisfaction est notre priorité numéro un.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Modal - Submit Review */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-primary/60 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full relative z-10"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-primary text-lg">Laisser votre avis</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {status === 'success' ? (
                  <div className="py-8 flex flex-col items-center gap-4 text-center">
                    <CheckCircle2 size={48} className="text-emerald-500 animate-bounce" />
                    <h4 className="font-bold text-primary text-lg">Avis soumis avec succès !</h4>
                    <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                      Merci pour votre retour ! Votre avis sera visible sur le site après validation par l'administrateur.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Votre Nom complet *</label>
                        <input
                          type="text"
                          required
                          name="client_name"
                          value={formData.client_name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Ex: Jean Dupont"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Entreprise / Fonction</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Ex: CEO, Agence Mermoz"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Note globale (1 à 5 étoiles) *</label>
                      <div className="flex gap-1.5 py-1">
                        {[1, 2, 3, 4, 5].map((rate) => (
                          <button
                            key={rate}
                            type="button"
                            onClick={() => handleRatingClick(rate)}
                            onMouseEnter={() => setHoverRating(rate)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="text-gray-300 hover:scale-110 transition-transform"
                          >
                            <Star
                              size={28}
                              className={
                                rate <= (hoverRating || formData.rating)
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-gray-200'
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Votre avis / commentaire *</label>
                      <textarea
                        required
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Partagez votre expérience avec Expert Digital..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">URL de votre photo (facultatif)</label>
                      <input
                        type="url"
                        name="photo_url"
                        value={formData.photo_url}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Lien HTTP vers une image de profil"
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50 -mx-6 -mb-6 p-4">
                      <button
                        type="button"
                        onClick={() => setModalOpen(false)}
                        className="px-5 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        Annuler
                      </button>
                      
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="bg-primary hover:bg-primary/95 disabled:bg-gray-400 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        {status === 'loading' ? 'Envoi...' : 'Soumettre mon avis'}
                      </button>
                    </div>
                  </>
                )}

                {status === 'error' && (
                  <p className="text-red-600 text-xs font-semibold text-center mt-2 bg-red-50 p-2 rounded-xl border border-red-100">
                    Une erreur s'est produite lors de l'enregistrement de votre avis.
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};