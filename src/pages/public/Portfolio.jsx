import { useState, useEffect } from 'react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { FadeIn } from '../../components/ui/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, User, ExternalLink, X, ArrowLeft, ArrowRight } from 'lucide-react';

export const Portfolio = () => {
  const { portfolio } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Extract unique categories from portfolio items dynamically
  const categories = ['Tous', ...new Set(portfolio.map(item => item.category).filter(Boolean))];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'Tous'
    ? portfolio
    : portfolio.filter(item => item.category === selectedCategory);

  // Formatter for dates
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  // Compile all images (main + secondary gallery) for the modal slider
  const getProjectImages = (project) => {
    if (!project) return [];
    const images = [project.image_url];
    if (project.gallery_urls && Array.isArray(project.gallery_urls)) {
      images.push(...project.gallery_urls.filter(Boolean));
    }
    return images;
  };

  const projectImages = getProjectImages(selectedProject);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Portfolio Hero */}
      <section className="relative bg-gradient-to-br from-primary to-[#0c1a2f] text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,102,51,0.08),transparent_50%)]"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-secondary/15 px-4.5 py-1.5 rounded-full border border-secondary/10">
                Nos réalisations
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-6 leading-tight">
                Notre <span className="text-secondary">Portfolio</span> d'Excellence
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mt-6 leading-relaxed">
                Découvrez des projets créatifs et technologiques menés à bien pour nos clients à travers le Sénégal.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Category Selector Tabs */}
      <section className="py-12 bg-light/30 border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12 flex flex-wrap gap-3 items-center justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedProject(null); // Reset detail if filtering
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          {portfolio.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              Chargement de nos projets...
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center text-gray-500 py-12 font-medium">
              Aucune réalisation dans cette catégorie pour le moment.
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project);
                      setCurrentSlideIndex(0);
                    }}
                    className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg shadow-primary/5 hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 border-b border-gray-50">
                        {project.image_url ? (
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                            <Briefcase size={32} />
                          </div>
                        )}
                        
                        {/* Overlay info */}
                        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="bg-white text-primary font-bold text-xs px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            Voir le projet
                            <ExternalLink size={14} />
                          </span>
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-6">
                        <span className="text-secondary font-bold text-[10px] uppercase tracking-wider bg-secondary/5 px-2.5 py-1 rounded-full">
                          {project.category}
                        </span>
                        <h3 className="font-extrabold text-primary text-lg mt-3 group-hover:text-secondary transition-colors duration-300 leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Metadata Footer */}
                    <div className="px-6 py-4 border-t border-gray-50 flex justify-between items-center bg-gray-50/50 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                      {project.client_name && (
                        <span className="flex items-center gap-1.5">
                          <User size={12} className="text-gray-400" />
                          {project.client_name}
                        </span>
                      )}
                      {project.realized_at && (
                        <span className="flex items-center gap-1.5 ml-auto">
                          <Calendar size={12} className="text-gray-400" />
                          {formatDate(project.realized_at)}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-primary/60 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col relative z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-800 p-2 rounded-full shadow-lg border border-gray-100 transition-colors z-20"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto flex-grow">
                {/* Images Slider */}
                <div className="relative aspect-video bg-gray-900 flex items-center justify-center overflow-hidden group/slider border-b border-gray-100">
                  {projectImages.length > 0 ? (
                    <>
                      <img
                        src={projectImages[currentSlideIndex]}
                        alt={`${selectedProject.title} slide`}
                        className="w-full h-full object-contain"
                      />
                      
                      {projectImages.length > 1 && (
                        <>
                          {/* Navigation arrows */}
                          <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-colors opacity-0 group-hover/slider:opacity-100"
                          >
                            <ArrowLeft size={16} />
                          </button>
                          <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-colors opacity-0 group-hover/slider:opacity-100"
                          >
                            <ArrowRight size={16} />
                          </button>
                          
                          {/* Indicators dots */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                            {projectImages.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentSlideIndex(idx)}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${
                                  currentSlideIndex === idx ? 'bg-white w-3.5' : 'bg-white/50'
                                }`}
                              ></button>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="text-white flex flex-col items-center gap-2">
                      <Briefcase size={40} className="text-gray-500" />
                      <span className="text-sm">Aucun visuel disponible</span>
                    </div>
                  )}
                </div>

                {/* Info Content */}
                <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left (Meta) */}
                  <div className="md:col-span-1 space-y-4 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6 h-fit">
                    <div>
                      <span className="text-secondary font-bold text-[10px] uppercase tracking-widest bg-secondary/5 px-2.5 py-1 rounded-full">
                        {selectedProject.category}
                      </span>
                      <h2 className="text-2xl font-extrabold text-primary mt-3 leading-tight">
                        {selectedProject.title}
                      </h2>
                    </div>

                    <div className="space-y-3 pt-4 text-sm text-gray-600">
                      {selectedProject.client_name && (
                        <div className="flex items-center gap-2.5">
                          <User size={16} className="text-secondary" />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 leading-none">Client</p>
                            <p className="font-semibold text-primary mt-0.5">{selectedProject.client_name}</p>
                          </div>
                        </div>
                      )}
                      {selectedProject.realized_at && (
                        <div className="flex items-center gap-2.5">
                          <Calendar size={16} className="text-secondary" />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 leading-none">Date de réalisation</p>
                            <p className="font-semibold text-primary mt-0.5">{formatDate(selectedProject.realized_at)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right (Description) */}
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">À propos de ce projet</h4>
                    {selectedProject.description ? (
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                        {selectedProject.description}
                      </p>
                    ) : (
                      <p className="text-gray-400 italic text-sm">Aucune description détaillée disponible pour cette réalisation.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-primary text-white font-bold px-6 py-2 rounded-xl text-sm hover:bg-primary/95 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};