import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, Mail, Briefcase, Image, MessageSquare, Users, Newspaper } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Messages', path: '/admin/messages', icon: Mail },
    { name: 'Newsletter', path: '/admin/newsletter', icon: Newspaper },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
    { name: 'Réalisations', path: '/admin/portfolio', icon: Image },
    { name: 'Témoignages', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'Équipe', path: '/admin/team', icon: Users },
    { name: 'Paramètres', path: '/admin/settings', icon: Settings },
  ];


  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 min-h-screen hidden md:block">
      <div className="p-6">
        <Link to="/" className="text-xl font-bold text-primary tracking-tight flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-black">
            ED
          </div>
          Admin
        </Link>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                  isActive 
                    ? 'bg-light text-primary' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-primary' : 'text-gray-400'} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};