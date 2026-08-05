// src/services/api.ts
import axios from 'axios';
import { supabase } from '@/supabaseClient';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://gestao-armony-backend.onrender.com',
});

api.interceptors.request.use(async (config) => {
  let token: string | undefined;

  // 1. Primeira tentativa: via SDK do Supabase
  try {
    const { data } = await supabase.auth.getSession();
    token = data.session?.access_token;
  } catch (err) {
    console.warn('Falha ao obter sessão do SDK Supabase:', err);
  }

  // 2. Segunda tentativa (Garantida): Varredura direta no localStorage
  if (!token) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      try {
        const item = JSON.parse(localStorage.getItem(key) || '{}');
        if (item && typeof item === 'object' && 'access_token' in item) {
          token = item.access_token;
          break; // Achou o token de autenticação, para o loop!
        }
      } catch {
        // Ignora itens do localStorage que não são JSON (ex: strings puras)
      }
    }
  }

  // 3. Injeta o cabeçalho Authorization se o token foi encontrado
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('⚠️ NENHUM TOKEN ENCONTRADO NO NAVEGADOR!');
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});