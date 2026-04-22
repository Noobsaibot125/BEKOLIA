import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Connexion réussie !');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Identifiants incorrects.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-premium flex items-center justify-center p-4">
      {/* Background logo */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <img src="/images/LogoSansFond.png" alt="" className="w-full h-full object-contain" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/images/LogoSansFond.png" alt="BEKOLIA" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-black text-primary">Administration</h1>
          <p className="text-gray-400 text-sm mt-1">Connectez-vous pour gérer votre site</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email administrateur</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                placeholder="admin@bekolia.ci"
                className="input-field pl-11"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                placeholder="••••••••"
                className="input-field pl-11 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary justify-center py-4 text-base disabled:opacity-50"
          >
            {loading ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Connexion...</>
            ) : (
              <><FaLock /> Se Connecter</>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-xs text-blue-600 font-medium text-center">
            🔒 Accès réservé aux administrateurs BEKOLIA
          </p>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-gray-400 text-sm hover:text-primary transition-colors">
            ← Retour au site
          </a>
        </div>
      </motion.div>
    </div>
  );
}
