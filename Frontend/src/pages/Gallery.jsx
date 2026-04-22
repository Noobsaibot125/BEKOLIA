import { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';
import { FaPlay, FaImage, FaPhone, FaWhatsapp } from 'react-icons/fa';

const PHONE = '+225 07 19 00 87 66';
const WHATSAPP = '2250719008766';

const mediaItems = [
  { type: 'video', src: '/images/Vidéo.mp4', title: 'Intervention terrain – Fumigation', category: 'fumigation' },
  { type: 'video', src: '/images/Vidéo_1.mp4', title: 'Traitement anti-nuisibles', category: 'traitement' },
  { type: 'video', src: '/images/Vidéo_2.mp4', title: 'Brumisation professionnelle', category: 'brumisation' },
  { type: 'video', src: '/images/Vidéo_3.mp4', title: 'Désinsectisation bureau', category: 'desinsectisation' },
  { type: 'video', src: '/images/Vidéo_4.mp4', title: 'Traitement moustiques', category: 'traitement' },
  { type: 'video', src: '/images/Vidéo_5.mp4', title: 'Dératisation professionnelle', category: 'deratisation' },
  { type: 'video', src: '/images/Vidéo_6.mp4', title: 'Fumigation entrepôt', category: 'fumigation' },
  { type: 'video', src: '/images/Vidéo_7.mp4', title: 'Assainissement locaux', category: 'assainissement' },
  { type: 'video', src: '/images/Vidéo_8.mp4', title: 'Intervention résidentielle', category: 'traitement' },
  { type: 'video', src: '/images/Vidéo_9.mp4', title: 'Traitement cafards', category: 'desinsectisation' },
  { type: 'video', src: '/images/Vidéo_10.mp4', title: 'Pulvérisation professionnelle', category: 'traitement' },
  { type: 'video', src: '/images/Vidéo_11.mp4', title: 'Protection locaux commerciaux', category: 'traitement' },
  { type: 'video', src: '/images/Vidéo_12.mp4', title: 'Traitement termites', category: 'deratisation' },
  { type: 'video', src: '/images/Vidéo_13.mp4', title: 'Intervention d\'urgence', category: 'fumigation' },
  { type: 'image', src: '/images/image1.jpeg', title: 'Traitement professionnel', category: 'traitement' },
  { type: 'image', src: '/images/image_1.jpeg', title: 'Intervention terrain', category: 'traitement' },
];

const categories = [
  { key: 'all', label: 'Tout voir' },
  { key: 'fumigation', label: 'Fumigation' },
  { key: 'traitement', label: 'Traitements' },
  { key: 'brumisation', label: 'Brumisation' },
  { key: 'desinsectisation', label: 'Désinsectisation' },
  { key: 'deratisation', label: 'Dératisation' },
  { key: 'assainissement', label: 'Assainissement' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = activeCategory === 'all'
    ? mediaItems
    : mediaItems.filter(m => m.category === activeCategory);

  const lightboxSlides = filtered.map(item =>
    item.type === 'video'
      ? { type: 'video', sources: [{ src: item.src, type: 'video/mp4' }], title: item.title }
      : { src: item.src, title: item.title }
  );

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
            Nos interventions
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-black text-white mb-6">
            Galerie Photos & Vidéos
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-blue-200 text-xl max-w-2xl mx-auto">
            Découvrez nos interventions réelles sur le terrain. Chaque image témoigne de notre professionnalisme et de l'efficacité de nos traitements.
          </motion.p>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-8 bg-white border-b sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                  activeCategory === cat.key
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-8">
            <span className="font-bold text-primary">{filtered.length}</span> médias trouvés
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setLightboxIndex(i)}
                className="relative group cursor-pointer rounded-2xl overflow-hidden bg-gray-200 aspect-video shadow-md hover:shadow-xl transition-all duration-300"
              >
                {item.type === 'video' ? (
                  <>
                    <video
                      src={item.src}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      muted
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <FaPlay className="text-primary ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-lg">
                        <FaImage className="text-primary" />
                      </div>
                    </div>
                  </>
                )}

                {/* Titre overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-semibold truncate">{item.title}</p>
                  <p className="text-white/60 text-xs capitalize">{item.type === 'video' ? '🎬 Vidéo' : '📷 Photo'}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox */}
          <Lightbox
            slides={lightboxSlides}
            open={lightboxIndex >= 0}
            index={lightboxIndex}
            close={() => setLightboxIndex(-1)}
            plugins={[Video]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-black text-white mb-4">
            Besoin d'une intervention similaire ?
          </h2>
          <p className="text-blue-200 mb-8">Contactez-nous pour un devis gratuit et rapide</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`}
              className="flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg">
              <FaPhone /> {PHONE}
            </a>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25d366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1da851] transition-all shadow-lg">
              <FaWhatsapp className="text-xl" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
