import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  useEffect(() => {
    supabase.from('portfolio_items').select('*').eq('is_published', true).then(({ data }) => {
      if (data) setPortfolio(data);
    });
  }, []);
  return { portfolio };
};