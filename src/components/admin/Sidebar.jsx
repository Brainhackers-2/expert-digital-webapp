import { Link } from 'react-router-dom';
export const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
    <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
    <nav className="flex flex-col space-y-2">
      <Link to="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
      <Link to="/admin/services" className="hover:bg-gray-700 p-2 rounded">Services</Link>
      <Link to="/admin/portfolio" className="hover:bg-gray-700 p-2 rounded">Portfolio</Link>
      <Link to="/admin/temoignages" className="hover:bg-gray-700 p-2 rounded">Témoignages</Link>
      <Link to="/admin/equipe" className="hover:bg-gray-700 p-2 rounded">Équipe</Link>
      <Link to="/admin/messages" className="hover:bg-gray-700 p-2 rounded">Messages</Link>
      <Link to="/admin/newsletter" className="hover:bg-gray-700 p-2 rounded">Newsletter</Link>
      <Link to="/admin/parametres" className="hover:bg-gray-700 p-2 rounded">Paramètres</Link>
    </nav>
  </div>
);