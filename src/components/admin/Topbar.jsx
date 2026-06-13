import { supabase } from '../../lib/supabaseClient';
export const Topbar = () => {
  const handleLogout = async () => await supabase.auth.signOut();
  return (
    <div className="bg-white shadow p-4 flex justify-end">
      <button onClick={handleLogout} className="text-gray-600 hover:text-primary">Déconnexion</button>
    </div>
  );
};