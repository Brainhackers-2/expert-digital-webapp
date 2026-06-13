import { useServices } from '../../hooks/useServices';
import { FadeIn } from '../../components/ui/FadeIn';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

// Helper to resolve icon from string name
const getIconComponent = (iconName) => {
  if (!iconName) return Icons.Sparkles;
  const ResolvedIcon = Icons[iconName];
  return ResolvedIcon || Icons.Sparkles;
};

export const Services = () => {
  const { services } = useServices();

  return (
    <div className="bg-white min-h-screen">
      {/* Services Hero */}
      <section className="relative bg-gradient-to-br from-primary to-[#0c1a2f] text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,102,51,0.08),transparent_50%)]"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-secondary/15 px-4.5 py-1.5 rounded-full border border-secondary/10">
                Nos expertises
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-6 leading-tight">
                Nos Services <span className="text-secondary">Sur-Mesure</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mt-6 leading-relaxed">
                Des solutions innovantes et adaptées pour créer votre site internet, développer vos réseaux sociaux et acquérir plus de clients.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          {services.length === 0 ? (
            <div className="text-center text-gray-400 py-20">
              <Icons.Loader2 className="animate-spin mx-auto mb-4" size={36} />
              Chargement de nos services...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => {
                const Icon = getIconComponent(service.icon);
                return (
                  <FadeIn key={service.id} delay={0.1 * (idx % 3)}>
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 hover:translate-y-[-6px] transition-all duration-300 flex flex-col justify-between h-full group">
                      <div>
                        {/* Header card */}
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <Icon size={28} />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                            {service.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-300">
                          {service.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-8">
                          {service.short_description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-50 pt-5 mt-auto">
                        <Link 
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors group-hover:underline"
                        >
                          En savoir plus
                          <Icons.ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        <Link 
                          to="/contact"
                          className="text-xs font-semibold text-gray-500 hover:text-secondary transition-colors"
                        >
                          Demander un devis
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-light/60 py-20 border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <FadeIn>
            <h3 className="text-2xl md:text-3xl font-extrabold text-primary mb-4">
              Vous avez un besoin spécifique qui n'est pas listé ?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Chaque projet est unique. Notre agence est flexible et s'adapte à vos contraintes pour concevoir des offres marketing et technologiques sur-mesure.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/35 transition-all"
            >
              <span>Parler à un conseiller</span>
              <Icons.MessageSquare size={18} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};