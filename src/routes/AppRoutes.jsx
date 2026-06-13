import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/public/Home';
import { About } from '../pages/public/About';
import { Services } from '../pages/public/Services';
import { Portfolio } from '../pages/public/Portfolio';
import { Testimonials } from '../pages/public/Testimonials';
import { Contact } from '../pages/public/Contact';
import { Login } from '../pages/admin/Login';
import { Dashboard } from '../pages/admin/Dashboard';
import { MessagesAdmin } from '../pages/admin/Messages';
import { ServicesAdmin } from '../pages/admin/Services';
import { PortfolioAdmin } from '../pages/admin/Portfolio';
import { TestimonialsAdmin } from '../pages/admin/TestimonialsAdmin';
import { TeamAdmin } from '../pages/admin/Team';
import { NewsletterAdmin } from '../pages/admin/Newsletter';
import { SettingsAdmin } from '../pages/admin/Settings';
import { AdminLayout } from '../components/admin/AdminLayout';
import { PublicLayout } from '../components/layout/PublicLayout';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/realisations" element={<Portfolio />} />
        <Route path="/temoignages" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin Login Route (No Layout) */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Routes with Sidebar/Topbar */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="messages" element={<MessagesAdmin />} />
        <Route path="services" element={<ServicesAdmin />} />
        <Route path="portfolio" element={<PortfolioAdmin />} />
        <Route path="testimonials" element={<TestimonialsAdmin />} />
        <Route path="team" element={<TeamAdmin />} />
        <Route path="newsletter" element={<NewsletterAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Route>
    </Routes>
  </BrowserRouter>
);