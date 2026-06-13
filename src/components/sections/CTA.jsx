import { FadeIn } from '../ui/FadeIn';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTA = () => (
  <section className="py-24 bg-primary relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
    
    <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
      <FadeIn>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Prêt à dominer votre marché ?</h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Contactez-nous aujourd'hui pour une consultation gratuite et découvrez comment nous pouvons transformer votre présence en ligne.
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-secondary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-secondary transition-all hover:shadow-2xl hover:shadow-white/10 group">
          Démarrer mon projet
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </FadeIn>
    </div>
  </section>
);