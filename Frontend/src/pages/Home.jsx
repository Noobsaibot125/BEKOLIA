import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView as useIntersection } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  FaPhone, FaWhatsapp, FaFileAlt, FaBug, FaCheckCircle,
  FaStar, FaArrowRight, FaShieldAlt, FaClock, FaAward,
  FaHandshake, FaUsers, FaLeaf
} from 'react-icons/fa';
import { GiMouse, GiAmberMosquito, GiWorms } from 'react-icons/gi';
import api from '../utils/api';

const DEFAULT_PHONE = '+225 07 19 00 87 66';
const DEFAULT_WHATSAPP = '2250719008766';

const serviceCards = [
  { icon: <FaBug size={32} />, name: 'Désinsectisation', desc: 'Élimination complète de tous les insectes nuisibles', color: 'from-blue-500 to-blue-700' },
  { icon: <GiMouse size={32} />, name: 'Dératisation', desc: 'Éradication efficace des rongeurs par professionnels', color: 'from-green-500 to-green-700' },
  { icon: <FaLeaf size={32} />, name: 'Désinfection', desc: 'Assainissement complet par brumisation ou pulvérisation', color: 'from-teal-500 to-teal-700' },
  { icon: <GiAmberMosquito size={32} />, name: 'Anti-Moustiques', desc: 'Brumisation thermique et ULV contre les moustiques', color: 'from-purple-500 to-purple-700' },
  { icon: <GiWorms size={32} />, name: 'Termites', desc: 'Protection anti-termites, traitement curatif et préventif', color: 'from-orange-500 to-orange-700' },
  { icon: <FaShieldAlt size={32} />, name: 'Fumigation', desc: 'Traitement par fumigation pour espaces clos', color: 'from-red-500 to-red-700' },
];

const whyUs = [
  { icon: <FaShieldAlt />, title: 'Produits Certifiés', desc: 'Produits homologués, sans danger pour votre famille et vos animaux' },
  { icon: <FaClock />, title: 'Intervention Rapide', desc: 'Disponible 7j/7, 24h/24. Nous intervenons dans l\'heure qui suit votre appel' },
  { icon: <FaUsers />, title: 'Personnel Qualifié', desc: 'Techniciens formés et expérimentés avec plus de 10 ans d\'expertise' },
  { icon: <FaHandshake />, title: 'Prix Compétitifs', desc: 'Tarifs transparents et accessibles. Devis gratuit sans engagement' },
  { icon: <FaAward />, title: 'Garantie Résultats', desc: 'Satisfaction garantie ou nous revenons gratuitement' },
  { icon: <FaCheckCircle />, title: 'Entreprise Agréée', desc: 'Société officielle agréée et assurée en Côte d\'Ivoire' },
];

const defaultTestimonials = [
  { name: 'Kouassi Jean-Marc', location: 'Cocody, Abidjan', rating: 5, comment: 'Excellent service ! L\'équipe est venue en moins de 2 heures. Les cafards ont totalement disparu. Je recommande vivement BEKOLIA !' },
  { name: 'Madame Traoré', location: 'Plateau, Abidjan', rating: 5, comment: 'Après plusieurs tentatives avec d\'autres sociétés, BEKOLIA a enfin résolu notre problème de rats. Personnel professionnel et produits efficaces.' },
  { name: 'Restaurant Le Saveur', location: 'Marcory, Abidjan', rating: 5, comment: 'Nous faisons appel à BEKOLIA chaque trimestre. Impeccable, sérieux et discret. Notre restaurant est certifié propre !' },
  { name: 'Koné Ibrahim', location: 'Yopougon, Abidjan', rating: 5, comment: 'Service rapide pour les termites. Le traitement préventif était très professionnel. Prix correct pour la qualité offerte.' },
  { name: 'Hôtel Palm Beach', location: 'Treichville, Abidjan', rating: 5, comment: 'BEKOLIA est notre partenaire depuis 2 ans. Traitement régulier anti-moustiques. Nos clients sont enfin tranquilles le soir !' },
];

