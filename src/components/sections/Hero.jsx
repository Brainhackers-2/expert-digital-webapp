import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/FadeIn';
import { useSettings } from '../../hooks/useSettings';

export const Hero = () => {
  const { settings, loading } = useSettings();

  // Dynamic texts with fallbacks
  const heroBadge = settings.hero_badge || 'Agence digitale N°1 à Ziguinchor';
  const siteTagline = settings.site_tagline || 'Je propulse vos marques vers le succès digital';
  const heroSubtitle = settings.hero_subtitle || 'Création de sites web ultra-performants et gestion stratégique de vos réseaux sociaux pour transformer vos visiteurs en clients.';

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-light to-white">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-sm font-medium text-gray-600 mb-8">
              <Sparkles size={16} className="text-secondary" />
              <span>{heroBadge}</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary tracking-tight leading-tight mb-6">
              {siteTagline.includes('succès digital') ? (
                <>
                  {siteTagline.split('succès digital')[0]}
                  <span className="text-secondary relative">
                    succès digital
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6C40.5 -1.5 160 -1.5 199 6" stroke="#FF6633" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                  </span>
                  {siteTagline.split('succès digital')[1]}
                </>
              ) : (
                siteTagline
              )}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {heroSubtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/services" className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/20 flex items-center justify-center gap-2">
                Découvrir nos services
                <ChevronRight size={20} />
              </Link>
              <Link to="/contact" className="w-full sm:w-auto bg-white text-gray-800 border-2 border-gray-100 px-8 py-4 rounded-full font-semibold text-lg hover:border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group">
                Demander un devis
                <ArrowRight size={20} className="text-secondary group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};