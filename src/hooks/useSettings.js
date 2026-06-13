import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
export const useSettings = () => {
  const [settings, setSettings] = useState([]);
  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data }) => {
      if (data) setSettings(data);
    });
  }, []);
  return { settings };
};