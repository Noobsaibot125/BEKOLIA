import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt,
  FaClock, FaCheckCircle, FaPaperPlane, FaArrowRight
} from 'react-icons/fa';
import api from '../utils/api';

const PHONE = '+225 07 19 00 87 66';
const WHATSAPP = '2250719008766';
const EMAIL = 'contact@bekolia.ci';

const services = [
  'Désinsectisation', 'Dératisation', 'Désinfection',
  'Anti-Moustiques', 'Traitement Cafards', 'Traitement Termites',
  'Fumigation', 'Assainissement', 'Autre'
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', address: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.phone) return toast.error('Nom et téléphone sont obligatoires.');
    setLoading(true);
    try {
      await api.post('/contact/quote', form);
      setSent(true);
      toast.success('Votre demande a été envoyée ! Nous vous rappelons dans les 30 minutes.');
      setForm({ name: '', phone: '', email: '', service: '', address: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de l\'envoi. Réessayez ou appelez-nous.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-premium pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img src="/images/LogoSansFond.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-green-light font-semibold text-sm uppercase tracking-widest mb-4">
            Parlons-nous
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-black text-white mb-6">
            Contactez-Nous
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-blue-200 text-xl max-w-2xl mx-auto mb-10">
            Obtenez votre devis gratuit en 5 minutes. Intervention possible dans l'heure qui suit.
          </motion.p>
          {/* Quick contacts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`}
              className="flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg">
              <FaPhone /> {PHONE}
            </a>
            <a href={`https://wa.me/${WHATSAPP}?text=Bonjour BEKOLIA, je veux un devis gratuit.`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25d366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1da851] transition-all shadow-lg">
              <FaWhatsapp className="text-xl" /> WhatsApp Immédiat
            </a>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Info Card */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="space-y-6"
            >
              {/* Contact info */}
              <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="font-display font-bold text-xl text-primary mb-6">Informations de Contact</h3>
                <div className="space-y-5">
                  <a href={`tel:${PHONE}`} className="flex items-start gap-4 group">
                    <div className="w-11 h-11 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      <FaPhone />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Téléphone</p>
                      <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">{PHONE}</p>
                    </div>
                  </a>
                  <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                    <div className="w-11 h-11 bg-[#25d366]/10 text-[#25d366] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#25d366] group-hover:text-white transition-all">
                      <FaWhatsapp size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">WhatsApp</p>
                      <p className="font-bold text-gray-900 group-hover:text-[#25d366] transition-colors">Disponible 7j/7</p>
                    </div>
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex items-start gap-4 group">
                    <div className="w-11 h-11 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Email</p>
                      <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">{EMAIL}</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Zone d'intervention</p>
                      <p className="font-bold text-gray-900">Abidjan & Côte d'Ivoire</p>
                      <p className="text-gray-500 text-sm">Toutes communes couvertes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaClock />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Disponibilité</p>
                      <p className="font-bold text-green-600">7j/7 – 24h/24</p>
                      <p className="text-gray-500 text-sm">Intervention urgence possible</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Garanties */}
              <motion.div variants={fadeUp} className="bg-primary rounded-3xl p-8 text-white">
                <h3 className="font-display font-bold text-lg mb-5">Nos Engagements</h3>
                <div className="space-y-3">
                  {[
                    'Devis gratuit en 5 minutes',
                    'Intervention sous 1 heure',
                    'Produits homologués et sûrs',
                    'Garantie satisfaction',
                    'Personnel certifié',
                    'Prix transparents',
                  ].map((g, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-light flex-shrink-0" />
                      <span className="text-blue-100 text-sm">{g}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* WhatsApp direct */}
              <motion.div variants={fadeUp}>
                <a
                  href={`https://wa.me/${WHATSAPP}?text=Bonjour BEKOLIA ! Je souhaite un devis gratuit pour mon problème de nuisibles.`}
                  target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-[#25d366] text-white font-bold py-4 px-6 rounded-2xl text-center text-lg hover:bg-[#1da851] transition-all shadow-green"
                >
                  <FaWhatsapp className="inline text-2xl mr-2" />
                  Écrire sur WhatsApp Maintenant
                </a>
              </motion.div>
            </motion.div>

            {/* Formulaire */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-10 shadow-lg"
            >
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <FaCheckCircle className="text-green-600 text-4xl" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-gray-900 mb-3">Demande Envoyée !</h3>
                  <p className="text-gray-500 max-w-md mb-8">
                    Merci ! Nous avons bien reçu votre demande. Notre équipe vous contactera dans les <strong>30 minutes</strong>.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <a href={`tel:${PHONE}`} className="btn-primary">
                      <FaPhone /> Appeler maintenant
                    </a>
                    <button onClick={() => setSent(false)} className="btn-outline border-gray-300 text-gray-600 hover:bg-gray-50">
                      Nouvelle demande
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-display font-black text-primary mb-2">Demandez Votre Devis Gratuit</h2>
                    <p className="text-gray-500">Remplissez ce formulaire et nous vous répondons dans les 30 minutes.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom complet <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Votre nom et prénom"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Téléphone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="+225 07 XX XX XX XX"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        className="input-field"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Service souhaité</label>
                        <select name="service" value={form.service} onChange={handleChange} className="input-field">
                          <option value="">Choisir un service...</option>
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Votre quartier / commune</label>
                        <input
                          type="text"
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          placeholder="Ex: Cocody, Plateau..."
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Décrivez votre problème</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Décrivez votre problème de nuisibles, la superficie à traiter, l'urgence..."
                        className="input-field resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary justify-center py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane /> Envoyer ma Demande de Devis
                        </>
                      )}
                    </button>

                    <p className="text-gray-400 text-xs text-center">
                      En envoyant ce formulaire, vous acceptez d'être contacté par téléphone ou WhatsApp.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps placeholder */}
      <section className="h-80 bg-gray-200 relative overflow-hidden">
        <iframe
          title="Bekolia Abidjan"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254508.39280898!2d-4.0834!3d5.359952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ea5311959ad5%3A0x3e9e4c0e7c512e5d!2sAbidjan%2C%20C%C3%B4te%20d'Ivoire!5e0!3m2!1sfr!2sci!4v1713000000000!5m2!1sfr!2sci"
        />
      </section>
    </div>
  );
}
