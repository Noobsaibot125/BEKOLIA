import { Link } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram } from 'react-icons/fa';

const PHONE = '+225 07 19 00 87 66';
const WHATSAPP = '2250719008766';
const EMAIL = 'contact@bekolia.ci';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* CTA Bar */}
      <div className="bg-gradient-to-r from-primary to-primary-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-2">
            Un problème de nuisibles ? Appelez-nous maintenant !
          </h3>
          <p className="text-blue-200 mb-6">Intervention rapide 7j/7 – Devis gratuit en 5 minutes</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`}
              className="flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg">
              <FaPhone /> {PHONE}
            </a>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25d366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1da851] transition-all shadow-lg">
              <FaWhatsapp className="text-xl" /> WhatsApp Immédiat
            </a>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/LogoSansFond.png" alt="BEKOLIA" className="h-12 brightness-0 invert" />
              <div>
                <p className="font-display font-black text-xl text-white">BEKOLIA</p>
                <p className="text-gray-400 text-xs">Expert en Fumigation</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Leader de la lutte anti-nuisibles en Côte d'Ivoire. Nous protégeons votre santé et vos biens depuis plus de 10 ans.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center hover:opacity-80 transition-all">
                <FaInstagram />
              </a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-[#25d366] rounded-lg flex items-center justify-center hover:bg-[#1da851] transition-all">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-6 border-b border-gray-700 pb-3">Nos Services</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {['Désinsectisation', 'Dératisation', 'Désinfection', 'Anti-Moustiques', 'Traitement Cafards', 'Traitement Termites', 'Fumigation', 'Assainissement'].map(s => (
                <li key={s}>
                  <Link to="/services" className="hover:text-green-light transition-colors flex items-center gap-2">
                    <span className="text-green-600">›</span> {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-6 border-b border-gray-700 pb-3">Liens Rapides</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/services', label: 'Nos Services' },
                { to: '/galerie', label: 'Galerie Photos' },
                { to: '/contact', label: 'Demander un Devis' },
                { to: '/contact', label: 'Nous Contacter' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-green-light transition-colors flex items-center gap-2">
                    <span className="text-green-600">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-6 border-b border-gray-700 pb-3">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <a href={`tel:${PHONE}`} className="flex items-start gap-3 hover:text-white transition-colors">
                  <FaPhone className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{PHONE}</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white transition-colors">
                  <FaWhatsapp className="text-[#25d366] mt-0.5 flex-shrink-0 text-base" />
                  <span>WhatsApp disponible</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 hover:text-white transition-colors">
                  <FaEnvelope className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{EMAIL}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Abidjan, Côte d'Ivoire<br />Toutes communes</span>
              </li>
              <li className="flex items-start gap-3">
                <FaClock className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>7j/7 – 24h/24<br />Intervention rapide</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} <span className="text-white font-semibold">BEKOLIA</span>. Tous droits réservés.
          </p>
          <p className="text-gray-600 text-xs">
            Expert en Fumigation, Brumisation & Lutte Anti-Nuisibles en Côte d'Ivoire
          </p>
        </div>
      </div>
    </footer>
  );
}
