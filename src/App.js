import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import AIPlanUretici from './pages/AIPlanUretici'
import MusteriPortal from './pages/MusteriPortal'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plan-uret" element={<AIPlanUretici />} />
        <Route path="/portal" element={<MusteriPortal />} />
      </Routes>
    </BrowserRouter>
  )
}