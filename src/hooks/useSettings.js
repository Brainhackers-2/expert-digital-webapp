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

  // Dynamically update browser tab favicon in the document head
  useEffect(() => {
    if (settings.site_favicon) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = settings.site_favicon;
    }
  }, [settings.site_favicon]);

  return { settings, loading };
};