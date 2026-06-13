import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching settings:', error);
        } else if (data) {
          const map = {};
          data.forEach((item) => {
            map[item.key] = item.value;
          });
          setSettings(map);
        }
        setLoading(false);
      });
  }, []);

  return { settings, loading };
};