function StatCard({ value, suffix, label, start }) {
  return (
    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
      <div className="text-4xl md:text-5xl font-display font-black text-white mb-2">
        {start ? <CountUp end={value} duration={2.5} suffix={suffix} /> : `0${suffix}`}
      </div>
      <p className="text-blue-200 font-medium text-sm tracking-wide uppercase italic opacity-80">{label}</p>
    </div>
  );
}

export default function Home() {
  const [statsRef, statsInView] = useIntersection({ triggerOnce: true, threshold: 0.3 });
  const [settings, setSettings] = useState({});
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    api.get('/public/settings').then(r => setSettings(r.data)).catch(() => {});
    api.get('/public/testimonials').then(r => {
      if (r.data && r.data.length > 0) setTestimonials(r.data);
    }).catch(() => {});
  }, []);

  const phone = settings.company_phone || DEFAULT_PHONE;
  const whatsapp = settings.company_whatsapp || DEFAULT_WHATSAPP;
  const heroTitle = settings.hero_title || 'Élimination Rapide des Nuisibles en Côte d\'Ivoire';
  const heroSubtitle = settings.hero_subtitle || 'Experts en fumigation, brumisation et traitement anti-nuisibles. Intervention rapide 7j/7. Résultats garantis.';
  const heroBadge = settings.hero_badge || 'Service N°1 en Côte d\'Ivoire – Disponible 7j/7';
  const aboutTitle = settings.about_title || 'L\'Expert de Confiance pour votre Sécurité';
  const aboutText = settings.about_text || 'Depuis 10 ans, BEKOLIA protège les familles et entreprises d\'Abidjan contre les nuisibles. Notre équipe de professionnels qualifiés utilise des méthodes éprouvées et des produits homologués pour des résultats durables.';
  const ctaTitle = settings.cta_title || 'Besoin d\'une Désinsectisation Immédiate ?';
  const ctaSubtitle = settings.cta_subtitle || 'Nos techniciens interviennent chez vous en moins de 60 minutes. Éliminez définitivement les nuisibles avec nos solutions garanties.';

  const stats = [
    { value: parseInt(settings.stat_clients) || 2500, suffix: '+', label: 'Clients Satisfaits' },
    { value: parseInt(settings.stat_years) || 10, suffix: ' ans', label: 'D\'Expérience' },
    { value: parseInt(settings.stat_satisfaction) || 98, suffix: '%', label: 'Taux de Satisfaction' },
    { value: parseInt(settings.stat_interventions) || 24, suffix: 'h/24', label: 'Disponibilité' },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

  return (
    <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-animated-bg" />
        <div className="absolute inset-0 hero-grid-overlay opacity-10" />
        <div className="absolute top-20 right-20 w-64 h-64 border border-white/10 rounded-full" />
        <div className="absolute top-32 right-32 w-40 h-40 border border-white/10 rounded-full" />
        <div className="absolute bottom-20 left-20 w-48 h-48 border border-green-400/20 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <img src="/images/LogoSansFond.png" alt="" className="w-[800px] brightness-0 invert" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-8 flex justify-center">
                <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 border border-green-400/30 text-sm font-bold px-5 py-2.5 rounded-full backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {heroBadge}
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[1.1] mb-8">
                {heroTitle.includes('Nuisibles') ? (
                  <>
                    {heroTitle.split('Nuisibles')[0]}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Nuisibles</span>
                    {heroTitle.split('Nuisibles')[1]}
                  </>
                ) : heroTitle}
              </motion.h1>

              <motion.p variants={fadeUp}
                className="text-lg md:text-2xl text-blue-100/90 mb-12 leading-relaxed max-w-3xl mx-auto">
                {heroSubtitle}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-5">
                <a href={`tel:${phone}`}
                  className="flex items-center gap-3 bg-white text-primary font-bold px-8 py-5 rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-white/10 text-lg group">
                  <FaPhone className="text-primary group-hover:rotate-12 transition-transform" />
                  Appeler Maintenant
                </a>
                <a href={`https://wa.me/${whatsapp}?text=Bonjour BEKOLIA, je veux un devis gratuit.`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#25d366] text-white font-bold px-8 py-5 rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-green-500/20 text-lg group">
                  <FaWhatsapp className="text-2xl group-hover:scale-110 transition-transform" />
                  WhatsApp Immédiat
                </a>
                <Link to="/contact"
                  className="flex items-center gap-3 border-2 border-white/30 text-white font-bold px-8 py-5 rounded-2xl hover:bg-white hover:text-primary transition-all text-lg backdrop-blur-sm">
                  <FaFileAlt /> Devis Gratuit
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 mt-16 py-8 border-t border-white/10">
                {[
                  { icon: <FaCheckCircle />, label: 'Produits certifiés' },
                  { icon: <FaShieldAlt />, label: 'Garantie satisfaction' },
                  { icon: <FaUsers />, label: `${parseInt(settings.stat_clients) || 2500}+ clients satisfaits` },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/90 group cursor-default">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30 group-hover:bg-green-500 group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-green-600 font-semibold text-center text-sm uppercase tracking-widest mb-3">
              Ce que nous faisons
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">Nos Services Professionnels</motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              Des solutions complètes et efficaces pour éliminer tous les nuisibles et protéger votre environnement
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCards.map((s, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Link to="/services" className="card block p-8 group h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                      {s.icon}
                    </div>
                    <h3 className="font-display font-bold text-xl text-gray-900 mb-3">{s.name}</h3>
                    <p className="text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                    <span className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      En savoir plus <FaArrowRight />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeUp} className="text-center mt-10">
              <Link to="/services" className="btn-primary text-lg px-8 py-4">
                Voir tous nos services <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section ref={statsRef} className="py-20 bg-premium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <StatCard key={i} {...s} start={statsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== POURQUOI NOUS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <video autoPlay muted loop playsInline className="w-full h-80 object-cover">
                  <source src="/images/Vidéo_3.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-premium">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <FaAward className="text-white text-2xl" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{parseInt(settings.stat_satisfaction) || 98}%</p>
                    <p className="text-gray-500 text-sm">Taux de satisfaction</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-3">Pourquoi nous choisir</p>
              <h2 className="text-3xl md:text-4xl font-display font-black text-primary mb-6">{aboutTitle}</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">{aboutText}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyUs.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-colors">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">Devis Gratuit <FaArrowRight /></Link>
                <a href={`tel:${phone}`} className="btn-outline border-primary text-primary hover:bg-primary hover:text-white">
                  <FaPhone /> {phone}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TÉMOIGNAGES ===== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-green-600 font-semibold text-center text-sm uppercase tracking-widest mb-3">
              Avis clients
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">Ce que disent nos clients</motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              Des milliers de familles et entreprises nous font confiance à Abidjan
            </motion.p>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="pb-12"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="card p-6 h-full">
                  <div className="flex text-yellow-400 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => <FaStar key={j} />)}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 italic">"{t.comment}"</p>
                  <div className="flex items-center gap-3 border-t pt-4">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">{t.location}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20 bg-premium relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img src="/images/LogoSansFond.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="mb-8 inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-white font-semibold text-sm"
          >
            Disponible Maintenant – Devis Express
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white mb-8"
          >
            {ctaTitle}
          </motion.h2>
          <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto">{ctaSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href={`tel:${phone}`}
              className="flex items-center gap-3 bg-white text-primary font-bold px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl text-lg group">
              <FaPhone className="group-hover:rotate-12 transition-transform" /> Appeler – {phone}
            </a>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25d366] text-white font-bold px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl text-lg group">
              <FaWhatsapp className="text-2xl group-hover:scale-110 transition-transform" /> WhatsApp Maintenant
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
