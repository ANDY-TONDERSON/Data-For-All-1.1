'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Ingresa tu correo y contraseña.');
      return;
    }

    setLoading(true);

    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('dfa_logged_in', '1');
        window.localStorage.setItem('dfa_user_email', email.trim());
      }
      router.push('/admin');
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 md:p-8">

        <h1 className="text-2xl font-bold text-[#111827] mb-2">
          Iniciar sesión
        </h1>
        <p className="text-sm text-[#6B7280] mb-6">
          Accede a tu panel para guardar y consultar el estado de tus denuncias.
        </p>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-[#6B7280] mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-[#6B7280] mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 px-4 py-2.5 rounded-lg bg-[#8B1538] text-white text-sm font-semibold hover:bg-[#6b0f2b] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>

        {/* ---- SECCIÓN NUEVA: Crear cuenta ---- */}
        <p className="text-center text-sm text-[#6B7280] mt-6">
          ¿No tienes cuenta?
          <Link
            href="/signup"
            className="text-[#8B1538] font-semibold ml-1 hover:underline"
          >
            Crear cuenta
          </Link>
        </p>

      </div>
    </main>
  );
}
