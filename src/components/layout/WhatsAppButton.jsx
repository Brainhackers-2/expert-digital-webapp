import { useState, useEffect } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { motion, AnimatePresence } from 'framer-motion';

export const WhatsAppButton = () => {
  const { settings, loading } = useSettings();
  const [showTooltip, setShowTooltip] = useState(false);

  // Trigger a tooltip pop-in after 3 seconds to capture visitor attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return null;

  // Use configured number or fallback to default
  const whatsappNumber = settings.whatsapp_number || '221785085831';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Bonjour%20Expert%20Digital,%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services.`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 bg-white text-gray-800 text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 max-w-[240px]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Besoin d'aide ? Discutez avec nous !</span>
            <button 
              onClick={() => setShowTooltip(false)} 
              className="text-gray-400 hover:text-gray-600 font-bold ml-1 text-xs"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group relative"
        aria-label="Discuter sur WhatsApp"
      >
        {/* Pulsing outer ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping group-hover:animate-none"></span>
        
        {/* WhatsApp SVG Icon */}
        <svg
          className="w-7 h-7 relative z-10 transition-transform group-hover:rotate-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.287 1.503 4.908 1.504 5.514 0 10.001-4.486 10.004-9.997.001-2.67-1.037-5.18-2.92-7.065C16.852 1.71 14.34 1.67 11.666 1.67A10.006 10.006 0 0 0 1.66 11.676c.001 1.705.452 3.369 1.31 4.862l-.99 3.613 3.677-.965zm10.748-5.32c-.3-.15-1.774-.875-2.048-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.204-.6-2.006-1.076-2.812-2.457-.216-.369.216-.343.62-.1.162.096.3.3.4.45.1.2.15.425.075.575-.075.15-.75 1.8-1.025 2.46-.268.65-.54 1.05-.82 1.05-.28 0-.575-.025-.85-.1-.4-.1-.85-.275-1.3-.575-1.425-.95-2.375-2.45-2.525-2.65-.15-.2-1.2-1.6-1.2-3.05 0-1.45.75-2.175 1.025-2.475.275-.3.6-.375.8-.375.2 0 .4 0 .575.025.175.025.4.025.625.5.225.475.775 1.875.85 2 .075.125.125.3.025.5-.1.2-.2.325-.35.475-.15.175-.315.35-.45.5-.15.15-.3.325-.125.625.35.6.875 1.1 1.65 1.775.775.675 1.45.925 1.75 1.05.3.125.475.1.65-.1.175-.2.75-.875.95-1.175.2-.3.4-.25.675-.15.275.1 1.775.875 2.075 1.025.3.15.5.225.575.35.075.125.075.725-.225 1.025z" />
        </svg>
      </motion.a>
    </div>
  );
};