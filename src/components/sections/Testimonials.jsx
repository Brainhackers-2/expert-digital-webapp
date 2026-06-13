import { useTestimonials } from '../../hooks/useTestimonials';
import { FadeIn } from '../ui/FadeIn';
import { Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Testimonials = () => {
  const { testimonials } = useTestimonials();

  // Show only top 3 testimonials on the home page
  const homeTestimonials = testimonials.slice(0, 3);

  return (
    <section className="bg-[#0B1120] py-24 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-secondary/20 blur-[100px] -mr-40 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Témoignages</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ce que nos clients disent de nous</h3>
            <p className="text-lg text-gray-300">
              La réussite de nos clients est notre plus grande satisfaction. Découvrez les retours d'expérience des entreprises qui nous font confiance.
              </p>
          </FadeIn>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Aucun témoignage publié pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {homeTestimonials.map((testimonial, index) => (
              <FadeIn key={testimonial.id} delay={0.1 * index}>
                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(255,102,51,0.15)] hover:border-secondary/30 transition-all duration-300 relative h-full flex flex-col justify-between">
                  <div>
                    {/* Quote Icon */}
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

        <FadeIn delay={0.4} className="text-center">
          <Link
            to="/temoignages"
            className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,102,51,0.4)]"
          >
            Voir tous les avis & laisser le vôtre
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};