// src/lib/supabase.js
// Supabase'e üye olduktan sonra bu değerleri kendi bilgilerinle değiştir
// https://supabase.com → New Project → Settings → API

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://SENIN_PROJE_ID.supabase.co'
const SUPABASE_ANON_KEY = 'SENIN_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ─── AUTH ────────────────────────────────────────────────
export const signUp = async (email, password, meta) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: meta }
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export const signOut = async () => {
  await supabase.auth.signOut()
}

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// ─── MÜŞTERİLER ─────────────────────────────────────────
export const getMusteriler = async (kocId) => {
  const { data, error } = await supabase
    .from('musteriler')
    .select('*')
    .eq('koc_id', kocId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const musteri_ekle = async (musteri) => {
  const { data, error } = await supabase
    .from('musteriler')
    .insert([musteri])
    .select()
  return { data, error }
}

// ─── PLANLAR ─────────────────────────────────────────────
export const planlariGetir = async (musteriId) => {
  const { data, error } = await supabase
    .from('planlar')
    .select('*')
    .eq('musteri_id', musteriId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const planKaydet = async (plan) => {
  const { data, error } = await supabase
    .from('planlar')
    .insert([plan])
    .select()
  return { data, error }
}

// ─── ÖLÇÜMLER ────────────────────────────────────────────
export const olcumEkle = async (olcum) => {
  const { data, error } = await supabase
    .from('olcumler')
    .insert([olcum])
    .select()
  return { data, error }
}

export const olcumleriGetir = async (musteriId) => {
  const { data, error } = await supabase
    .from('olcumler')
    .select('*')
    .eq('musteri_id', musteriId)
    .order('tarih', { ascending: true })
  return { data, error }
}
