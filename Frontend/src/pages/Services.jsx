import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaBug, FaShieldAlt, FaLeaf, FaPhone, FaWhatsapp,
  FaArrowRight, FaCheckCircle, FaTools
} from 'react-icons/fa';
import { GiMouse, GiAmberMosquito, GiWorms, GiSpottedBug } from 'react-icons/gi';
import { MdSanitizer } from 'react-icons/md';

const PHONE = '+225 07 19 00 87 66';
const WHATSAPP = '2250719008766';

const services = [
  {
    icon: <FaBug size={40} />,
    slug: 'desinsectisation',
    name: 'Désinsectisation',
    tagline: 'Élimination totale des insectes nuisibles',
    description: 'Notre service de désinsectisation traite efficacement toutes les espèces d\'insectes nuisibles : fourmis, blattes, punaises de lit, moustiques, mouches, guêpes, frelons et autres. Nous utilisons des produits homologués et des techniques professionnelles pour garantir des résultats durables.',
    features: ['Traitement par gel insecticide', 'Pulvérisation ULV', 'Poudres insecticides', 'Traitement préventif et curatif', 'Produits sans danger pour la famille'],
    price: 'À partir de 25 000 FCFA',
    duration: '1 à 3 heures',
    guarantee: '3 mois',
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50',
  },
  {
    icon: <GiMouse size={40} />,
    slug: 'deratisation',
    name: 'Dératisation',
    tagline: 'Éradication des rongeurs par professionnels',
    description: 'Notre équipe spécialisée en dératisation élimine efficacement tous les rongeurs : rats, souris, mulots. Nous utilisons des pièges professionnels, des appâts certifiés et des techniques de surveillance avancées pour une intervention durable et sécurisée.',
    features: ['Inspection et détection des terriers', 'Poses de pièges professionnels', 'Appâts rodenticides sécurisés', 'Colmatage des entrées', 'Suivi post-traitement'],
    price: 'À partir de 30 000 FCFA',
    duration: '2 à 4 heures',
    guarantee: '6 mois',
    color: 'from-green-500 to-green-700',
    bg: 'bg-green-50',
  },
  {
    icon: <MdSanitizer size={40} />,
    slug: 'desinfection',
    name: 'Désinfection',
    tagline: 'Assainissement complet de vos locaux',
    description: 'Service de désinfection professionnelle par brumisation ou pulvérisation de produits bactéricides et virucides. Idéal après infestation, épidémie, ou pour l\'entretien régulier de vos locaux commerciaux, industriels et résidentiels.',
    features: ['Brumisation à froid ou thermique', 'Produits bactéricides et virucides', 'Désinfection des surfaces et de l\'air', 'Traitement des conduits et canalisations', 'Certificat de désinfection fourni'],
    price: 'À partir de 20 000 FCFA',
    duration: '1 à 2 heures',
    guarantee: '1 mois',
    color: 'from-teal-500 to-teal-700',
    bg: 'bg-teal-50',
  },
  {
    icon: <GiAmberMosquito size={40} />,
    slug: 'anti-moustiques',
    name: 'Traitement Anti-Moustiques',
    tagline: 'Protection durable contre les moustiques',
    description: 'Brumisation thermique et ULV (Ultra Bas Volume) pour éliminer les moustiques adultes et leurs larves. Solution idéale pour les jardins, terrasses, hôtels, campements, restaurants et zones humides. Efficace pendant la saison des pluies.',
    features: ['Brumisation thermique à chaud', 'Traitement ULV sans odeur', 'Élimination larves et adultes', 'Protection zones jardins et terrasses', 'Traitement gîtes larvaires'],
    price: 'À partir de 15 000 FCFA',
    duration: '30 min à 2 heures',
    guarantee: '2 semaines',
    color: 'from-purple-500 to-purple-700',
    bg: 'bg-purple-50',
  },
  {
    icon: <GiSpottedBug size={40} />,
    slug: 'cafards',
    name: 'Traitement des Cafards',
    tagline: 'Élimination radicale des blattes',
    description: 'Traitement radical contre les cafards et blattes par gel insecticide, poudres et spray professionnel. Résultats visibles en 24 à 48 heures. Notre méthode élimine les nids et empêche toute réinfestation grâce à une barrière protectrice durable.',
    features: ['Gel insecticide effet domino', 'Traitement des fissures et recoins', 'Poudres insecticides résiduelles', 'Spray de choc immédiat', 'Garantie absence de cafards'],
    price: 'À partir de 20 000 FCFA',
    duration: '1 à 2 heures',
    guarantee: '3 mois',
    color: 'from-orange-500 to-orange-700',
    bg: 'bg-orange-50',
  },
  {
    icon: <GiWorms size={40} />,
    slug: 'termites',
    name: 'Traitement des Termites',
    tagline: 'Protection de vos structures en bois',
    description: 'Traitement curatif et préventif anti-termites pour protéger vos bâtiments, mobiliers et structures en bois. Nous créons une barrière chimique autour des fondations et traitons directement les zones infestées pour stopper la destruction.',
    features: ['Injection en profondeur', 'Barrière chimique des fondations', 'Traitement des bois en place', 'Protection du mobilier', 'Diagnostic gratuit inclus'],
    price: 'Sur devis',
    duration: '3 à 8 heures',
    guarantee: '5 ans',
    color: 'from-yellow-600 to-yellow-800',
    bg: 'bg-yellow-50',
  },
  {
    icon: <FaTools size={40} />,
    slug: 'fumigation',
    name: 'Fumigation',
    tagline: 'Traitement intensif par gaz fumigène',
    description: 'La fumigation est le traitement le plus intense pour éliminer tous les organismes nuisibles dans un espace clos. Idéal pour les conteneurs maritimes, entrepôts de stockage, silos à grain, véhicules et bâtiments fortement infestés.',
    features: ['Phosphine ou Méthyl Bromure', 'Traitement conteneurs et entrepôts', 'Élimination totale garantie', 'Respect normes internationales', 'Certificat phytosanitaire disponible'],
    price: 'Sur devis',
    duration: '24 à 72 heures',
    guarantee: '100% efficacité',
    color: 'from-red-500 to-red-700',
    bg: 'bg-red-50',
  },
  {
    icon: <FaLeaf size={40} />,
    slug: 'assainissement',
    name: 'Assainissement',
    tagline: 'Nettoyage et sain de vos locaux',
    description: 'Service complet d\'assainissement après intervention. Élimination des cadavres, déjections, nids et odeurs persistantes. Nous remettons vos locaux dans un état parfaitement propre et sain après tout traitement anti-nuisibles.',
    features: ['Nettoyage post-intervention', 'Élimination des odeurs', 'Désinfection des zones traitées', 'Ramassage des cadavres', 'Rapport d\'intervention fourni'],
    price: 'Sur devis',
    duration: '2 à 6 heures',
    guarantee: 'Satisfaction garantie',
    color: 'from-emerald-500 to-emerald-700',
    bg: 'bg-emerald-50',
  },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-premium pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img src="/images/LogoSansFond.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-green-light font-semibold text-sm uppercase tracking-widest mb-4">
              Solutions professionnelles
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-display font-black text-white mb-6">
              Nos Services Anti-Nuisibles
            </motion.h1>
            <motion.p variants={fadeUp} className="text-blue-200 text-xl max-w-2xl mx-auto mb-10">
              Des solutions complètes, efficaces et garanties pour tous vos problèmes de nuisibles en Côte d'Ivoire
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <a href={`tel:${PHONE}`} className="flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all">
                <FaPhone /> {PHONE}
              </a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25d366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1da851] transition-all">
                <FaWhatsapp className="text-xl" /> Devis Gratuit WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-premium transition-all duration-300 ${
                  i % 2 === 0 ? '' : 'flex-row-reverse'
                }`}
              >
                <div className={`grid md:grid-cols-5 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Icon/Visual side */}
                  <div className={`md:col-span-2 bg-gradient-to-br ${service.color} p-10 flex flex-col items-center justify-center text-white text-center ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                    <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mb-6">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl font-display font-black mb-2">{service.name}</h2>
                    <p className="text-white/80 text-sm mb-6">{service.tagline}</p>

                    <div className="space-y-2 w-full">
                      <div className="bg-white/10 rounded-xl p-3">
                        <p className="text-white/60 text-xs">Prix</p>
                        <p className="font-bold">{service.price}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/10 rounded-xl p-3">
                          <p className="text-white/60 text-xs">Durée</p>
                          <p className="font-semibold text-sm">{service.duration}</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-3">
                          <p className="text-white/60 text-xs">Garantie</p>
                          <p className="font-semibold text-sm">{service.guarantee}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`md:col-span-3 p-8 md:p-10 flex flex-col justify-center ${i % 2 !== 0 ? 'md:order-1' : ''}`}>
                    <p className="text-gray-600 leading-relaxed text-lg mb-8">{service.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <FaCheckCircle className="text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link to="/contact" className="btn-primary">
                        Demander un Devis <FaArrowRight />
                      </Link>
                      <a href={`https://wa.me/${WHATSAPP}?text=Bonjour, je suis intéressé par votre service de ${service.name}`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn-whatsapp">
                        <FaWhatsapp className="text-xl" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-premium">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-6">
            Vous ne trouvez pas votre problème ?
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Contactez-nous ! Nous avons une solution pour chaque situation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`}
              className="flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all text-lg shadow-xl">
              <FaPhone /> Appeler Maintenant
            </a>
            <Link to="/contact" className="flex items-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-lg">
              <FaArrowRight /> Formulaire Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
