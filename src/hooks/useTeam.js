import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
export const useTeam = () => {
  const [team, setTeam] = useState([]);
  useEffect(() => {
    supabase.from('team_members').select('*').order('display_order').then(({ data }) => {
      if (data) setTeam(data);
    });
  }, []);
  return { team };
};