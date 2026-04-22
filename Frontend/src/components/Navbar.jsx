import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaPhone, FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const PHONE = '+225 07 19 00 87 66';
const WHATSAPP = '+2250719008766';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: 'Services' },
  { to: '/galerie', label: 'Galerie' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const isHome = location.pathname === '/';
  // Sur la homepage avant scroll : fond semi-transparent sombre
  // Après scroll ou sur autre page : fond blanc avec ombre
  const navBg = scrolled || !isHome
    ? 'bg-white shadow-lg'
    : 'bg-primary/90';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg} py-3`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo — toujours avec ses couleurs réelles */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/LogoSansFond.png"
              alt="BEKOLIA Logo"
              className="h-12 w-auto"
            />
            <div>
              <p className={`font-display font-black text-xl leading-none transition-colors ${
                scrolled || !isHome ? 'text-primary' : 'text-white'
              }`}>
                BEKOLIA
              </p>
              <p className={`text-xs transition-colors ${
                scrolled || !isHome ? 'text-gray-500' : 'text-blue-100'
              }`}>
                Expert en Fumigation
              </p>
            </div>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => {
                  const base = 'font-semibold transition-colors duration-200 pb-1 border-b-2';
                  if (isActive) return `${base} border-green-400 ${scrolled || !isHome ? 'text-primary' : 'text-white'}`;
                  return `${base} border-transparent ${scrolled || !isHome ? 'text-gray-700 hover:text-primary' : 'text-blue-100 hover:text-white'}`;
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25d366] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#1da851] transition-all text-sm shadow"
            >
              <FaWhatsapp className="text-lg" />
              WhatsApp
            </a>
            <a
              href={`tel:${PHONE}`}
              className={`flex items-center gap-2 font-semibold px-4 py-2 rounded-lg transition-all text-sm shadow ${
                scrolled || !isHome
                  ? 'bg-primary text-white hover:bg-primary-700'
                  : 'bg-white text-primary hover:bg-blue-50'
              }`}
            >
              <FaPhone />
              {PHONE}
            </a>
          </div>

          {/* Burger Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 rounded-lg ${scrolled || !isHome ? 'text-primary' : 'text-white'}`}
            aria-label="Menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t shadow-xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `block text-lg font-semibold py-2 border-b border-gray-100 ${
                      isActive ? 'text-primary' : 'text-gray-700'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25d366] text-white font-bold py-3 rounded-xl"
                >
                  <FaWhatsapp className="text-xl" /> WhatsApp
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-xl"
                >
                  <FaPhone /> {PHONE}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
