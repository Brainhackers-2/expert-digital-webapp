import { ArrowRight, Sparkles, ChevronRight, Activity, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/FadeIn';
import { useSettings } from '../../hooks/useSettings';

export const Hero = () => {
  const { settings } = useSettings();

  // Dynamic texts with fallbacks
  const heroBadge = settings.hero_badge || 'Agence digitale N°1 à Ziguinchor';
  const siteTagline = settings.site_tagline || 'Je propulse vos marques vers le succès digital';
  const heroSubtitle = settings.hero_subtitle || 'Création de sites web ultra-performants et gestion stratégique de vos réseaux sociaux pour transformer vos visiteurs en clients.';

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-light via-white to-orange-50/30">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-sm font-medium text-gray-600 mb-8 hover:shadow-md transition-shadow">
                <Sparkles size={16} className="text-secondary" />
                <span>{heroBadge}</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary tracking-tight leading-[1.15] mb-6">
                {siteTagline.includes('succès digital') ? (
                  <>
                    {siteTagline.split('succès digital')[0]}
                    <span className="text-secondary relative whitespace-nowrap">
                      succès digital
                      <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6C40.5 -1.5 160 -1.5 199 6" stroke="#FF6633" strokeWidth="4" strokeLinecap="round"/>
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
              <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
                {heroSubtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/services" className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 flex items-center justify-center gap-2">
                  Découvrir nos services
                  <ChevronRight size={20} />
                </Link>
                <Link to="/contact" className="w-full sm:w-auto bg-white text-gray-800 border-2 border-gray-100 px-8 py-4 rounded-full font-semibold text-lg hover:border-gray-200 hover:bg-gray-50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
                  Demander un devis
                  <ArrowRight size={20} className="text-secondary group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>
            
            {/* Trust Indicators */}
            <FadeIn delay={0.5} className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-center lg:justify-start gap-8">
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex items-center gap-2 text-primary font-bold text-xl">
                  <TrendingUp className="text-secondary" size={24} />
                  <span>+150%</span>
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Croissance moyenne</span>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex items-center gap-2 text-primary font-bold text-xl">
                  <Activity className="text-secondary" size={24} />
                  <span>24/7</span>
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Support réactif</span>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Visual Mockup */}
          <FadeIn delay={0.3} className="hidden lg:block relative">
            {/* Animated floating image container */}
            <div className="relative animate-[bounce_6s_infinite] drop-shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-primary/20 blur-3xl rounded-full transform -rotate-6 scale-105"></div>
              <img 
                src="/images/hero-mockup.png" 
                alt="Dashboard Mockup Expert Digital" 
                className="relative z-10 w-full max-w-[600px] mx-auto rounded-3xl object-cover transform rotate-2 hover:rotate-0 transition-transform duration-500"
              />
              
              {/* Floating decorative cards */}
              <div className="absolute -left-8 top-1/4 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-[pulse_4s_infinite] z-20">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-2 rounded-full">
                    <TrendingUp className="text-secondary" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Trafic SEO</p>
                    <p className="text-sm font-bold text-primary">+ 340%</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
          
        </div>
      </div>
    </section>
  );
};