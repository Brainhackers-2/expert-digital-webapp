import { useServices } from '../../hooks/useServices';
import { FadeIn } from '../ui/FadeIn';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

// Helper to resolve icon from string name
const getIconComponent = (iconName) => {
  if (!iconName) return Icons.Sparkles;
  const ResolvedIcon = Icons[iconName];
  return ResolvedIcon || Icons.Sparkles;
};

export const ServicesPreview = () => {
  const { services } = useServices();

  // Show first 4 published services as preview
  const previewServices = services.slice(0, 4);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle decorations */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-light/50 blur-3xl -ml-36 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Nos expertises</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-primary mb-6">Des solutions digitales complètes</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Nous propulsons votre marque avec des services digitaux conçus pour convertir vos visiteurs en clients fidèles et maximiser votre impact local et national.
            </p>
          </FadeIn>
        </div>

        {services.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Chargement de nos services de qualité...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {previewServices.map((service, index) => {
              const Icon = getIconComponent(service.icon);
              return (
                <FadeIn key={service.id} delay={0.1 * index}>
                  <div className="bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col justify-between">
                    <div>
                      {/* Icon Container */}
                      <div className="w-14 h-14 rounded-2xl bg-light flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <Icon size={28} />
                      </div>
                      <h4 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {service.short_description}
                      </p>
                    </div>
                    
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-secondary font-semibold hover:text-primary transition-colors text-sm"
                    >
                      En savoir plus
                      <Icons.ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}

        <FadeIn delay={0.4} className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-light text-primary hover:bg-primary hover:text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            <span>Voir tous nos services ({services.length})</span>
            <Icons.ChevronRight size={18} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};