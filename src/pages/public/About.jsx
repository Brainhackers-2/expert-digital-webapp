import { useTeam } from '../../hooks/useTeam';
import { useSettings } from '../../hooks/useSettings';
import { FadeIn } from '../../components/ui/FadeIn';
import { Shield, Users, Trophy, Lightbulb, CheckCircle2, Linkedin } from 'lucide-react';

export const About = () => {
  const { team } = useTeam();
  const { settings } = useSettings();

  const siteTagline = settings.site_tagline || 'Je propulse vos marques vers le succès digital';
  const siteDescription = settings.site_description || 'Expert Digital est une agence marketing digitale basée à Ziguinchor, Sénégal, spécialisée dans la création de sites web professionnels et la gestion des réseaux sociaux. Nous accompagnons les PME et grandes entreprises partout au Sénégal.';

  const values = [
    {
      title: 'Professionnalisme',
      description: 'Un travail soigné, de qualité supérieure et livré dans les délais convenus.',
      icon: Shield,
      color: 'text-primary bg-primary/5',
    },
    {
      title: 'Proximité',
      description: 'À l\'écoute attentive de chaque client, nous construisons une relation de confiance et de partenariat durable.',
      icon: Users,
      color: 'text-secondary bg-secondary/5',
    },
    {
      title: 'Performance',
      description: 'Orientés résultats, nous concevons des stratégies qui génèrent de la valeur et un retour sur investissement concret.',
      icon: Trophy,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Innovation',
      description: 'Nous proposons des solutions modernes, créatives et parfaitement adaptées à l\'écosystème du marché local.',
      icon: Lightbulb,
      color: 'text-indigo-600 bg-indigo-50',
    },
  ];

  const whyChooseUs = [
    'Équipe jeune, créative et passionnée par le succès de vos projets.',
    'Expertise locale avec des standards de qualité internationaux.',
    'Plus de 29 clients satisfaits et 100% de recommandation.',
    'Accompagnement de A à Z (stratégie, design, code, publicité).',
    'Solutions adaptées aux budgets des PME et des commerces sénégalais.',
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Page Hero */}
      <section className="relative bg-gradient-to-br from-primary to-[#0c1a2f] text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,102,51,0.08),transparent_50%)]"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-secondary/15 px-4.5 py-1.5 rounded-full border border-secondary/10">
                Qui sommes-nous ?
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-6 leading-tight">
                Propulser votre marque vers le <span className="text-secondary">succès digital</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mt-6 leading-relaxed">
                {siteTagline}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Presentation */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn delay={0.1}>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Notre histoire & Notre Mission</h2>
                <div className="w-16 h-1 bg-secondary rounded-full"></div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Basée à Ziguinchor, Sénégal, <strong>Expert Digital</strong> est née de la volonté d'offrir aux PME, commerces locaux et grandes entreprises sénégalaises des outils marketing digitaux performants pour s'imposer sur le marché.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {siteDescription} Nous croyons fermement que la transformation digitale est un levier majeur de croissance et d'inclusion économique pour nos communautés.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-video lg:aspect-square flex items-center justify-center bg-gradient-to-tr from-primary/10 to-secondary/10">
                <img 
                  src="https://i.imgur.com/ur9GB01.jpeg" 
                  alt="Expert Digital Presentation" 
                  className="w-48 h-48 object-contain rounded-2xl shadow-xl animate-pulse" 
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-light/60 py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeIn>
              <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Nos fondations</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-primary">Mission, Vision & Valeurs</h3>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <FadeIn key={idx} delay={0.1 * idx}>
                  <div className="bg-white p-8 rounded-3xl border border-gray-50 shadow-lg shadow-primary/5 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 h-full">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${val.color}`}>
                      <Icon size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-primary mb-3">{val.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{val.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeIn>
              <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">L'équipe</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-primary">Les experts derrière vos projets</h3>
              <p className="text-gray-600 mt-4">
                Une équipe jeune, passionnée et qualifiée prête à propulser votre entreprise.
              </p>
            </FadeIn>
          </div>

          {team.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              Chargement des profils de l'équipe...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, idx) => (
                <FadeIn key={member.id} delay={0.1 * idx}>
                  <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg shadow-primary/5 hover:shadow-2xl transition-all duration-300 group">
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      {member.photo_url ? (
                        <img 
                          src={member.photo_url} 
                          alt={member.full_name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary text-4xl font-bold">
                          {member.full_name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      
                      {member.linkedin_url && (
                        <a 
                          href={member.linkedin_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="absolute bottom-4 right-4 bg-white hover:bg-secondary text-[#0077B5] hover:text-white p-2.5 rounded-full shadow-lg transition-colors z-10"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h4 className="font-bold text-primary text-lg">{member.full_name}</h4>
                      <p className="text-secondary text-xs font-semibold uppercase tracking-wider mt-1">{member.role}</p>
                      {member.bio && (
                        <p className="text-gray-500 text-xs mt-3 leading-relaxed border-t border-gray-50 pt-3">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl -mr-48 -mb-48"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Pourquoi nous ?</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold leading-tight mb-8">
                Faire d'Expert Digital votre partenaire de croissance
              </h3>
              <div className="space-y-4">
                {whyChooseUs.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="text-secondary shrink-0 mt-1" size={20} />
                    <p className="text-gray-300 text-base">{item}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="flex justify-center">
              <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-md max-w-md w-full">
                <h4 className="text-xl font-bold mb-4">Prêt à propulser votre business ?</h4>
                <p className="text-gray-400 text-sm mb-8">
                  Discutons ensemble de vos besoins de visibilité, de création de site internet ou de community management.
                </p>
                <a 
                  href="/contact" 
                  className="block text-center w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/15"
                >
                  Contactez un conseiller
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};