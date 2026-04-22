import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FaHome, FaEnvelope, FaTools, FaImages, FaStar, FaCog,
  FaSignOutAlt, FaBars, FaTimes, FaTrash, FaCheck, FaEdit,
  FaPlus, FaEye, FaUsers, FaUpload, FaKey, FaGlobe, FaPhone,
  FaSave, FaToggleOn, FaToggleOff
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const navItems = [
  { to: '/admin', label: 'Tableau de bord', icon: <FaHome /> },
  { to: '/admin/messages', label: 'Messages', icon: <FaEnvelope />, badge: true },
  { to: '/admin/accueil', label: 'Page d\'Accueil', icon: <FaGlobe /> },
  { to: '/admin/services', label: 'Services', icon: <FaTools /> },
  { to: '/admin/galerie', label: 'Galerie', icon: <FaImages /> },
  { to: '/admin/temoignages', label: 'Témoignages', icon: <FaStar /> },
  { to: '/admin/parametres', label: 'Paramètres', icon: <FaCog /> },
];

function Sidebar({ open, onClose, newMessages }) {
  const location = useLocation();
  const { logout, adminEmail } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-primary z-50 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/images/LogoSansFond.png" alt="BEKOLIA" className="h-10 brightness-0 invert" />
            <div>
              <p className="font-display font-black text-white text-lg">BEKOLIA</p>
              <p className="text-blue-200 text-xs">Administration</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden absolute top-4 right-4 text-white/60 hover:text-white"><FaTimes /></button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map(item => {
              const isActive = item.to === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link to={item.to} onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${isActive ? 'bg-white text-primary shadow-md' : 'text-blue-200 hover:bg-white/10 hover:text-white'}`}>
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && newMessages > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {newMessages > 9 ? '9+' : newMessages}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {adminEmail?.charAt(0)?.toUpperCase()}
            </div>
            <p className="text-blue-200 text-xs truncate">{adminEmail}</p>
          </div>
          <button onClick={() => { logout(); navigate('/admin/login'); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-xl transition-all text-sm font-medium">
            <FaSignOutAlt /> Se déconnecter
          </button>
        </div>
      </aside>
    </>
  );
}

// ===== DASHBOARD HOME =====
function DashboardHome() {
  const [stats, setStats] = useState(null);
  useEffect(() => { api.get('/admin/dashboard').then(r => setStats(r.data)).catch(() => {}); }, []);

  const cards = stats ? [
    { label: 'Total Messages', value: stats.contacts, icon: <FaEnvelope />, color: 'bg-blue-500', sub: `${stats.newContacts} nouveaux` },
    { label: 'Visiteurs Total', value: stats.visitors, icon: <FaUsers />, color: 'bg-green-500', sub: `${stats.visitorsToday} aujourd'hui` },
    { label: 'Services Actifs', value: stats.services, icon: <FaTools />, color: 'bg-purple-500', sub: 'Publiés sur le site' },
    { label: 'Témoignages', value: stats.testimonials, icon: <FaStar />, color: 'bg-yellow-500', sub: 'Affichés sur le site' },
  ] : [];

  return (
    <div>
      <h1 className="text-2xl font-display font-black text-gray-900 mb-2">Tableau de Bord</h1>
      <p className="text-gray-500 mb-8">Bienvenue dans l'administration BEKOLIA</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-md">
            <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center text-white mb-4`}>{card.icon}</div>
            <p className="text-3xl font-display font-black text-gray-900 mb-1">{card.value ?? '—'}</p>
            <p className="font-semibold text-gray-700 text-sm">{card.label}</p>
            <p className="text-gray-400 text-xs mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { to: '/admin/messages', label: 'Voir les messages', icon: <FaEnvelope />, color: 'from-blue-500 to-blue-600' },
          { to: '/admin/galerie', label: 'Ajouter des photos/vidéos', icon: <FaUpload />, color: 'from-green-500 to-green-600' },
          { to: '/admin/temoignages', label: 'Gérer témoignages', icon: <FaStar />, color: 'from-yellow-500 to-yellow-600' },
          { to: '/admin/accueil', label: 'Modifier page d\'accueil', icon: <FaGlobe />, color: 'from-indigo-500 to-indigo-600' },
          { to: '/admin/services', label: 'Modifier services', icon: <FaTools />, color: 'from-red-500 to-red-600' },
          { to: '/admin/parametres', label: 'Paramètres généraux', icon: <FaCog />, color: 'from-gray-600 to-gray-700' },
        ].map((action, i) => (
          <Link key={i} to={action.to}
            className={`flex items-center gap-3 p-4 bg-gradient-to-r ${action.color} text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all shadow-md`}>
            {action.icon} {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ===== MESSAGES =====
function Messages() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => { api.get('/admin/contacts').then(r => setContacts(r.data)).finally(() => setLoading(false)); }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/admin/contacts/${id}/status`, { status });
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    toast.success('Statut mis à jour.');
  };

  const deleteContact = async (id) => {
    if (!confirm('Supprimer ce message ?')) return;
    await api.delete(`/admin/contacts/${id}`);
    setContacts(prev => prev.filter(c => c.id !== id));
    toast.success('Message supprimé.');
  };

  const filtered = filter === 'all' ? contacts : contacts.filter(c => c.status === filter);
  const statusColors = { nouveau: 'bg-red-100 text-red-700', traite: 'bg-green-100 text-green-700', en_cours: 'bg-yellow-100 text-yellow-700' };

  return (
    <div>
      <h1 className="text-2xl font-display font-black text-gray-900 mb-2">Messages reçus</h1>
      <p className="text-gray-500 mb-6">{contacts.length} message(s) total</p>
      <div className="flex gap-3 mb-6 flex-wrap">
        {['all', 'nouveau', 'en_cours', 'traite'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filter === f ? 'bg-primary text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}>
            {f === 'all' ? 'Tous' : f === 'nouveau' ? 'Nouveaux' : f === 'en_cours' ? 'En cours' : 'Traités'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400"><FaEnvelope className="text-4xl mb-4 mx-auto opacity-30" /><p>Aucun message.</p></div>
      ) : (
        <div className="space-y-4">
          {filtered.map(c => (
            <div key={c.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-gray-900">{c.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[c.status] || 'bg-gray-100 text-gray-600'}`}>{c.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>📞 {c.phone}</span>
                    {c.email && <span>✉️ {c.email}</span>}
                    {c.service && <span>🔧 {c.service}</span>}
                    <span>🕐 {new Date(c.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <select value={c.status} onChange={e => updateStatus(c.id, e.target.value)}
                    className="text-sm border rounded-lg px-2 py-1.5 text-gray-700">
                    <option value="nouveau">Nouveau</option>
                    <option value="en_cours">En cours</option>
                    <option value="traite">Traité</option>
                  </select>
                  <a href={`tel:${c.phone}`} className="btn-primary py-1.5 px-3 text-sm"><FaPhone /> Appeler</a>
                  <button onClick={() => deleteContact(c.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><FaTrash /></button>
                </div>
              </div>
              {c.message && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-600 text-sm whitespace-pre-wrap">{c.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== PAGE ACCUEIL ADMIN =====
function AccueilAdmin() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/admin/settings').then(r => setSettings(r.data)).finally(() => setLoading(false));
  }, []);

  const save = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/admin/settings', settings);
      toast.success('Page d\'accueil mise à jour !');
    } catch { toast.error('Erreur lors de la sauvegarde.'); }
    finally { setSaving(false); }
  };

  const set = (key, val) => setSettings(prev => ({ ...prev, [key]: val }));

  if (loading) return <div className="text-center py-20"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-display font-black text-gray-900 mb-2">Page d'Accueil</h1>
      <p className="text-gray-500 mb-8">Modifiez le contenu affiché sur la page d'accueil publique</p>

      <form onSubmit={save} className="space-y-6">

        {/* Section Hero */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="font-display font-bold text-lg text-primary mb-5 flex items-center gap-2">
            <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm">🦸</span>
            Section Héro (bannière principale)
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Badge d'accroche</label>
              <input className="input-field" value={settings.hero_badge || ''} onChange={e => set('hero_badge', e.target.value)}
                placeholder="Service N°1 en Côte d'Ivoire – Disponible 7j/7" />
              <p className="text-xs text-gray-400 mt-1">Texte de la pastille verte en haut du hero</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Titre principal</label>
              <input className="input-field" value={settings.hero_title || ''} onChange={e => set('hero_title', e.target.value)}
                placeholder="Élimination Rapide des Nuisibles en Côte d'Ivoire" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sous-titre</label>
              <textarea className="input-field resize-none" rows={3} value={settings.hero_subtitle || ''} onChange={e => set('hero_subtitle', e.target.value)}
                placeholder="Experts en fumigation, brumisation..." />
            </div>
          </div>
        </div>

        {/* Section Statistiques */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="font-display font-bold text-lg text-primary mb-5 flex items-center gap-2">
            <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm">📊</span>
            Compteurs / Statistiques
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'stat_clients', label: 'Clients satisfaits', placeholder: '2500' },
              { key: 'stat_years', label: 'Années d\'expérience', placeholder: '10' },
              { key: 'stat_satisfaction', label: 'Taux satisfaction (%)', placeholder: '98' },
              { key: 'stat_interventions', label: 'Disponibilité (h/24)', placeholder: '24' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                <input type="number" className="input-field" value={settings[f.key] || ''} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} />
              </div>
            ))}
          </div>
        </div>

        {/* Section À propos */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="font-display font-bold text-lg text-primary mb-5 flex items-center gap-2">
            <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm">ℹ️</span>
            Section "Pourquoi nous choisir"
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Titre de la section</label>
              <input className="input-field" value={settings.about_title || ''} onChange={e => set('about_title', e.target.value)}
                placeholder="L'Expert de Confiance pour votre Sécurité" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Texte de présentation</label>
              <textarea className="input-field resize-none" rows={4} value={settings.about_text || ''} onChange={e => set('about_text', e.target.value)}
                placeholder="Depuis 10 ans, BEKOLIA protège les familles..." />
            </div>
          </div>
        </div>

        {/* Section CTA final */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="font-display font-bold text-lg text-primary mb-5 flex items-center gap-2">
            <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm">📣</span>
            Bandeau d'appel à l'action (bas de page)
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Titre</label>
              <input className="input-field" value={settings.cta_title || ''} onChange={e => set('cta_title', e.target.value)}
                placeholder="Besoin d'une Désinsectisation Immédiate ?" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sous-titre</label>
              <textarea className="input-field resize-none" rows={2} value={settings.cta_subtitle || ''} onChange={e => set('cta_subtitle', e.target.value)}
                placeholder="Nos techniciens interviennent chez vous en moins de 60 minutes..." />
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving}
          className="w-full btn-primary justify-center py-4 text-lg disabled:opacity-50">
          {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaSave />}
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}

// ===== SERVICES ADMIN =====
function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => { api.get('/admin/services').then(r => setServices(r.data)); }, []);

  const saveService = async (service) => {
    await api.put(`/admin/services/${service.id}`, service);
    setServices(prev => prev.map(s => s.id === service.id ? service : s));
    setEditing(null);
    toast.success('Service mis à jour.');
  };

  const toggleActive = async (service) => {
    const updated = { ...service, active: service.active ? 0 : 1 };
    await api.put(`/admin/services/${service.id}`, updated);
    setServices(prev => prev.map(s => s.id === service.id ? updated : s));
    toast.success(updated.active ? 'Service activé.' : 'Service désactivé.');
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-black text-gray-900 mb-2">Gestion des Services</h1>
      <p className="text-gray-500 mb-6">Modifiez le nom, le prix et la description de chaque service</p>

      <div className="space-y-4">
        {services.map(service => (
          <div key={service.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            {editing?.id === service.id ? (
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">✏️ Modifier : {service.name}</h3>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nom du service</label>
                      <input className="input-field" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Prix affiché</label>
                      <input className="input-field" value={editing.price} onChange={e => setEditing({ ...editing, price: e.target.value })}
                        placeholder="Ex: À partir de 25 000 FCFA" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description complète</label>
                    <textarea className="input-field resize-none" rows={4} value={editing.description}
                      onChange={e => setEditing({ ...editing, description: e.target.value })} />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => saveService(editing)} className="btn-primary"><FaCheck /> Enregistrer</button>
                    <button onClick={() => setEditing(null)} className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">Annuler</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-bold text-gray-900">{service.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${service.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {service.active ? '✅ Actif' : '⛔ Inactif'}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{service.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2">{service.description}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setEditing(service)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all" title="Modifier">
                    <FaEdit />
                  </button>
                  <button onClick={() => toggleActive(service)}
                    className={`p-2 rounded-lg transition-all ${service.active ? 'text-red-400 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'}`}
                    title={service.active ? 'Désactiver' : 'Activer'}>
                    {service.active ? <FaToggleOn className="text-xl" /> : <FaToggleOff className="text-xl" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== GALERIE ADMIN =====
function GalerieAdmin() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const fileRef = useRef();

  useEffect(() => { api.get('/admin/gallery').then(r => setImages(r.data)); }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name.replace(/\.[^/.]+$/, ''));
      formData.append('category', 'intervention');
      try {
        const res = await api.post('/admin/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setImages(prev => [{ ...res.data, created_at: new Date().toISOString() }, ...prev]);
      } catch {}
    }
    setUploading(false);
    toast.success('Fichier(s) uploadé(s) avec succès !');
    if (fileRef.current) fileRef.current.value = '';
  };

  const deleteImage = async (id) => {
    if (!confirm('Supprimer ce fichier de la galerie ?')) return;
    await api.delete(`/admin/gallery/${id}`);
    setImages(prev => prev.filter(i => i.id !== id));
    toast.success('Fichier supprimé.');
  };

  const updateTitle = async (id, title, category) => {
    await api.put(`/admin/gallery/${id}`, { title, category });
    setImages(prev => prev.map(i => i.id === id ? { ...i, title, category } : i));
    setEditingId(null);
    toast.success('Informations mises à jour.');
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-black text-gray-900 mb-1">Galerie Photos & Vidéos</h1>
          <p className="text-gray-500 text-sm">{images.length} fichier(s) uploadé(s) via admin</p>
        </div>
        <button onClick={() => fileRef.current?.click()} disabled={uploading} className="btn-primary disabled:opacity-50">
          {uploading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaUpload />}
          Ajouter des fichiers
        </button>
        <input ref={fileRef} type="file" multiple accept="image/*,video/mp4,video/webm" className="hidden" onChange={handleUpload} />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-blue-700 text-sm">
          💡 <strong>Comment ça marche :</strong> Les photos et vidéos uploadées ici apparaîtront <strong>en premier</strong> dans la galerie publique du site.
          Formats acceptés : JPG, PNG, WEBP, MP4 (max 50 Mo par fichier)
        </p>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-20 text-gray-400 bg-white rounded-2xl shadow-md">
          <FaImages className="text-5xl mb-4 mx-auto opacity-30" />
          <p className="font-semibold mb-2">Aucun fichier uploadé pour l'instant</p>
          <p className="text-sm">Cliquez sur "Ajouter des fichiers" pour uploader vos photos/vidéos</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(img => {
            const isVideo = /\.(mp4|mov|avi|webm)$/i.test(img.filename);
            const isEditing = editingId === img.id;
            return (
              <div key={img.id} className="bg-white rounded-xl shadow-md overflow-hidden group">
                <div className="relative aspect-video bg-gray-100">
                  {isVideo ? (
                    <video src={`/uploads/${img.filename}`} className="w-full h-full object-cover" />
                  ) : (
                    <img src={`/uploads/${img.filename}`} alt={img.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                      {isVideo ? '🎬' : '📷'}
                    </span>
                  </div>
                </div>
                {isEditing ? (
                  <EditGalleryItem img={img} onSave={updateTitle} onCancel={() => setEditingId(null)} />
                ) : (
                  <div className="p-3">
                    <p className="text-xs font-semibold text-gray-800 truncate mb-1">{img.title || img.filename}</p>
                    <p className="text-xs text-gray-400 mb-3">{img.category || 'intervention'}</p>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingId(img.id)}
                        className="flex-1 text-xs py-1.5 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1">
                        <FaEdit /> Modifier
                      </button>
                      <button onClick={() => deleteImage(img.id)}
                        className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-all">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EditGalleryItem({ img, onSave, onCancel }) {
  const [title, setTitle] = useState(img.title || '');
  const [category, setCategory] = useState(img.category || 'intervention');
  return (
    <div className="p-3 space-y-2">
      <input className="w-full text-xs border rounded-lg px-2 py-1.5" value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" />
      <select className="w-full text-xs border rounded-lg px-2 py-1.5" value={category} onChange={e => setCategory(e.target.value)}>
        <option value="fumigation">Fumigation</option>
        <option value="traitement">Traitement</option>
        <option value="brumisation">Brumisation</option>
        <option value="desinsectisation">Désinsectisation</option>
        <option value="deratisation">Dératisation</option>
        <option value="assainissement">Assainissement</option>
        <option value="intervention">Intervention</option>
      </select>
      <div className="flex gap-2">
        <button onClick={() => onSave(img.id, title, category)}
          className="flex-1 text-xs py-1.5 bg-primary text-white rounded-lg flex items-center justify-center gap-1">
          <FaCheck /> OK
        </button>
        <button onClick={onCancel} className="flex-1 text-xs py-1.5 border rounded-lg text-gray-600">Annuler</button>
      </div>
    </div>
  );
}

// ===== TEMOIGNAGES ADMIN =====
function TemoignagesAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', location: '', rating: 5, comment: '' });

  useEffect(() => { api.get('/admin/testimonials').then(r => setTestimonials(r.data)); }, []);

  const addTestimonial = async e => {
    e.preventDefault();
    const res = await api.post('/admin/testimonials', form);
    setTestimonials(prev => [{ ...form, id: res.data.id, active: 1 }, ...prev]);
    setForm({ name: '', location: '', rating: 5, comment: '' });
    setShowForm(false);
    toast.success('Témoignage ajouté.');
  };

  const saveEdit = async e => {
    e.preventDefault();
    await api.put(`/admin/testimonials/${editing.id}`, editing);
    setTestimonials(prev => prev.map(t => t.id === editing.id ? editing : t));
    setEditing(null);
    toast.success('Témoignage modifié.');
  };

  const toggleActive = async (t) => {
    const updated = { ...t, active: t.active ? 0 : 1 };
    await api.put(`/admin/testimonials/${t.id}`, updated);
    setTestimonials(prev => prev.map(x => x.id === t.id ? updated : x));
    toast.success(updated.active ? 'Témoignage affiché.' : 'Témoignage masqué.');
  };

  const deleteTestimonial = async (id) => {
    if (!confirm('Supprimer ce témoignage ?')) return;
    await api.delete(`/admin/testimonials/${id}`);
    setTestimonials(prev => prev.filter(t => t.id !== id));
    toast.success('Témoignage supprimé.');
  };

  const TestimonialForm = ({ data, setData, onSubmit, onCancel, title }) => (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl p-6 shadow-md border mb-6 space-y-4">
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Nom du client</label>
          <input className="input-field" required value={data.name} onChange={e => setData({ ...data, name: e.target.value })} placeholder="Ex: Jean Kouassi" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Localisation</label>
          <input className="input-field" value={data.location} onChange={e => setData({ ...data, location: e.target.value })} placeholder="Ex: Cocody, Abidjan" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Note</label>
        <select className="input-field" value={data.rating} onChange={e => setData({ ...data, rating: parseInt(e.target.value) })}>
          {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{'⭐'.repeat(n)} ({n}/5)</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Commentaire</label>
        <textarea className="input-field resize-none" rows={4} required value={data.comment} onChange={e => setData({ ...data, comment: e.target.value })}
          placeholder="Avis du client sur la prestation..." />
      </div>
      <div className="flex gap-3">
        <button type="submit" className="btn-primary"><FaCheck /> Enregistrer</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-lg text-gray-600">Annuler</button>
      </div>
    </form>
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-black text-gray-900 mb-1">Témoignages Clients</h1>
          <p className="text-gray-500 text-sm">{testimonials.length} témoignage(s) — affichés sur la page d'accueil</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditing(null); }} className="btn-primary">
          <FaPlus /> Ajouter un témoignage
        </button>
      </div>

      {showForm && !editing && (
        <TestimonialForm data={form} setData={setForm} onSubmit={addTestimonial} onCancel={() => setShowForm(false)} title="Nouveau témoignage" />
      )}
      {editing && (
        <TestimonialForm data={editing} setData={setEditing} onSubmit={saveEdit} onCancel={() => setEditing(null)} title="Modifier le témoignage" />
      )}

      <div className="space-y-4">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white rounded-2xl p-5 shadow-md border flex gap-4 items-start">
            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
              {t.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-bold text-gray-900">{t.name}</span>
                {t.location && <span className="text-gray-400 text-sm">— {t.location}</span>}
                <span className="text-yellow-400 text-sm">{'⭐'.repeat(t.rating)}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${t.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {t.active ? '👁️ Visible' : '🚫 Masqué'}
                </span>
              </div>
              <p className="text-gray-600 text-sm italic">"{t.comment}"</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => { setEditing(t); setShowForm(false); }}
                className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all" title="Modifier">
                <FaEdit />
              </button>
              <button onClick={() => toggleActive(t)}
                className={`p-2 rounded-lg transition-all ${t.active ? 'text-orange-500 hover:bg-orange-50' : 'text-green-500 hover:bg-green-50'}`}
                title={t.active ? 'Masquer' : 'Afficher'}>
                {t.active ? <FaTimes /> : <FaEye />}
              </button>
              <button onClick={() => deleteTestimonial(t.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== PARAMÈTRES =====
function Parametres() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });

  useEffect(() => { api.get('/admin/settings').then(r => setSettings(r.data)).finally(() => setLoading(false)); }, []);

  const saveSettings = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/admin/settings', settings);
      toast.success('Paramètres sauvegardés !');
    } catch { toast.error('Erreur lors de la sauvegarde.'); }
    finally { setSaving(false); }
  };

  const changePassword = async e => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirm) return toast.error('Les mots de passe ne correspondent pas.');
    try {
      await api.post('/auth/change-password', { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      toast.success('Mot de passe modifié avec succès !');
      setPwForm({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err) { toast.error(err.response?.data?.message || 'Erreur.'); }
  };

  if (loading) return <div className="text-center py-20"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  const set = (key, val) => setSettings(prev => ({ ...prev, [key]: val }));

  return (
    <div>
      <h1 className="text-2xl font-display font-black text-gray-900 mb-6">Paramètres Généraux</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Informations entreprise */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="font-display font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
              <FaCog className="text-primary" /> Informations de l'entreprise
            </h2>
            <form onSubmit={saveSettings} className="space-y-4">
              {[
                { key: 'company_name', label: 'Nom de l\'entreprise' },
                { key: 'company_tagline', label: 'Slogan' },
                { key: 'company_phone', label: 'Téléphone (affiché sur le site)' },
                { key: 'company_whatsapp', label: 'Numéro WhatsApp (chiffres seulement, ex: 2250719008766)' },
                { key: 'company_email', label: 'Email de contact' },
                { key: 'company_address', label: 'Adresse' },
                { key: 'company_hours', label: 'Horaires d\'ouverture' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                  <input className="input-field" value={settings[f.key] || ''} onChange={e => set(f.key, e.target.value)} />
                </div>
              ))}
              <button type="submit" disabled={saving} className="w-full btn-primary justify-center disabled:opacity-50">
                {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaSave />}
                Sauvegarder
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          {/* Changer mot de passe */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="font-display font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
              <FaKey className="text-primary" /> Changer le mot de passe
            </h2>
            <form onSubmit={changePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mot de passe actuel</label>
                <input type="password" className="input-field" required value={pwForm.currentPassword}
                  onChange={e => setPwForm({ ...pwForm, currentPassword: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nouveau mot de passe</label>
                <input type="password" className="input-field" required value={pwForm.newPassword}
                  onChange={e => setPwForm({ ...pwForm, newPassword: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmer le nouveau mot de passe</label>
                <input type="password" className="input-field" required value={pwForm.confirm}
                  onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })} />
              </div>
              <button type="submit" className="w-full btn-primary justify-center">
                <FaKey /> Changer le mot de passe
              </button>
            </form>
          </div>

          {/* Lien vers le site */}
          <div className="bg-gradient-to-br from-primary to-primary-700 rounded-2xl p-6 text-white">
            <h3 className="font-bold text-lg mb-2">Voir le site public</h3>
            <p className="text-blue-200 text-sm mb-4">Visualisez les changements en temps réel sur le site public.</p>
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-primary font-bold px-4 py-2 rounded-xl hover:bg-blue-50 transition-all w-fit">
              <FaEye /> Ouvrir le site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== DASHBOARD PRINCIPAL =====
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newMessages, setNewMessages] = useState(0);

  useEffect(() => {
    api.get('/admin/dashboard').then(r => setNewMessages(r.data.newContacts)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} newMessages={newMessages} />

      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-600 hover:text-primary rounded-lg">
            <FaBars />
          </button>
          <div className="flex-1">
            <p className="text-sm text-gray-500 font-medium">Administration BEKOLIA</p>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
            <FaEye /> Voir le site
          </a>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="messages" element={<Messages />} />
            <Route path="accueil" element={<AccueilAdmin />} />
            <Route path="services" element={<ServicesAdmin />} />
            <Route path="galerie" element={<GalerieAdmin />} />
            <Route path="temoignages" element={<TemoignagesAdmin />} />
            <Route path="parametres" element={<Parametres />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
