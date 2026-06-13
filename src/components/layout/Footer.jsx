import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary text-white rounded-lg flex items-center justify-center font-black text-lg">
                ED
              </div>
              Expert Digital
            </Link>
            <p className="text-gray-400">
              Je propulse vos marques vers le succès digital avec des stratégies sur-mesure et des outils ultra-performants.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Liens rapides</h4>
            <ul className="space-y-3">
              <li><Link to="/a-propos" className="hover:text-secondary transition-colors">À propos de nous</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Nos services</Link></li>
              <li><Link to="/realisations" className="hover:text-secondary transition-colors">Nos réalisations</Link></li>
              <li><Link to="/temoignages" className="hover:text-secondary transition-colors">Témoignages clients</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Nos services</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="hover:text-secondary transition-colors">Création de sites web</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Gestion des réseaux sociaux</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Publicité digitale</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Design Graphique</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-secondary shrink-0 mt-1" size={20} />
                <span>Ziguinchor, Sénégal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-secondary shrink-0" size={20} />
                <span>+221 78 508 58 31<br/>+221 78 354 00 61</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-secondary shrink-0" size={20} />
                <a href="mailto:expertdigital836@gmail.com" className="hover:text-secondary transition-colors">expertdigital836@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Expert Digital. Tous droits réservés.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};