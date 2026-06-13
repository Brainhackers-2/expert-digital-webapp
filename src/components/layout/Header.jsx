import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/a-propos' },
    { name: 'Services', path: '/services' },
    { name: 'Réalisations', path: '/realisations' },
    { name: 'Témoignages', path: '/temoignages' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-white py-5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary tracking-tight flex items-center gap-3">
          <img src="https://i.imgur.com/ur9GB01.jpeg" alt="Expert Digital Logo" className="w-10 h-10 object-contain rounded-lg shadow-sm" />
          <span>Expert Digital</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                location.pathname === link.path ? 'text-secondary' : 'text-gray-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="group flex items-center gap-2 bg-secondary text-white px-6 py-2.5 rounded-full font-medium hover:bg-secondary/90 transition-all hover:shadow-lg hover:shadow-secondary/30"
          >
            Démarrer un projet
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 py-4 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-lg font-medium ${
                location.pathname === link.path ? 'text-secondary' : 'text-gray-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-medium w-full mt-4"
          >
            Démarrer un projet
            <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </header>
  );
};