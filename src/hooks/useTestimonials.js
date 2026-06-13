import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    supabase.from('testimonials').select('*').eq('is_published', true).then(({ data }) => {
      if (data) setTestimonials(data);
    });
  }, []);
  return { testimonials };
};