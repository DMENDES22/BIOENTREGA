import React, { useState } from 'react';
import { Truck, Shield, User, Lock, ArrowRight, Activity, LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

interface LoginFormProps {
  onLogin: (email: string, role: 'ADMIN' | 'DRIVER', name: string) => void;
  drivers: { name: string; email: string }[];
}

export default function LoginForm({ onLogin, drivers }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      // Ensure popup runs synchronously in event handler
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      setError('Erro ao fazer login com o Google: ' + (err.message || 'tente novamente.'));
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Dynamic credentials validation checking custom dynamic drivers
    const matchingDriver = drivers.find(d => d.email === email.trim().toLowerCase());

    if (email === 'admin@bioentregas.com' && password === 'admin123') {
      onLogin(email, 'ADMIN', 'Coordenação Geral');
    } else if (matchingDriver && password === 'motorista123') {
      onLogin(matchingDriver.email, 'DRIVER', matchingDriver.name);
    } else {
      setError('Credenciais inválidas. Use os botões de login rápido abaixo.');
    }
  };

  const handleQuickLogin = (emailStr: string, role: 'ADMIN' | 'DRIVER', name: string) => {
    onLogin(emailStr, role, name);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
        id="login-card"
      >
        {/* Brand Banner with Biomig styling */}
        <div className="relative bg-gradient-to-tr from-biomig-navy via-slate-900 to-biomig-navy px-6 py-8 text-center text-white border-b-4 border-biomig-lime">
          {/* Biomig logo brand simulation using SVG and Typography */}
          <div className="mx-auto mb-2 flex flex-col items-center justify-center">
            {/* Green curved swooshes mimicking biomig leaf logo arches */}
            <svg className="h-6 w-24 text-biomig-lime mb-1" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M10 18 Q 50 2 90 15" />
              <path d="M25 18 Q 55 8 85 18" strokeWidth="1.5" opacity="0.6" />
            </svg>
            <div className="flex items-baseline">
              <span className="font-sans text-3.5xl font-black tracking-tight text-white lowercase">biomig</span>
            </div>
            <span className="text-[10px] font-extrabold tracking-widest text-[#98c30c] uppercase ml-14 -mt-1.5 font-sans">
              Brasil
            </span>
          </div>
          
          <p className="mt-2 text-[11px] text-slate-300 font-bold uppercase tracking-wider">
            LOGÍSTICA & ENTREGAS INTERNAS
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          {/* Real Google Account Login Branded Button */}
          <div className="mb-6">
            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98] cursor-pointer"
              id="btn-google-login"
            >
              <svg className="h-4.5 w-4.5 text-slate-700" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              {loading ? 'Conectando...' : 'Entrar com Conta Google'}
            </button>

            <div className="mt-5 flex items-center justify-between text-slate-400">
              <span className="h-px w-[42%] bg-slate-100"></span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">ou</span>
              <span className="h-px w-[42%] bg-slate-100"></span>
            </div>
          </div>

          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                E-mail
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="usuario@bioentregas.com"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-biomig-navy focus:bg-white focus:ring-2 focus:ring-biomig-light font-sans font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Senha
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-biomig-navy focus:bg-white focus:ring-2 focus:ring-biomig-light font-sans font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-biomig-navy py-3 text-sm font-bold text-white transition-all hover:bg-biomig-hover active:scale-[0.98] shadow-md hover:shadow-lg hover:shadow-biomig-navy/20 cursor-pointer"
              id="btn-entrar"
            >
              Entrar no Sistema
              <ArrowRight className="h-4 w-4 text-biomig-lime" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center justify-between text-slate-400">
            <span className="h-px w-[35%] bg-slate-200"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              Acesso Rápido (Demo)
            </span>
            <span className="h-px w-[35%] bg-slate-200"></span>
          </div>

          {/* Quick Logins */}
          <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@bioentregas.com', 'ADMIN', 'Coordenação Geral')}
              className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-left transition-all hover:bg-biomig-light/40 hover:border-biomig-lime/30 active:scale-[0.99] group cursor-pointer"
              id="btn-login-admin"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-biomig-navy text-white shadow-sm shadow-biomig-navy/10">
                  <Shield className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800">Administrativo</h4>
                  <p className="text-[10px] text-slate-500 font-mono">admin@bioentregas.com (admin123)</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-biomig-navy transition-transform group-hover:translate-x-0.5" />
            </button>

            {drivers.map((drv) => (
              <button
                key={drv.email}
                type="button"
                onClick={() => handleQuickLogin(drv.email, 'DRIVER', drv.name)}
                className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-left transition-all hover:bg-biomig-light/40 hover:border-biomig-lime/30 active:scale-[0.99] group cursor-pointer"
                id={`btn-login-${drv.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-biomig-lime text-white shadow-sm shadow-biomig-lime/15">
                    <Truck className="h-4.5 w-4.5 text-biomig-navy" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">Motorista: {drv.name}</h4>
                    <p className="text-[10px] text-slate-500 font-mono">{drv.email} (motorista123)</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-biomig-lime transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 py-3.5 text-center">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
            <Activity className="h-3 w-3 text-emerald-500 animate-pulse" /> MVP Operacional Externo
          </p>
        </div>
      </motion.div>
    </div>
  );
}
