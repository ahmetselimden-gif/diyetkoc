/* eslint-disable */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, getMusteriler, musteri_ekle, planKaydet, planlariGetir, signOut } from "../lib/supabase";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { min-height: 100vh; font-family: 'DM Sans', sans-serif; background: #f5f2ec; }

  /* Layout */
  .layout { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; }

  /* Sidebar */
  .sidebar { background: #1a2e23; padding: 1.5rem 1rem; display: flex; flex-direction: column; gap: 1.5rem; position: fixed; top: 0; left: 0; bottom: 0; width: 240px; overflow-y: auto; }
  .logo { display: flex; align-items: center; gap: 10px; padding: 0.25rem 0.5rem; }
  .logo-mark { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, #a8d5a2, #7ec477); display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 17px; font-weight: 600; color: #1a2e23; }
  .logo-text { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 400; color: #f5f2ec; letter-spacing: -0.01em; }
  .nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }
  .nav-section { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,242,236,0.28); padding: 1rem 0.75rem 0.5rem; font-weight: 500; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; font-size: 13.5px; color: rgba(245,242,236,0.55); cursor: pointer; transition: all 0.2s; border: 1px solid transparent; }
  .nav-item:hover { background: rgba(255,255,255,0.06); color: rgba(245,242,236,0.85); }
  .nav-item.active { background: rgba(168,213,162,0.12); color: #a8d5a2; border-color: rgba(168,213,162,0.15); }
  .nav-item .icon { font-size: 16px; width: 22px; text-align: center; }
  .nav-badge { margin-left: auto; background: #a8d5a2; color: #1a2e23; font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 100px; }
  .sidebar-user { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem; display: flex; align-items: center; gap: 10px; }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #a8d5a2, #7ec477); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; color: #1a2e23; }
  .user-info .name { font-size: 13px; font-weight: 500; color: #f5f2ec; }
  .user-info .role { font-size: 11px; color: rgba(245,242,236,0.35); }

  /* Main */
  .main { margin-left: 240px; padding: 2rem 2.5rem; max-width: 1200px; }

  /* Topbar */
  .topbar { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 2rem; gap: 16px; flex-wrap: wrap; }
  .topbar-left h1 { font-family: 'Fraunces', serif; font-size: 1.6rem; font-weight: 400; color: #1a2e23; letter-spacing: -0.02em; }
  .topbar-left p { font-size: 13px; color: #8a8378; margin-top: 4px; }
  .topbar-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; padding-top: 4px; }

  /* Buttons */
  .btn-outline { padding: 9px 18px; border: 1.5px solid #ddd9d0; border-radius: 10px; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1a2e23; cursor: pointer; transition: all 0.15s; }
  .btn-outline:hover { border-color: #c5c0b7; background: #faf9f6; }
  .btn-primary { padding: 9px 20px; border: none; border-radius: 10px; background: #1a2e23; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #f5f2ec; cursor: pointer; font-weight: 500; transition: all 0.15s; }
  .btn-primary:hover { background: #243d2f; }
  .btn-green { padding: 9px 20px; border: none; border-radius: 10px; background: linear-gradient(135deg, #a8d5a2, #7ec477); font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1a2e23; cursor: pointer; font-weight: 600; transition: all 0.15s; }
  .btn-green:hover { opacity: 0.9; }

  /* Metrics */
  .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 2rem; }
  .metric-card { background: #fff; border: 1px solid #eae6de; border-radius: 16px; padding: 1.25rem 1.4rem; transition: all 0.2s; }
  .metric-card:hover { border-color: #d8d3ca; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
  .metric-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .metric-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
  .metric-icon.green { background: #EAF3DE; }
  .metric-icon.blue { background: #E3EEF9; }
  .metric-icon.orange { background: #FDF1E1; }
  .metric-icon.purple { background: #F0E8F8; }
  .metric-label { font-size: 12.5px; color: #8a8378; font-weight: 400; }
  .metric-val { font-family: 'Fraunces', serif; font-size: 1.85rem; font-weight: 400; color: #1a2e23; line-height: 1; }
  .metric-sub { font-size: 12px; margin-top: 6px; color: #b0aa9f; }
  .metric-sub .up { color: #3B6D11; font-weight: 500; }
  .metric-sub .neutral { color: #8a8378; }

  /* Cards */
  .content-grid { display: grid; grid-template-columns: 1fr 340px; gap: 16px; }
  .card { background: #fff; border: 1px solid #eae6de; border-radius: 16px; overflow: hidden; }
  .card-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid #f0ece4; display: flex; align-items: center; justify-content: space-between; }
  .card-title { font-size: 15px; font-weight: 500; color: #1a2e23; }
  .card-sub { font-size: 12px; color: #8a8378; margin-top: 2px; }

  /* Table */
  table { width: 100%; border-collapse: collapse; }
  thead th { padding: 12px 1.5rem; text-align: left; font-size: 11px; font-weight: 500; color: #b5b0a7; letter-spacing: 0.06em; text-transform: uppercase; border-bottom: 1px solid #f0ece4; }
  tbody tr { border-bottom: 1px solid #f7f4ef; cursor: pointer; transition: background 0.15s; }
  tbody tr:hover { background: #faf9f6; }
  tbody tr:last-child { border-bottom: none; }
  tbody td { padding: 13px 1.5rem; font-size: 14px; color: #3a3732; }
  .client-name { display: flex; align-items: center; gap: 10px; }
  .client-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #e8e4dc, #d8d3ca); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #5a5650; flex-shrink: 0; }
  .client-fullname { font-weight: 500; color: #1a2e23; }
  .client-email { font-size: 12px; color: #8a8378; }

  /* Badges */
  .badge { display: inline-block; padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 500; }
  .badge.active { background: #EAF3DE; color: #3B6D11; }
  .badge.waiting { background: #FAEEDA; color: #854F0B; }
  .badge.bmi-normal { background: #EAF3DE; color: #3B6D11; }
  .badge.bmi-over { background: #FAEEDA; color: #854F0B; }
  .badge.bmi-obez { background: #FEE2E2; color: #B91C1C; }
  .badge.bmi-under { background: #E3EEF9; color: #1D4ED8; }

  /* Right column */
  .right-col { display: flex; flex-direction: column; gap: 14px; }

  /* Distribution card */
  .dist-card { background: #fff; border: 1px solid #eae6de; border-radius: 16px; padding: 1.25rem 1.4rem; }
  .dist-title { font-size: 14px; font-weight: 500; color: #1a2e23; margin-bottom: 14px; }
  .dist-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .dist-row:last-child { margin-bottom: 0; }
  .dist-label { font-size: 12.5px; color: #5a5650; width: 110px; flex-shrink: 0; }
  .dist-bar-bg { flex: 1; height: 8px; background: #f0ece4; border-radius: 100px; overflow: hidden; }
  .dist-bar { height: 100%; border-radius: 100px; transition: width 0.5s ease; }
  .dist-bar.green { background: linear-gradient(90deg, #a8d5a2, #7ec477); }
  .dist-bar.blue { background: linear-gradient(90deg, #93C5FD, #60A5FA); }
  .dist-bar.orange { background: linear-gradient(90deg, #FCD34D, #F59E0B); }
  .dist-bar.purple { background: linear-gradient(90deg, #C4B5FD, #A78BFA); }
  .dist-count { font-size: 12px; color: #8a8378; font-weight: 500; width: 24px; text-align: right; }

  /* Quick Actions */
  .quick-card { background: #1a2e23; border-radius: 16px; padding: 1.5rem; }
  .quick-title { font-family: 'Fraunces', serif; font-size: 1.05rem; font-weight: 400; color: #f5f2ec; margin-bottom: 4px; }
  .quick-sub { font-size: 12.5px; color: rgba(245,242,236,0.45); margin-bottom: 1.25rem; line-height: 1.5; }
  .quick-btn { width: 100%; padding: 11px 14px; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.06); font-family: 'DM Sans', sans-serif; font-size: 13px; color: #f5f2ec; cursor: pointer; transition: all 0.15s; margin-bottom: 8px; text-align: left; display: flex; align-items: center; gap: 8px; }
  .quick-btn:last-child { margin-bottom: 0; }
  .quick-btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.18); }
  .quick-btn .qicon { width: 28px; height: 28px; border-radius: 8px; background: rgba(168,213,162,0.15); display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }

  /* Search */
  .search-bar { display: flex; align-items: center; gap: 10px; margin-bottom: 1rem; flex-wrap: wrap; }
  .search-input { flex: 1; min-width: 200px; padding: 10px 14px 10px 36px; border: 1.5px solid #e4dfd5; border-radius: 10px; background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23b5b0a7' viewBox='0 0 24 24'%3E%3Cpath d='M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z' stroke='%23b5b0a7' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") 12px center no-repeat; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: #1a2e23; outline: none; transition: border-color 0.15s; }
  .search-input:focus { border-color: #a8d5a2; }
  .search-input::placeholder { color: #b5b0a7; }
  .filter-select { padding: 10px 14px; border: 1.5px solid #e4dfd5; border-radius: 10px; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1a2e23; outline: none; appearance: none; cursor: pointer; min-width: 140px; }

  /* Portal link */
  .portal-link { font-size: 12px; color: #1a2e23; text-decoration: none; padding: 5px 12px; border: 1px solid #e8e4dc; border-radius: 8px; transition: all 0.15s; white-space: nowrap; }
  .portal-link:hover { background: #f0ece4; border-color: #d8d3ca; }

  /* Delete btn */
  .delete-btn { background: none; border: none; font-size: 14px; cursor: pointer; padding: 4px 8px; border-radius: 6px; transition: all 0.15s; opacity: 0.4; }
  .delete-btn:hover { opacity: 1; background: #FEE2E2; }

  /* Modal */
  .modal-overlay { position: fixed; inset: 0; background: rgba(26,46,35,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 1rem; }
  .modal { background: #f5f2ec; border-radius: 20px; padding: 2rem; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 48px rgba(0,0,0,0.15); }
  .modal-title { font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 400; color: #1a2e23; margin-bottom: 0.4rem; }
  .modal-sub { font-size: 13px; color: #8a8378; margin-bottom: 1.5rem; }
  .form-field { margin-bottom: 12px; }
  .form-field label { display: block; font-size: 11px; font-weight: 500; color: #5a5650; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 5px; }
  .form-field input, .form-field select { width: 100%; padding: 10px 12px; border: 1.5px solid #e4dfd5; border-radius: 10px; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1a2e23; outline: none; appearance: none; transition: border-color 0.15s; }
  .form-field input:focus, .form-field select:focus { border-color: #a8d5a2; }
  .form-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .modal-actions { display: flex; gap: 10px; margin-top: 6px; }
  .modal-actions .btn-outline { flex: 1; }
  .modal-actions .btn-primary { flex: 1; }

  /* Plan output */
  .plan-output { background: #fff; border: 1px solid #eae6de; border-radius: 12px; padding: 1.25rem; font-size: 13px; color: #3a3732; line-height: 1.8; white-space: pre-wrap; margin-bottom: 1rem; max-height: 320px; overflow-y: auto; }

  /* Feedback boxes */
  .error-box { background: #FEF2F2; border: 1px solid #FECACA; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #B91C1C; margin-bottom: 12px; }
  .success-box { background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #166534; margin-bottom: 12px; }

  /* Empty / placeholder */
  .empty-state { padding: 3rem; text-align: center; color: #8a8378; font-size: 14px; }
  .loading-row { padding: 2rem; text-align: center; color: #8a8378; font-size: 13px; }

  /* Coming soon */
  .coming-soon { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 2rem; text-align: center; }
  .coming-icon { width: 64px; height: 64px; border-radius: 20px; background: linear-gradient(135deg, #EAF3DE, #E3EEF9); display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 1.25rem; }
  .coming-title { font-family: 'Fraunces', serif; font-size: 1.25rem; font-weight: 400; color: #1a2e23; margin-bottom: 0.5rem; }
  .coming-sub { font-size: 13.5px; color: #8a8378; max-width: 320px; line-height: 1.6; }

  /* BMI mini */
  .bmi-val { font-size: 12px; font-weight: 500; }

  /* Responsive */
  @media (max-width: 1100px) {
    .content-grid { grid-template-columns: 1fr; }
    .metrics { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .layout { grid-template-columns: 1fr; }
    .sidebar { display: none; }
    .main { margin-left: 0; padding: 1.5rem; }
    .metrics { grid-template-columns: 1fr 1fr; }
  }
`;

// ─── Helpers ────────────────────────────────────────────
const bmiHesapla = (kilo, boy) => {
  if (!kilo || !boy) return null;
  const boyM = boy / 100;
  return (kilo / (boyM * boyM)).toFixed(1);
};

const bmiKategori = (bmi) => {
  if (!bmi) return { label: "-", cls: "" };
  const v = parseFloat(bmi);
  if (v < 18.5) return { label: "Zayıf", cls: "bmi-under" };
  if (v < 25) return { label: "Normal", cls: "bmi-normal" };
  if (v < 30) return { label: "Kilolu", cls: "bmi-over" };
  return { label: "Obez", cls: "bmi-obez" };
};

const initials = (ad, soyad) => ((ad?.[0] || "") + (soyad?.[0] || "")).toUpperCase();

const hedefRenk = { "Kilo verme": "green", "Kas yapma": "blue", "Sağlıklı beslenme": "orange", "Form koruma": "purple" };

// ─── Component ──────────────────────────────────────────
export default function Dashboard({ user: propUser }) {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("ozet");
  const [musteriler, setMusteriler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [user, setUser] = useState(propUser || null);
  const [showYeniMusteri, setShowYeniMusteri] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [uretilmisPlan, setUretilmisPlan] = useState("");
  const [hata, setHata] = useState("");
  const [basari, setBasari] = useState("");
  const [arama, setArama] = useState("");
  const [hedefFiltre, setHedefFiltre] = useState("Tümü");
  const [planSayisi, setPlanSayisi] = useState(0);
  const [yeniForm, setYeniForm] = useState({ ad: "", soyad: "", email: "", telefon: "", yas: "", cinsiyet: "Kadın", kilo: "", boy: "", hedef: "Kilo verme" });

  useEffect(() => {
    const init = async () => {
      // propUser varsa onu kullan, yoksa Supabase'den al
      let currentUser = propUser;
      if (!currentUser) {
        const { data: { user: sbUser } } = await supabase.auth.getUser();
        currentUser = sbUser;
      }
      setUser(currentUser);
      if (currentUser) {
        const { data } = await getMusteriler(currentUser.id);
        setMusteriler(data || []);
        // Plan sayısını hesapla
        const { data: plans } = await supabase
          .from('planlar')
          .select('id', { count: 'exact' })
          .eq('koc_id', currentUser.id);
        setPlanSayisi(plans?.length || 0);
      }
      setYukleniyor(false);
    };
    init();
  }, [propUser]);

  const musteriyiYenile = async () => {
    if (!user) return;
    const { data } = await getMusteriler(user.id);
    setMusteriler(data || []);
  };

  const handleYeniMusteri = async () => {
    if (!yeniForm.ad || !yeniForm.soyad) { setHata("Ad ve soyad zorunlu!"); return; }
    setHata("");
    const { error } = await musteri_ekle({
      ...yeniForm,
      koc_id: user?.id,
      aktif: true,
      yas: yeniForm.yas ? parseInt(yeniForm.yas) : null,
      kilo: yeniForm.kilo ? parseFloat(yeniForm.kilo) : null,
      boy: yeniForm.boy ? parseFloat(yeniForm.boy) : null,
    });
    if (error) { setHata("Hata: " + error.message); return; }
    setBasari("Müşteri eklendi!");
    setTimeout(() => {
      setBasari("");
      setShowYeniMusteri(false);
      setYeniForm({ ad: "", soyad: "", email: "", telefon: "", yas: "", cinsiyet: "Kadın", kilo: "", boy: "", hedef: "Kilo verme" });
    }, 1200);
    musteriyiYenile();
  };

  const musteriSil = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Bu müşteriyi silmek istediğinize emin misiniz?")) return;
    await supabase.from('musteriler').delete().eq('id', id);
    musteriyiYenile();
  };

  // ─── Hesaplamalar ──────────────────────────────
  const aktifSayisi = musteriler.filter(m => m.aktif).length;
  const buAyEklenen = musteriler.filter(m => {
    const d = new Date(m.created_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const bmiListesi = musteriler.map(m => bmiHesapla(m.kilo, m.boy)).filter(Boolean).map(Number);
  const ortBmi = bmiListesi.length > 0 ? (bmiListesi.reduce((a, b) => a + b, 0) / bmiListesi.length).toFixed(1) : "-";

  const hedefDagilimi = musteriler.reduce((acc, m) => {
    const h = m.hedef || "Diğer";
    acc[h] = (acc[h] || 0) + 1;
    return acc;
  }, {});
  const maxHedef = Math.max(...Object.values(hedefDagilimi), 1);

  // Filtrelenmiş müşteriler
  const filtrelenmis = musteriler.filter(m => {
    const aramaSonuc = arama === "" || `${m.ad} ${m.soyad} ${m.email}`.toLowerCase().includes(arama.toLowerCase());
    const hedefSonuc = hedefFiltre === "Tümü" || m.hedef === hedefFiltre;
    return aramaSonuc && hedefSonuc;
  });

  // ─── Navigation ────────────────────────────────
  const navGenel = [
    { id: "ozet", icon: "◫", label: "Genel Bakış" },
    { id: "musteriler", icon: "◎", label: "Müşteriler", badge: aktifSayisi },
    { id: "planlar", icon: "✦", label: "Plan Üretici" },
  ];
  const navTakip = [
    { id: "ilerleme", icon: "◉", label: "İlerleme" },
    { id: "raporlar", icon: "▤", label: "Raporlar" },
    { id: "odemeler", icon: "◈", label: "Ödemeler" },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="layout">

        {/* ═══════════════ SIDEBAR ═══════════════ */}
        <div className="sidebar">
          <div className="logo">
            <div className="logo-mark">D</div>
            <span className="logo-text">DiyetKoç</span>
          </div>

          <div className="nav">
            <div className="nav-section">Yönetim</div>
            {navGenel.map(n => (
              <div key={n.id} className={`nav-item ${activeNav === n.id ? "active" : ""}`}
                onClick={() => { if (n.id === "planlar") navigate("/plan-uret"); else setActiveNav(n.id); }}>
                <span className="icon">{n.icon}</span>{n.label}
                {n.badge > 0 && <span className="nav-badge">{n.badge}</span>}
              </div>
            ))}
            <div className="nav-section">Takip</div>
            {navTakip.map(n => (
              <div key={n.id} className={`nav-item ${activeNav === n.id ? "active" : ""}`}
                onClick={() => setActiveNav(n.id)}>
                <span className="icon">{n.icon}</span>{n.label}
              </div>
            ))}
          </div>

          <div className="sidebar-user">
            <div className="avatar">{user?.user_metadata?.ad?.[0] || "D"}</div>
            <div className="user-info">
              <div className="name">{user?.user_metadata?.ad || user?.email?.split("@")[0] || "Kullanıcı"}</div>
              <div className="role">Diyetisyen</div>
              <div style={{ cursor: 'pointer', fontSize: 11, color: 'rgba(245,242,236,0.35)', marginTop: 4, transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = 'rgba(245,242,236,0.7)'}
                onMouseLeave={e => e.target.style.color = 'rgba(245,242,236,0.35)'}
                onClick={async () => { await signOut(); window.location.href = '/giris'; }}>
                Çıkış Yap
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ MAIN ═══════════════ */}
        <div className="main">
          <div className="topbar">
            <div className="topbar-left">
              <h1>{activeNav === "ozet" ? "Genel Bakış" : activeNav === "musteriler" ? "Müşteriler" : activeNav === "ilerleme" ? "İlerleme" : activeNav === "raporlar" ? "Raporlar" : activeNav === "odemeler" ? "Ödemeler" : "Dashboard"}</h1>
              <p>{new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="topbar-right">
              {activeNav === "musteriler" && (
                <button className="btn-primary" onClick={() => setShowYeniMusteri(true)}>+ Yeni Müşteri</button>
              )}
              <button className="btn-green" onClick={() => navigate("/plan-uret")}>✦ Plan Üret</button>
            </div>
          </div>

          {/* ─── METRİKLER ─── */}
          {(activeNav === "ozet" || activeNav === "musteriler") && (
            <div className="metrics">
              <div className="metric-card">
                <div className="metric-top">
                  <span className="metric-label">Aktif Müşteri</span>
                  <div className="metric-icon green">◎</div>
                </div>
                <div className="metric-val">{aktifSayisi}</div>
                <div className="metric-sub"><span className="up">{musteriler.length > 0 ? Math.round(aktifSayisi / musteriler.length * 100) : 0}%</span> toplam içindeki oran</div>
              </div>
              <div className="metric-card">
                <div className="metric-top">
                  <span className="metric-label">Ortalama BMI</span>
                  <div className="metric-icon blue">♥</div>
                </div>
                <div className="metric-val">{ortBmi}</div>
                <div className="metric-sub"><span className="neutral">{bmiListesi.length} müşteri verisi</span></div>
              </div>
              <div className="metric-card">
                <div className="metric-top">
                  <span className="metric-label">Bu Ay Eklenen</span>
                  <div className="metric-icon orange">↗</div>
                </div>
                <div className="metric-val">{buAyEklenen}</div>
                <div className="metric-sub"><span className="neutral">yeni kayıt</span></div>
              </div>
              <div className="metric-card">
                <div className="metric-top">
                  <span className="metric-label">Toplam Plan</span>
                  <div className="metric-icon purple">✦</div>
                </div>
                <div className="metric-val">{planSayisi}</div>
                <div className="metric-sub"><span className="neutral">üretilmiş plan</span></div>
              </div>
            </div>
          )}

          {/* ═══════════════ ÖZET TAB ═══════════════ */}
          {activeNav === "ozet" && (
            <div className="content-grid">
              <div className="card">
                <div className="card-header">
                  <div>
                    <div className="card-title">Son Müşteriler</div>
                    <div className="card-sub">En son eklenen {Math.min(musteriler.length, 6)} müşteri</div>
                  </div>
                  <button className="btn-outline" onClick={() => setActiveNav("musteriler")} style={{ fontSize: 12, padding: '6px 14px' }}>Tümünü Gör</button>
                </div>
                {yukleniyor ? <div className="loading-row">Yükleniyor...</div>
                  : musteriler.length === 0 ? <div className="empty-state">Henüz müşteri yok. Hemen ekleyin!</div>
                    : (
                      <table>
                        <thead><tr><th>Müşteri</th><th>Hedef</th><th>BMI</th><th>Durum</th></tr></thead>
                        <tbody>
                          {musteriler.slice(0, 6).map(c => {
                            const bmi = bmiHesapla(c.kilo, c.boy);
                            const kat = bmiKategori(bmi);
                            return (
                              <tr key={c.id} onClick={() => setSelectedClient(c)}>
                                <td>
                                  <div className="client-name">
                                    <div className="client-avatar">{initials(c.ad, c.soyad)}</div>
                                    <div>
                                      <div className="client-fullname">{c.ad} {c.soyad}</div>
                                      <div className="client-email">{c.email || "-"}</div>
                                    </div>
                                  </div>
                                </td>
                                <td>{c.hedef || "-"}</td>
                                <td>{bmi ? <span className={`badge ${kat.cls}`}>{bmi} · {kat.label}</span> : "-"}</td>
                                <td><span className={`badge ${c.aktif ? "active" : "waiting"}`}>{c.aktif ? "Aktif" : "Pasif"}</span></td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
              </div>

              <div className="right-col">
                {/* Hedef Dağılımı */}
                <div className="dist-card">
                  <div className="dist-title">Hedef Dağılımı</div>
                  {Object.entries(hedefDagilimi).length === 0 ? (
                    <div style={{ fontSize: 13, color: '#8a8378' }}>Henüz veri yok</div>
                  ) : (
                    Object.entries(hedefDagilimi).sort((a, b) => b[1] - a[1]).map(([hedef, sayi]) => (
                      <div className="dist-row" key={hedef}>
                        <span className="dist-label">{hedef}</span>
                        <div className="dist-bar-bg">
                          <div className={`dist-bar ${hedefRenk[hedef] || "green"}`} style={{ width: `${(sayi / maxHedef) * 100}%` }} />
                        </div>
                        <span className="dist-count">{sayi}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Hızlı İşlemler */}
                <div className="quick-card">
                  <div className="quick-title">Hızlı İşlemler</div>
                  <div className="quick-sub">Sık kullandığın araçlara hızlı erişim</div>
                  <button className="quick-btn" onClick={() => setShowYeniMusteri(true)}>
                    <span className="qicon">+</span> Yeni Müşteri Ekle
                  </button>
                  <button className="quick-btn" onClick={() => navigate("/plan-uret")}>
                    <span className="qicon">✦</span> Beslenme Planı Üret
                  </button>
                  <button className="quick-btn" onClick={() => setActiveNav("musteriler")}>
                    <span className="qicon">◎</span> Müşteri Listesi
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════ MÜŞTERİLER TAB ═══════════════ */}
          {activeNav === "musteriler" && (
            <>
              <div className="search-bar">
                <input
                  className="search-input"
                  placeholder="Müşteri ara (ad, soyad, email)..."
                  value={arama}
                  onChange={e => setArama(e.target.value)}
                />
                <select className="filter-select" value={hedefFiltre} onChange={e => setHedefFiltre(e.target.value)}>
                  <option>Tümü</option>
                  <option>Kilo verme</option>
                  <option>Kas yapma</option>
                  <option>Sağlıklı beslenme</option>
                  <option>Form koruma</option>
                </select>
              </div>
              <div className="card">
                <div className="card-header">
                  <div>
                    <div className="card-title">Tüm Müşteriler</div>
                    <div className="card-sub">{filtrelenmis.length} / {musteriler.length} kayıt gösteriliyor</div>
                  </div>
                </div>
                {yukleniyor ? (
                  <div className="loading-row">Yükleniyor...</div>
                ) : filtrelenmis.length === 0 ? (
                  <div className="empty-state">{musteriler.length === 0 ? 'Henüz müşteri yok. "+ Yeni Müşteri" ile başla!' : "Aramanızla eşleşen müşteri bulunamadı."}</div>
                ) : (
                  <table>
                    <thead>
                      <tr><th>Müşteri</th><th>Hedef</th><th>BMI</th><th>Kilo</th><th>Durum</th><th>Portal</th><th></th></tr>
                    </thead>
                    <tbody>
                      {filtrelenmis.map(c => {
                        const bmi = bmiHesapla(c.kilo, c.boy);
                        const kat = bmiKategori(bmi);
                        return (
                          <tr key={c.id} onClick={() => setSelectedClient(c)}>
                            <td>
                              <div className="client-name">
                                <div className="client-avatar">{initials(c.ad, c.soyad)}</div>
                                <div>
                                  <div className="client-fullname">{c.ad} {c.soyad}</div>
                                  <div className="client-email">{c.email || "-"}</div>
                                </div>
                              </div>
                            </td>
                            <td>{c.hedef || "-"}</td>
                            <td>{bmi ? <span className={`badge ${kat.cls}`}>{bmi}</span> : "-"}</td>
                            <td>{c.kilo ? `${c.kilo} kg` : "-"}</td>
                            <td><span className={`badge ${c.aktif ? "active" : "waiting"}`}>{c.aktif ? "Aktif" : "Pasif"}</span></td>
                            <td onClick={e => e.stopPropagation()}>
                              <a className="portal-link" href={`/portal?email=${c.email}`} target="_blank" rel="noreferrer">Portal</a>
                            </td>
                            <td onClick={e => e.stopPropagation()}>
                              <button className="delete-btn" onClick={e => musteriSil(c.id, e)} title="Sil">🗑</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {/* ═══════════════ İLERLEME ═══════════════ */}
          {activeNav === "ilerleme" && (
            <div className="card">
              <div className="coming-soon">
                <div className="coming-icon">📊</div>
                <div className="coming-title">İlerleme Takibi</div>
                <div className="coming-sub">Müşterilerinizin kilo, ölçüm ve hedef ilerlemelerini grafik olarak takip edebileceğiniz alan çok yakında aktif olacak.</div>
              </div>
            </div>
          )}

          {/* ═══════════════ RAPORLAR ═══════════════ */}
          {activeNav === "raporlar" && (
            <div className="card">
              <div className="coming-soon">
                <div className="coming-icon">📋</div>
                <div className="coming-title">Raporlar</div>
                <div className="coming-sub">Aylık performans raporları, müşteri bazlı analizler ve beslenme planı istatistikleri burada yer alacak.</div>
              </div>
            </div>
          )}

          {/* ═══════════════ ÖDEMELER ═══════════════ */}
          {activeNav === "odemeler" && (
            <div className="card">
              <div className="coming-soon">
                <div className="coming-icon">💳</div>
                <div className="coming-title">Ödemeler</div>
                <div className="coming-sub">Müşteri ödemelerini takip edin, fatura oluşturun ve gelir raporlarınızı görüntüleyin. Bu alan çok yakında hizmetinizde.</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════ YENİ MÜŞTERİ MODAL ═══════════════ */}
      {showYeniMusteri && (
        <div className="modal-overlay" onClick={() => setShowYeniMusteri(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Yeni Müşteri Ekle</div>
            <div className="modal-sub">Müşteri bilgilerini doldurun</div>
            {hata && <div className="error-box">{hata}</div>}
            {basari && <div className="success-box">{basari}</div>}
            <div className="form-row2">
              <div className="form-field"><label>Ad</label><input placeholder="Ayşe" value={yeniForm.ad} onChange={e => setYeniForm({ ...yeniForm, ad: e.target.value })} /></div>
              <div className="form-field"><label>Soyad</label><input placeholder="Kaya" value={yeniForm.soyad} onChange={e => setYeniForm({ ...yeniForm, soyad: e.target.value })} /></div>
            </div>
            <div className="form-field"><label>E-posta</label><input placeholder="ayse@gmail.com" value={yeniForm.email} onChange={e => setYeniForm({ ...yeniForm, email: e.target.value })} /></div>
            <div className="form-field"><label>Telefon</label><input placeholder="0555 123 45 67" value={yeniForm.telefon} onChange={e => setYeniForm({ ...yeniForm, telefon: e.target.value })} /></div>
            <div className="form-row2">
              <div className="form-field"><label>Yaş</label><input type="number" placeholder="32" value={yeniForm.yas} onChange={e => setYeniForm({ ...yeniForm, yas: e.target.value })} /></div>
              <div className="form-field"><label>Cinsiyet</label>
                <select value={yeniForm.cinsiyet} onChange={e => setYeniForm({ ...yeniForm, cinsiyet: e.target.value })}>
                  <option>Kadın</option><option>Erkek</option>
                </select>
              </div>
            </div>
            <div className="form-row2">
              <div className="form-field"><label>Kilo (kg)</label><input type="number" placeholder="68" value={yeniForm.kilo} onChange={e => setYeniForm({ ...yeniForm, kilo: e.target.value })} /></div>
              <div className="form-field"><label>Boy (cm)</label><input type="number" placeholder="165" value={yeniForm.boy} onChange={e => setYeniForm({ ...yeniForm, boy: e.target.value })} /></div>
            </div>
            <div className="form-field"><label>Hedef</label>
              <select value={yeniForm.hedef} onChange={e => setYeniForm({ ...yeniForm, hedef: e.target.value })}>
                <option>Kilo verme</option><option>Kas yapma</option><option>Sağlıklı beslenme</option><option>Form koruma</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setShowYeniMusteri(false)}>İptal</button>
              <button className="btn-primary" onClick={handleYeniMusteri}>Müşteri Ekle</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ PLAN MODAL ═══════════════ */}
      {showPlanModal && (
        <div className="modal-overlay" onClick={() => setShowPlanModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Plan Hazır ✦</div>
            <div className="modal-sub">Plan başarıyla oluşturuldu ve kaydedildi</div>
            <div className="plan-output">{uretilmisPlan}</div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setShowPlanModal(false)}>Kapat</button>
              <button className="btn-primary" onClick={() => { navigator.clipboard.writeText(uretilmisPlan); setShowPlanModal(false); }}>Kopyala</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ MÜŞTERİ DETAY MODAL ═══════════════ */}
      {selectedClient && (
        <div className="modal-overlay" onClick={() => setSelectedClient(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "1.5rem" }}>
              <div className="client-avatar" style={{ width: 52, height: 52, fontSize: 18 }}>{initials(selectedClient.ad, selectedClient.soyad)}</div>
              <div>
                <div className="modal-title" style={{ marginBottom: 2 }}>{selectedClient.ad} {selectedClient.soyad}</div>
                <div style={{ fontSize: 13, color: "#8a8378" }}>{selectedClient.email || "E-posta girilmemiş"}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: "1.5rem" }}>
              {(() => {
                const bmi = bmiHesapla(selectedClient.kilo, selectedClient.boy);
                const kat = bmiKategori(bmi);
                return [
                  { label: "Hedef", val: selectedClient.hedef || "-" },
                  { label: "Kilo", val: selectedClient.kilo ? `${selectedClient.kilo} kg` : "-" },
                  { label: "Boy", val: selectedClient.boy ? `${selectedClient.boy} cm` : "-" },
                  { label: "Yaş", val: selectedClient.yas || "-" },
                  { label: "Cinsiyet", val: selectedClient.cinsiyet || "-" },
                  { label: "BMI", val: bmi ? `${bmi} (${kat.label})` : "-" },
                ].map((row, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "12px 14px", border: "1px solid #eae6de" }}>
                    <div style={{ fontSize: 11, color: "#8a8378", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>{row.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "#1a2e23" }}>{row.val}</div>
                  </div>
                ));
              })()}
            </div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setSelectedClient(null)}>Kapat</button>
              <button className="btn-primary" onClick={() => { navigate("/plan-uret"); setSelectedClient(null); }}>✦ Plan Üret</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
