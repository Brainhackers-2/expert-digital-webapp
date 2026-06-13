const fs = require('fs');
const path = require('path');

const files = {
  'src/context/AuthContext.jsx': `import { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const AuthContext = createContext({ user: null });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};`,

  'src/hooks/useAuth.js': `import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
export const useAuth = () => useContext(AuthContext);`,

  'src/hooks/useServices.js': `import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
export const useServices = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    supabase.from('services').select('*').eq('is_published', true).order('display_order').then(({ data }) => {
      if (data) setServices(data);
    });
  }, []);
  return { services };
};`,

  'src/hooks/usePortfolio.js': `import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  useEffect(() => {
    supabase.from('portfolio_items').select('*').eq('is_published', true).then(({ data }) => {
      if (data) setPortfolio(data);
    });
  }, []);
  return { portfolio };
};`,

  'src/hooks/useTestimonials.js': `import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    supabase.from('testimonials').select('*').eq('is_published', true).then(({ data }) => {
      if (data) setTestimonials(data);
    });
  }, []);
  return { testimonials };
};`,

  'src/routes/ProtectedRoute.jsx': `import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/admin/login" />;
  return children;
};`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(__dirname, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log('Created', filepath);
});
