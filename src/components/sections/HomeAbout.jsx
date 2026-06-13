import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/FadeIn';

export const HomeAbout = () => {
  const points = [
    "Une équipe jeune, créative et passionnée",
    "Des stratégies basées sur la data et les résultats",
    "Transparence totale et accompagnement sur-mesure",
    "Support technique réactif et disponible"
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <FadeIn className="relative">
            {/* Decorative background blob */}
            <div className="absolute inset-0 bg-secondary/10 rounded-[3rem] transform -rotate-3 scale-105"></div>
            
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="/images/agency-team.png" 
                alt="Équipe Expert Digital" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 flex items-center gap-4">
                <div className="text-secondary font-black text-3xl">5+</div>
                <div className="text-sm font-bold text-gray-700 leading-tight">
                  Années<br/>d'expérience
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Text Side */}
          <FadeIn delay={0.2}>
            <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">À Propos de Nous</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
              L'agence qui révèle le <span className="text-secondary relative whitespace-nowrap">
                potentiel
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6C40.5 -1.5 160 -1.5 199 6" stroke="#FF6633" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span> de votre entreprise
            </h3>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nous sommes bien plus qu'une simple agence digitale. Nous sommes vos partenaires de croissance. Notre mission est d'accompagner les entreprises, petites et grandes, dans leur transformation numérique avec des solutions innovantes et performantes.
            </p>

            <ul className="space-y-4 mb-10">
              {points.map((point, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="text-secondary flex-shrink-0" size={24} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 bg-light text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 group"
            >
              <span>En savoir plus sur notre agence</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};
