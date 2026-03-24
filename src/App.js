/* eslint-disable */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import AIPlanUretici from './pages/AIPlanUretici'
import MusteriPortal from './pages/MusteriPortal'
import LandingPage from './pages/LandingPage'

function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (user === undefined) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'DM Sans',color:'#8a8378'}}>Yükleniyor...</div>;
  if (!user) return <Navigate to="/giris" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/giris" element={<AuthPage />} />
        <Route path="/portal" element={<MusteriPortal />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/plan-uret" element={<PrivateRoute><AIPlanUretici /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}