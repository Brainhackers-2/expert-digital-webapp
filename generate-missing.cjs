const fs = require('fs');
const path = require('path');

const files = {
  // assets directory
  'src/assets/.gitkeep': '',

  // UI Components
  'src/components/ui/Card.jsx': `export const Card = ({ children, className = '' }) => (
  <div className={\`bg-white rounded-xl shadow-md overflow-hidden \${className}\`}>
    {children}
  </div>
);`,
  'src/components/ui/Input.jsx': `export const Input = ({ label, ...props }) => (
  <div className="flex flex-col space-y-1">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <input className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" {...props} />
  </div>
);`,
  'src/components/ui/Modal.jsx': `export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
        {children}
      </div>
    </div>
  );
};`,
  'src/components/ui/Badge.jsx': `export const Badge = ({ children, className = '' }) => (
  <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white \${className}\`}>
    {children}
  </span>
);`,
  'src/components/ui/Loader.jsx': `export const Loader = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);`,

  // Layout Components
  'src/components/layout/Navbar.jsx': `import { Link } from 'react-router-dom';
export const Navbar = () => (
  <nav className="flex space-x-4">
    <Link to="/" className="text-gray-600 hover:text-primary">Accueil</Link>
    <Link to="/a-propos" className="text-gray-600 hover:text-primary">À propos</Link>
  </nav>
);`,

  // Section Components
  'src/components/sections/Hero.jsx': `export const Hero = () => (
  <section className="bg-light py-20 text-center">
    <h1 className="text-5xl font-bold text-primary mb-4">Je propulse vos marques vers le succès digital</h1>
    <p className="text-xl text-gray-600 mb-8">Création de sites web & Gestion des réseaux sociaux</p>
  </section>
);`,
  'src/components/sections/StatsBar.jsx': `export const StatsBar = () => (
  <div className="bg-primary text-white py-12">
    <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div><h3 className="text-4xl font-bold">1000+</h3><p>Abonnés Facebook</p></div>
      <div><h3 className="text-4xl font-bold">500+</h3><p>Abonnés LinkedIn</p></div>
      <div><h3 className="text-4xl font-bold">29</h3><p>Avis Clients</p></div>
      <div><h3 className="text-4xl font-bold">100%</h3><p>Recommandation</p></div>
    </div>
  </div>
);`,
  'src/components/sections/ServicesPreview.jsx': `export const ServicesPreview = () => (
  <section className="py-16">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Nos Services</h2>
      {/* Grid goes here */}
    </div>
  </section>
);`,
  'src/components/sections/Testimonials.jsx': `export const Testimonials = () => (
  <section className="bg-light py-16">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">Ce que disent nos clients</h2>
    </div>
  </section>
);`,
  'src/components/sections/CTA.jsx': `export const CTA = () => (
  <section className="bg-secondary text-white py-16 text-center">
    <h2 className="text-3xl font-bold mb-4">Prêt à démarrer votre projet ?</h2>
    <a href="/contact" className="bg-white text-secondary px-6 py-3 rounded-lg font-bold">Contactez-nous</a>
  </section>
);`,

  // Admin Components
  'src/components/admin/Sidebar.jsx': `import { Link } from 'react-router-dom';
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
);`,
  'src/components/admin/Topbar.jsx': `import { supabase } from '../../lib/supabaseClient';
export const Topbar = () => {
  const handleLogout = async () => await supabase.auth.signOut();
  return (
    <div className="bg-white shadow p-4 flex justify-end">
      <button onClick={handleLogout} className="text-gray-600 hover:text-primary">Déconnexion</button>
    </div>
  );
};`,
  'src/components/admin/DataTable.jsx': `export const DataTable = ({ columns, data }) => (
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>{columns.map((col, i) => <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{col}</th>)}</tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {/* Rows */}
    </tbody>
  </table>
);`,
  'src/components/admin/ImageUploader.jsx': `export const ImageUploader = () => (
  <div>
    <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"/>
  </div>
);`,

  // Public Pages missing
  'src/pages/public/ServiceDetail.jsx': `export const ServiceDetail = () => <div className="p-8"><h1 className="text-3xl">Détail du Service</h1></div>;`,

  // Admin Pages missing
  'src/pages/admin/Services.jsx': `export const ServicesAdmin = () => <div className="p-8"><h1 className="text-3xl">Gestion des Services</h1></div>;`,
  'src/pages/admin/Portfolio.jsx': `export const PortfolioAdmin = () => <div className="p-8"><h1 className="text-3xl">Gestion du Portfolio</h1></div>;`,
  'src/pages/admin/TestimonialsAdmin.jsx': `export const TestimonialsAdmin = () => <div className="p-8"><h1 className="text-3xl">Gestion des Témoignages</h1></div>;`,
  'src/pages/admin/Team.jsx': `export const TeamAdmin = () => <div className="p-8"><h1 className="text-3xl">Gestion de l'équipe</h1></div>;`,
  'src/pages/admin/Messages.jsx': `export const MessagesAdmin = () => <div className="p-8"><h1 className="text-3xl">Messages</h1></div>;`,
  'src/pages/admin/Newsletter.jsx': `export const NewsletterAdmin = () => <div className="p-8"><h1 className="text-3xl">Newsletter</h1></div>;`,
  'src/pages/admin/Settings.jsx': `export const SettingsAdmin = () => <div className="p-8"><h1 className="text-3xl">Paramètres</h1></div>;`,

  // Hooks missing
  'src/hooks/useTeam.js': `import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
export const useTeam = () => {
  const [team, setTeam] = useState([]);
  useEffect(() => {
    supabase.from('team_members').select('*').order('display_order').then(({ data }) => {
      if (data) setTeam(data);
    });
  }, []);
  return { team };
};`,
  'src/hooks/useSettings.js': `import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
export const useSettings = () => {
  const [settings, setSettings] = useState([]);
  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data }) => {
      if (data) setSettings(data);
    });
  }, []);
  return { settings };
};`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(__dirname, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
    console.log('Created', filepath);
  }
});
