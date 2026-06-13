const fs = require('fs');
const path = require('path');

const files = {
  'src/components/ui/Button.jsx': `export const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5',
  };
  return (
    <button className={\`px-4 py-2 rounded-lg transition-colors \${variants[variant]} \${className}\`} {...props}>
      {children}
    </button>
  );
};`,

  'src/components/layout/Header.jsx': `import { Link } from 'react-router-dom';
export const Header = () => (
  <header className="sticky top-0 bg-white shadow-sm z-50">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-primary">Expert Digital</Link>
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-600 hover:text-primary">Accueil</Link>
        <Link to="/a-propos" className="text-gray-600 hover:text-primary">À propos</Link>
        <Link to="/services" className="text-gray-600 hover:text-primary">Services</Link>
        <Link to="/realisations" className="text-gray-600 hover:text-primary">Réalisations</Link>
        <Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link>
      </nav>
      <Link to="/contact" className="bg-secondary text-white px-4 py-2 rounded-lg">Nous contacter</Link>
    </div>
  </header>
);`,

  'src/components/layout/Footer.jsx': `export const Footer = () => (
  <footer className="bg-primary text-white py-8">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; {new Date().getFullYear()} Expert Digital. Tous droits réservés.</p>
    </div>
  </footer>
);`,

  'src/components/layout/WhatsAppButton.jsx': `export const WhatsAppButton = () => (
  <a href="https://wa.me/221785085831" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50">
    WA
  </a>
);`,

  'src/pages/public/Home.jsx': `export const Home = () => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-grow">
      <section className="bg-light py-20 text-center">
        <h1 className="text-5xl font-bold text-primary mb-4">Je propulse vos marques vers le succès digital</h1>
        <p className="text-xl text-gray-600 mb-8">Création de sites web & Gestion des réseaux sociaux</p>
        <div className="space-x-4">
          <a href="/services" className="bg-primary text-white px-6 py-3 rounded-lg">Nos services</a>
          <a href="/contact" className="bg-secondary text-white px-6 py-3 rounded-lg">Nous contacter</a>
        </div>
      </section>
    </main>
  </div>
);`,

  'src/pages/public/About.jsx': `export const About = () => <div className="p-8"><h1 className="text-3xl">À propos</h1></div>;`,
  'src/pages/public/Services.jsx': `export const Services = () => <div className="p-8"><h1 className="text-3xl">Nos Services</h1></div>;`,
  'src/pages/public/Portfolio.jsx': `export const Portfolio = () => <div className="p-8"><h1 className="text-3xl">Réalisations</h1></div>;`,
  'src/pages/public/Testimonials.jsx': `export const Testimonials = () => <div className="p-8"><h1 className="text-3xl">Témoignages</h1></div>;`,
  'src/pages/public/Contact.jsx': `export const Contact = () => <div className="p-8"><h1 className="text-3xl">Contactez-nous</h1></div>;`,
  'src/pages/admin/Login.jsx': `export const Login = () => <div className="p-8"><h1 className="text-3xl">Connexion Admin</h1></div>;`,
  'src/pages/admin/Dashboard.jsx': `export const Dashboard = () => <div className="p-8"><h1 className="text-3xl">Dashboard Admin</h1></div>;`,

  'src/routes/AppRoutes.jsx': `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/public/Home';
import { About } from '../pages/public/About';
import { Services } from '../pages/public/Services';
import { Portfolio } from '../pages/public/Portfolio';
import { Testimonials } from '../pages/public/Testimonials';
import { Contact } from '../pages/public/Contact';
import { Login } from '../pages/admin/Login';
import { Dashboard } from '../pages/admin/Dashboard';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { WhatsAppButton } from '../components/layout/WhatsAppButton';

export const AppRoutes = () => (
  <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/realisations" element={<Portfolio />} />
          <Route path="/temoignages" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  </BrowserRouter>
);`,

  'src/App.jsx': `import { AppRoutes } from './routes/AppRoutes';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <AppRoutes />
    </HelmetProvider>
  );
}

export default App;`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(__dirname, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log('Created', filepath);
});
