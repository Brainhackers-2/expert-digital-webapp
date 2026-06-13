import { FadeIn } from '../ui/FadeIn';
import { MonitorSmartphone, Megaphone, PenTool, Layout, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesPreview = () => {
  const services = [
    {
      title: 'Création de sites web',
      description: 'Des sites vitrines et e-commerce sur-mesure, rapides, sécurisés et optimisés pour la conversion et le SEO.',
      icon: Layout,
    },
    {
      title: 'Gestion des réseaux sociaux',
      description: 'Stratégie de contenu, animation de communauté et modération pour engager votre audience cible.',
      icon: MonitorSmartphone,
    },
    {
      title: 'Publicité digitale (Ads)',
      description: 'Campagnes ciblées sur Facebook, Instagram et Google pour maximiser votre retour sur investissement.',
      icon: Megaphone,
    },
    {
      title: 'Design Graphique',
      description: 'Identité visuelle, logos et supports de communication qui reflètent l\'ADN unique de votre marque.',
      icon: PenTool,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">Nos expertises</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-primary mb-6">Des solutions digitales complètes</h3>
            <p className="text-lg text-gray-600">Nous vous accompagnons de A à Z dans votre stratégie digitale avec des services sur-mesure adaptés à vos objectifs de croissance.</p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeIn key={index} delay={0.1 * index}>
                <div className="bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-light flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-3">{service.title}</h4>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{service.description}</p>
                  <Link to="/services" className="inline-flex items-center gap-2 text-secondary font-medium hover:text-primary transition-colors mt-auto">
                    En savoir plus
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.4} className="text-center">
          <Link to="/services" className="inline-flex items-center gap-2 bg-light text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors">
            Voir tous nos services
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};