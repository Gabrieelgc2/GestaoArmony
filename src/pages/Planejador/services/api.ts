// src/services/api.ts
import axios from 'axios';
import { supabase } from '@/supabaseClient';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://gestao-armony-backend.onrender.com',
});

api.interceptors.request.use(async (config) => {
  // 1. Tenta pegar o access_token direto da sessão ativa do Supabase
  const { data } = await supabase.auth.getSession();
  let token = data.session?.access_token;

  // 2. Fallback: Se o SDK do Supabase não retornar a tempo, busca direto no localStorage
  if (!token) {
    const authKey = Object.keys(localStorage).find((key) => key.includes('auth-token'));
    if (authKey) {
      try {
        const parsed = JSON.parse(localStorage.getItem(authKey) || '{}');
        token = parsed.access_token;
      } catch (err) {
        console.error('Erro ao decodificar token do localStorage:', err);
      }
    }
  }

  // 3. Anexa o Bearer Token no cabeçalho se ele existir
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('⚠️ NENHUM TOKEN ENCONTRADO! A requisição sairá sem o cabeçalho Authorization.');
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});