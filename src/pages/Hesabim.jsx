/* eslint-disable */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, signOut } from "../lib/supabase";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { min-height: 100vh; font-family: 'DM Sans', sans-serif; background: #f5f2ec; }

  .hesabim-layout { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; }

  /* Sidebar */
  .hesabim-sidebar { background: #1a2e23; padding: 1.5rem 1rem; display: flex; flex-direction: column; gap: 1.5rem; position: fixed; top: 0; left: 0; bottom: 0; width: 240px; overflow-y: auto; }
  .hesabim-logo { display: flex; align-items: center; gap: 10px; padding: 0.25rem 0.5rem; cursor: pointer; }
  .hesabim-logo-mark { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, #a8d5a2, #7ec477); display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 17px; font-weight: 600; color: #1a2e23; }
  .hesabim-logo-text { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 400; color: #f5f2ec; letter-spacing: -0.01em; }
  .hesabim-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }
  .hesabim-nav-section { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,242,236,0.28); padding: 1rem 0.75rem 0.5rem; font-weight: 500; }
  .hesabim-nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; font-size: 13.5px; color: rgba(245,242,236,0.55); cursor: pointer; transition: all 0.2s; border: 1px solid transparent; }
  .hesabim-nav-item:hover { background: rgba(255,255,255,0.06); color: rgba(245,242,236,0.85); }
  .hesabim-nav-item.active { background: rgba(168,213,162,0.12); color: #a8d5a2; border-color: rgba(168,213,162,0.15); }
  .hesabim-nav-item .icon { font-size: 16px; width: 22px; text-align: center; }

  /* Main */
  .hesabim-main { margin-left: 240px; padding: 2rem 2.5rem; max-width: 800px; }
  .hesabim-topbar { margin-bottom: 2rem; }
  .hesabim-topbar h1 { font-family: 'Fraunces', serif; font-size: 1.6rem; font-weight: 400; color: #1a2e23; letter-spacing: -0.02em; }
  .hesabim-topbar p { font-size: 13px; color: #8a8378; margin-top: 4px; }

  /* Cards */
  .hesabim-card { background: #fff; border: 1px solid #eae6de; border-radius: 16px; padding: 1.5rem 1.75rem; margin-bottom: 1.25rem; }
  .hesabim-card-title { font-family: 'Fraunces', serif; font-size: 1.1rem; font-weight: 400; color: #1a2e23; margin-bottom: 0.25rem; display: flex; align-items: center; gap: 10px; }
  .hesabim-card-sub { font-size: 13px; color: #8a8378; margin-bottom: 1.25rem; }
  .hesabim-card-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 17px; flex-shrink: 0; }
  .hesabim-card-icon.green { background: #EAF3DE; }
  .hesabim-card-icon.blue { background: #E3EEF9; }
  .hesabim-card-icon.red { background: #FEF2F2; }

  /* Info rows */
  .hesabim-info-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f5f2ec; }
  .hesabim-info-row:last-child { border-bottom: none; }
  .hesabim-info-label { font-size: 13px; color: #8a8378; min-width: 120px; }
  .hesabim-info-value { font-size: 14px; color: #1a2e23; font-weight: 500; }

  /* Form */
  .hesabim-field { margin-bottom: 1rem; }
  .hesabim-field label { display: block; font-size: 12px; font-weight: 500; color: #5a5650; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 6px; }
  .hesabim-field input { width: 100%; padding: 12px 14px; border: 1.5px solid #e4dfd5; border-radius: 10px; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1a2e23; outline: none; transition: border-color 0.15s; }
  .hesabim-field input:focus { border-color: #a8d5a2; }
  .hesabim-field input:disabled { background: #f5f2ec; color: #8a8378; cursor: not-allowed; }

  /* Buttons */
  .hesabim-btn { padding: 11px 22px; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; cursor: pointer; font-weight: 500; transition: all 0.15s; }
  .hesabim-btn-primary { background: #1a2e23; color: #f5f2ec; }
  .hesabim-btn-primary:hover { background: #243d2f; }
  .hesabim-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
  .hesabim-btn-danger { background: #DC2626; color: #fff; }
  .hesabim-btn-danger:hover { background: #B91C1C; }
  .hesabim-btn-outline { background: #fff; color: #1a2e23; border: 1.5px solid #ddd9d0; }
  .hesabim-btn-outline:hover { border-color: #c5c0b7; background: #faf9f6; }
  .hesabim-btn-row { display: flex; gap: 10px; margin-top: 0.5rem; }

  /* Messages */
  .hesabim-success { background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #166534; margin-bottom: 12px; }
  .hesabim-error { background: #FEF2F2; border: 1px solid #FECACA; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #DC2626; margin-bottom: 12px; }

  /* Avatar */
  .hesabim-avatar-big { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #a8d5a2, #7ec477); display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 28px; font-weight: 600; color: #1a2e23; margin-bottom: 1rem; }

  /* Sidebar user */
  .hesabim-sidebar-user { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem; display: flex; align-items: center; gap: 10px; }
  .hesabim-avatar-sm { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #a8d5a2, #7ec477); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; color: #1a2e23; }
  .hesabim-user-info .name { font-size: 13px; font-weight: 500; color: #f5f2ec; }
  .hesabim-user-info .role { font-size: 11px; color: rgba(245,242,236,0.35); }

  @media (max-width: 768px) {
    .hesabim-layout { grid-template-columns: 1fr; }
    .hesabim-sidebar { display: none; }
    .hesabim-main { margin-left: 0; padding: 1.5rem 1rem; }
  }
`;

export default function Hesabim({ user }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profil");
  const [loading, setLoading] = useState(false);
  const [basari, setBasari] = useState("");
  const [hata, setHata] = useState("");

  // Profile form
  const [ad, setAd] = useState(user?.user_metadata?.ad || "");
  const [soyad, setSoyad] = useState(user?.user_metadata?.soyad || "");
  const [uzmanlik, setUzmanlik] = useState(user?.user_metadata?.uzmanlik || "Diyetisyen");

  // Password form
  const [yeniSifre, setYeniSifre] = useState("");
  const [yeniSifreTekrar, setYeniSifreTekrar] = useState("");

  const clearMessages = () => { setBasari(""); setHata(""); };

  const handleProfilGuncelle = async () => {
    clearMessages();
    if (!ad.trim()) { setHata("Ad alanı boş olamaz!"); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: { ad: ad.trim(), soyad: soyad.trim(), uzmanlik }
    });
    if (error) { setHata("Hata: " + error.message); }
    else { setBasari("Profil bilgileri güncellendi!"); }
    setLoading(false);
    setTimeout(() => setBasari(""), 3000);
  };

  const handleSifreDegistir = async () => {
    clearMessages();
    if (!yeniSifre || !yeniSifreTekrar) { setHata("Tüm alanları doldurun!"); return; }
    if (yeniSifre.length < 8) { setHata("Şifre en az 8 karakter olmalı!"); return; }
    if (yeniSifre !== yeniSifreTekrar) { setHata("Şifreler eşleşmiyor!"); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: yeniSifre });
    if (error) { setHata("Hata: " + error.message); }
    else {
      setBasari("Şifre başarıyla değiştirildi!");
      setYeniSifre("");
      setYeniSifreTekrar("");
    }
    setLoading(false);
    setTimeout(() => setBasari(""), 3000);
  };

  const handleCikis = async () => {
    await signOut();
    window.location.href = "/giris";
  };

  const userInitial = ad?.[0] || user?.email?.[0]?.toUpperCase() || "K";
  const userName = ad || user?.email?.split("@")[0] || "Kullanıcı";

  return (
    <>
      <style>{styles}</style>
      <div className="hesabim-layout">

        {/* SIDEBAR */}
        <div className="hesabim-sidebar">
          <div className="hesabim-logo" onClick={() => navigate("/dashboard")}>
            <div className="hesabim-logo-mark">D</div>
            <span className="hesabim-logo-text">DiyetKoç</span>
          </div>

          <div className="hesabim-nav">
            <div className="hesabim-nav-section">Hesap</div>
            {[
              { id: "profil", icon: "◉", label: "Profil Bilgileri" },
              { id: "sifre", icon: "◈", label: "Şifre Değiştir" },
            ].map(n => (
              <div key={n.id} className={`hesabim-nav-item ${activeTab === n.id ? "active" : ""}`}
                onClick={() => { setActiveTab(n.id); clearMessages(); }}>
                <span className="icon">{n.icon}</span>{n.label}
              </div>
            ))}

            <div className="hesabim-nav-section">Gezinme</div>
            <div className="hesabim-nav-item" onClick={() => navigate("/dashboard")}>
              <span className="icon">◫</span>Dashboard
            </div>
            <div className="hesabim-nav-item" onClick={() => navigate("/plan-uret")}>
              <span className="icon">✦</span>Plan Üretici
            </div>
          </div>

          <div className="hesabim-sidebar-user">
            <div className="hesabim-avatar-sm">{userInitial}</div>
            <div className="hesabim-user-info">
              <div className="name">{userName}</div>
              <div className="role">{uzmanlik}</div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="hesabim-main">
          <div className="hesabim-topbar">
            <h1>Hesabım</h1>
            <p>Hesap bilgilerini görüntüle ve düzenle</p>
          </div>

          {activeTab === "profil" && (
            <>
              {/* Profil Kartı */}
              <div className="hesabim-card">
                <div className="hesabim-card-title">
                  <div className="hesabim-card-icon green">👤</div>
                  Profil Bilgileri
                </div>
                <div className="hesabim-card-sub">Hesabınıza ait temel bilgileri buradan güncelleyebilirsiniz.</div>

                {basari && <div className="hesabim-success">{basari}</div>}
                {hata && <div className="hesabim-error">{hata}</div>}

                <div className="hesabim-avatar-big">{userInitial}</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="hesabim-field">
                    <label>Ad</label>
                    <input type="text" value={ad} onChange={e => setAd(e.target.value)} placeholder="Adınız" />
                  </div>
                  <div className="hesabim-field">
                    <label>Soyad</label>
                    <input type="text" value={soyad} onChange={e => setSoyad(e.target.value)} placeholder="Soyadınız" />
                  </div>
                </div>

                <div className="hesabim-field">
                  <label>E-posta</label>
                  <input type="email" value={user?.email || ""} disabled />
                </div>

                <div className="hesabim-field">
                  <label>Uzmanlık</label>
                  <input type="text" value={uzmanlik} onChange={e => setUzmanlik(e.target.value)} placeholder="Diyetisyen" />
                </div>

                <div className="hesabim-btn-row">
                  <button className="hesabim-btn hesabim-btn-primary" onClick={handleProfilGuncelle} disabled={loading}>
                    {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                  </button>
                </div>
              </div>

              {/* Hesap Bilgileri */}
              <div className="hesabim-card">
                <div className="hesabim-card-title">
                  <div className="hesabim-card-icon blue">📋</div>
                  Hesap Detayları
                </div>
                <div className="hesabim-card-sub">Hesabınıza ait teknik bilgiler</div>

                <div className="hesabim-info-row">
                  <span className="hesabim-info-label">E-posta</span>
                  <span className="hesabim-info-value">{user?.email || "-"}</span>
                </div>
                <div className="hesabim-info-row">
                  <span className="hesabim-info-label">Hesap ID</span>
                  <span className="hesabim-info-value" style={{ fontSize: 12, fontFamily: "monospace" }}>{user?.id?.slice(0, 12) || "-"}...</span>
                </div>
                <div className="hesabim-info-row">
                  <span className="hesabim-info-label">Kayıt Tarihi</span>
                  <span className="hesabim-info-value">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }) : "-"}
                  </span>
                </div>
                <div className="hesabim-info-row">
                  <span className="hesabim-info-label">Son Giriş</span>
                  <span className="hesabim-info-value">
                    {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-"}
                  </span>
                </div>
              </div>

              {/* Çıkış */}
              <div className="hesabim-card">
                <div className="hesabim-card-title">
                  <div className="hesabim-card-icon red">🚪</div>
                  Oturum
                </div>
                <div className="hesabim-card-sub">Hesabınızdan güvenli bir şekilde çıkış yapın.</div>
                <button className="hesabim-btn hesabim-btn-danger" onClick={handleCikis}>
                  Çıkış Yap
                </button>
              </div>
            </>
          )}

          {activeTab === "sifre" && (
            <div className="hesabim-card">
              <div className="hesabim-card-title">
                <div className="hesabim-card-icon blue">🔒</div>
                Şifre Değiştir
              </div>
              <div className="hesabim-card-sub">Hesabınızın güvenliği için güçlü bir şifre belirleyin (en az 8 karakter).</div>

              {basari && <div className="hesabim-success">{basari}</div>}
              {hata && <div className="hesabim-error">{hata}</div>}

              <div className="hesabim-field">
                <label>Yeni Şifre</label>
                <input type="password" value={yeniSifre} onChange={e => setYeniSifre(e.target.value)} placeholder="En az 8 karakter" />
              </div>
              <div className="hesabim-field">
                <label>Yeni Şifre (Tekrar)</label>
                <input type="password" value={yeniSifreTekrar} onChange={e => setYeniSifreTekrar(e.target.value)} placeholder="Şifreyi tekrar girin" />
              </div>
              <div className="hesabim-btn-row">
                <button className="hesabim-btn hesabim-btn-primary" onClick={handleSifreDegistir} disabled={loading}>
                  {loading ? "Değiştiriliyor..." : "Şifreyi Değiştir"}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
