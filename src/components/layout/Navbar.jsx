import { Link } from 'react-router-dom';
export const Navbar = () => (
  <nav className="flex space-x-4">
    <Link to="/" className="text-gray-600 hover:text-primary">Accueil</Link>
    <Link to="/a-propos" className="text-gray-600 hover:text-primary">À propos</Link>
  </nav>
);