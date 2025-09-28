import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import apiService from '../services/apiService';

export default function RegisterScreen({ onRegisterSuccess, goToLogin }) {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onlyDigits = (s) => s.replace(/\D/g, '');

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
      setError('CPF inválido.');
      return;
    }
    if (!nome) {
      setError('Nome é obrigatório.');
      return;
    }
    if (!email) {
      setError('Email é obrigatório.');
      return;
    }
    if (!senha) {
      setError('Senha é obrigatória.');
      return;
    }

    setLoading(true);
    try {
      const userData = {
        cpf: onlyDigits(cpf),
        name: nome,
        email,
        senha
      };

      const data = await apiService.createUser(userData);

      if (onRegisterSuccess) onRegisterSuccess(data);
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 font-sans">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Cadastro - Cortex Pay</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* CPF */}
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

          {/* Nome */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="pl-10 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha"
                className="pl-10 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg text-white font-medium bg-gradient-to-r from-green-500 to-teal-600 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        {/* Botão para voltar ao login */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <button
            onClick={goToLogin}
            className="hover:underline text-blue-600 font-medium"
          >
            Já possui login? Entre
          </button>
        </div>
      </div>
    </div>
  );
}
