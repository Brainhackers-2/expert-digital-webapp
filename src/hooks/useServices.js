import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
export const useServices = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    supabase.from('services').select('*').eq('is_published', true).order('display_order').then(({ data }) => {
      if (data) setServices(data);
    });
  }, []);
  return { services };
};