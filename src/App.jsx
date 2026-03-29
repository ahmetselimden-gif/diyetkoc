// src/App.jsx
// Tüm ekranları birbirine bağlayan ana dosya

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

// Ekranları import et (dosyaları aşağıdaki yapıya koy)
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import AIPlanUretici from './pages/AIPlanUretici'
import MusteriPortal from './pages/MusteriPortal'
import MusteriPanel from './pages/MusteriPanel'

// ─── KORUNAN SAYFA ───────────────────────────────────────
// Giriş yapılmadıysa /giris'e yönlendir
function KorunmaSayfa({ children, user }) {
  if (!user) return <Navigate to="/giris" replace />
  return children
}

// ─── MÜŞTERİ SAYFASI ────────────────────────────────────
// /portal/:link → müşteri giriş gerektirmeden kendi planını görür
function PortalSayfa() {
  return <MusteriPortal />
}

// ─── ANA APP ─────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Sayfa açılınca oturumu kontrol et
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Oturum değişikliklerini dinle (giriş/çıkış)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#f5f2ec',
      fontFamily: 'DM Sans, sans-serif', color: '#8a8378'
    }}>
      Yükleniyor...
    </div>
  )

  return (
    <BrowserRouter>
      <Routes>

        {/* 1. LANDING PAGE — herkese açık */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. GİRİŞ / KAYIT — giriş yapıldıysa dashboard'a yönlendir */}
        <Route
          path="/giris"
          element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />}
        />

        {/* 3. DASHBOARD — giriş gerekli */}
        <Route
          path="/dashboard"
          element={
            <KorunmaSayfa user={user}>
              <Dashboard user={user} />
            </KorunmaSayfa>
          }
        />

        {/* 4. PLAN ÜRETİCİ — giriş gerekli */}
        <Route
          path="/plan-uret"
          element={
            <KorunmaSayfa user={user}>
              <AIPlanUretici user={user} />
            </KorunmaSayfa>
          }
        />

        {/* 4b. DEMO — plan-uret'e yönlendir (giriş gerekli) */}
        <Route path="/demo" element={<Navigate to="/plan-uret" replace />} />

        {/* 5. MÜŞTERİ PORTALI — giriş gerektirmez, link ile açılır */}
        <Route path="/portal/:portalLink" element={<PortalSayfa />} />

        {/* 6. MÜŞTERİ PANELİ — müşteri takip ekranı */}
        <Route path="/musteri-panel" element={<MusteriPanel />} />

        {/* Tanımlanmayan URL → ana sayfa */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}
