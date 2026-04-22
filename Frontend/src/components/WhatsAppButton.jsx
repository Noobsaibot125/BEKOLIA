import { useState } from 'react';
import { FaWhatsapp, FaTimes, FaPhone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP = '2250719008766';
const PHONE = '+2250719008766';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl p-5 w-72 mb-2 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#25d366] rounded-full flex items-center justify-center flex-shrink-0">
                <FaWhatsapp className="text-white text-2xl" />
              </div>
              <div>
                <p className="font-bold text-gray-800">BEKOLIA</p>
                <p className="text-green-600 text-sm font-medium">● En ligne – Répond vite</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <p className="text-gray-700 text-sm">
                👋 Bonjour ! Comment puis-je vous aider ?
              </p>
              <p className="text-gray-700 text-sm mt-1">
                Demandez votre <strong>devis gratuit</strong> maintenant !
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={`https://wa.me/${WHATSAPP}?text=Bonjour BEKOLIA, je souhaite un devis pour vos services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25d366] text-white font-bold py-3 rounded-xl hover:bg-[#1da851] transition-all"
              >
                <FaWhatsapp className="text-xl" />
                Démarrer sur WhatsApp
              </a>
              <a
                href={`tel:${PHONE}`}
                className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-700 transition-all"
              >
                <FaPhone />
                Appeler maintenant
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton principal */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 bg-[#25d366] rounded-full shadow-2xl flex items-center justify-center text-white relative"
        aria-label="Contacter via WhatsApp"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <FaTimes size={24} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <FaWhatsapp size={28} />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Badge notification */}
        {!open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
}
