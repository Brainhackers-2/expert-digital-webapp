import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export const Contact = () => {
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('contact_messages').insert([formData]);
    if (error) {
      console.error(error);
      setStatus('error');
    } else {
      setStatus('success');
      setFormData({ full_name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">Contactez-nous</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nom complet</label>
          <input required type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Téléphone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Sujet</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Message</label>
          <textarea required name="message" value={formData.message} onChange={handleChange} className="w-full p-2 border rounded" rows="4"></textarea>
        </div>
        <button type="submit" disabled={status === 'loading'} className="bg-secondary text-white px-6 py-2 rounded">
          {status === 'loading' ? 'Envoi...' : 'Envoyer'}
        </button>
        {status === 'success' && <p className="text-green-600 mt-2">Message envoyé avec succès !</p>}
        {status === 'error' && <p className="text-red-600 mt-2">Une erreur est survenue.</p>}
      </form>
    </div>
  );
};