import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import apiService from '../services/apiService';

// LoginScreen.jsx
export default function LoginScreen({ onLoginSuccess }) {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Remove tudo que não é número
  const onlyDigits = (s) => s.replace(/\D/g, '');

  // Formata CPF como 000.000.000-00
  const formatCpf = (value) => {
    const d = onlyDigits(value).slice(0, 11);
    const parts = [];
    if (d.length > 0) parts.push(d.slice(0, 3));
    if (d.length > 3) parts.push(d.slice(3, 6));
    if (d.length > 6) parts.push(d.slice(6, 9));
    let formatted = parts.join('.');
    if (d.length > 9) formatted += '-' + d.slice(9, 11);
    return formatted;
  };

  const handleCpfChange = (e) => setCpf(formatCpf(e.target.value));
  const isValidCpf = (value) => onlyDigits(value).length === 11;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isValidCpf(cpf)) {
      setError('CPF inválido. Digite os 11 dígitos.');
      return;
    }
    if (!senha) {
      setError('Senha é obrigatória.');
      return;
    }

    setLoading(true);
    try {
      const data = await apiService.login({ cpf: onlyDigits(cpf), senha });

      // 🔑 Se login bem-sucedido, avisa o App para mudar a tela
      if (onLoginSuccess) onLoginSuccess(data);
    } catch (err) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 font-sans">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Cortex Pay - Login</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">CPF</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                inputMode="numeric"
                value={cpf}
                onChange={handleCpfChange}
                placeholder="000.000.000-00"
                maxLength={14}
                className="pl-10 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha"
                className="pl-10 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg text-white font-medium bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <a href="#" className="hover:underline">Esqueci a senha</a>
        </div>
      </div>
    </div>
  );
}
