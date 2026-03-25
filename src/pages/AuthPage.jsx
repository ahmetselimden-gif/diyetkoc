/* eslint-disable */
import { useState } from "react";
import { signIn, signUp } from "../lib/supabase";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { min-height: 100vh; font-family: 'DM Sans', sans-serif; background: #f5f2ec; }
  .container { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
  .left { background: #1c3829; padding: 3rem; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; }
  .logo { display: flex; align-items: center; gap: 10px; }
  .logo-mark { width: 36px; height: 36px; border-radius: 10px; background: #a8d5a2; display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 18px; color: #1c3829; }
  .logo-text { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 400; color: #f5f2ec; }
  .hero-text { position: relative; z-index: 1; }
  .hero-tag { display: inline-block; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #a8d5a2; border: 1px solid rgba(168,213,162,0.3); padding: 5px 12px; border-radius: 100px; margin-bottom: 1.5rem; }
  .hero-title { font-family: 'Fraunces', serif; font-size: 2.8rem; font-weight: 300; color: #f5f2ec; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 1.25rem; }
  .hero-title em { font-style: italic; color: #a8d5a2; }
  .hero-sub { font-size: 15px; color: rgba(245,242,236,0.55); line-height: 1.7; max-width: 340px; }
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; }
  .stat { padding: 1.25rem 1rem; background: rgba(255,255,255,0.04); text-align: center; }
  .stat-val { font-family: 'Fraunces', serif; font-size: 1.6rem; font-weight: 400; color: #a8d5a2; }
  .stat-lbl { font-size: 11px; color: rgba(245,242,236,0.45); margin-top: 3px; }
  .right { background: #f5f2ec; display: flex; align-items: center; justify-content: center; padding: 3rem 2rem; }
  .form-box { width: 100%; max-width: 400px; }
  .tabs { display: flex; background: #e8e4dc; border-radius: 12px; padding: 4px; margin-bottom: 2rem; }
  .tab { flex: 1; padding: 10px; border: none; border-radius: 9px; background: transparent; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #8a8378; cursor: pointer; transition: all 0.2s; }
  .tab.active { background: #1c3829; color: #f5f2ec; font-weight: 500; }
  .form-title { font-family: 'Fraunces', serif; font-size: 1.75rem; font-weight: 300; color: #1c3829; letter-spacing: -0.03em; margin-bottom: 0.4rem; }
  .form-sub { font-size: 14px; color: #8a8378; margin-bottom: 2rem; }
  .field { margin-bottom: 1rem; }
  .field label { display: block; font-size: 12px; font-weight: 500; color: #5a5650; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 6px; }
  .field input, .field select { width: 100%; padding: 13px 16px; border: 1.5px solid #ddd9d0; border-radius: 10px; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 15px; color: #1c3829; outline: none; transition: border-color 0.2s; appearance: none; }
  .field input:focus { border-color: #1c3829; }
  .field input::placeholder { color: #c4bfb6; }
  .row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .btn-primary { width: 100%; padding: 15px; background: #1c3829; color: #f5f2ec; border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; margin-top: 1.25rem; transition: all 0.2s; }
  .btn-primary:hover:not(:disabled) { background: #264d38; }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
  .trust-row { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 1.25rem; }
  .trust-dot { width: 6px; height: 6px; border-radius: 50%; background: #a8d5a2; }
  .trust-text { font-size: 12px; color: #b5b0a7; }
  .error-box { background: #fff5f5; border: 1px solid #fecdcd; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #c53030; margin-bottom: 12px; }
  .success-box { background: #f0f9f0; border: 1px solid #a8d5a2; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #3B6D11; margin-bottom: 12px; }
  @media (max-width: 768px) { .container { grid-template-columns: 1fr; } .left { display: none; } }
`;

export default function AuthPage() {
  const [tab, setTab] = useState("giris");
  const [loading, setLoading] = useState(false);
  const [hata, setHata] = useState("");
  const [basari, setBasari] = useState("");

  const [girisForm, setGirisForm] = useState({ email: "", sifre: "" });
  const [kayitForm, setKayitForm] = useState({ ad: "", soyad: "", email: "", sifre: "", uzmanlik: "Diyetisyen" });

  const handleGiris = async () => {
    if (!girisForm.email || !girisForm.sifre) { setHata("Email ve şifre zorunlu!"); return; }
    setLoading(true); setHata("");
    const { error } = await signIn(girisForm.email, girisForm.sifre);
    if (error) { setHata("Hata: " + error.message); setLoading(false); return; }
    window.location.href = "/dashboard";
  };

  const handleKayit = async () => {
    if (!kayitForm.ad || !kayitForm.email || !kayitForm.sifre) { setHata("Tüm alanları doldurun!"); return; }
    if (kayitForm.sifre.length < 8) { setHata("Şifre en az 8 karakter olmalı!"); return; }
    setLoading(true); setHata("");
    const { error } = await signUp(kayitForm.email, kayitForm.sifre, { ad: kayitForm.ad, soyad: kayitForm.soyad, uzmanlik: kayitForm.uzmanlik });
    if (error) { setHata("Hata: " + error.message); setLoading(false); return; }
    setBasari("Hesabın oluşturuldu! Email onayı gerekebilir.");
    setLoading(false);
    setTimeout(() => { window.location.href = "/dashboard"; }, 1500);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="left">
          <div className="logo">
            <div className="logo-mark">D</div>
            <span className="logo-text">DiyetPro</span>
          </div>
          <div className="hero-text">
            <div className="hero-tag">Türkiye'nin #1 Diyetisyen Platformu</div>
            <h1 className="hero-title">Müşteri planlarını <em>saniyeler</em> içinde hazırla</h1>
            <p className="hero-sub">AI destekli diyet planı oluşturma, müşteri takibi ve otomatik hatırlatmalar.</p>
          </div>
          <div className="stats">
            <div className="stat"><div className="stat-val">4 saat</div><div className="stat-lbl">haftalık kazanç</div></div>
            <div className="stat"><div className="stat-val">80K+</div><div className="stat-lbl">potansiyel kullanıcı</div></div>
            <div className="stat"><div className="stat-val">%0</div><div className="stat-lbl">Türkçe rakip</div></div>
          </div>
        </div>

        <div className="right">
          <div className="form-box">
            <div className="tabs">
              <button className={`tab ${tab==="giris"?"active":""}`} onClick={()=>{setTab("giris");setHata("");}}>Giriş Yap</button>
              <button className={`tab ${tab==="kayit"?"active":""}`} onClick={()=>{setTab("kayit");setHata("");}}>Ücretsiz Başla</button>
            </div>

            {hata && <div className="error-box">{hata}</div>}
            {basari && <div className="success-box">{basari}</div>}

            {tab === "giris" ? (
              <>
                <h2 className="form-title">Tekrar hoş geldin</h2>
                <p className="form-sub">Hesabına giriş yap</p>
                <div className="field"><label>E-posta</label><input type="email" placeholder="ad@klinik.com" value={girisForm.email} onChange={e=>setGirisForm({...girisForm,email:e.target.value})} /></div>
                <div className="field"><label>Şifre</label><input type="password" placeholder="••••••••" value={girisForm.sifre} onChange={e=>setGirisForm({...girisForm,sifre:e.target.value})} onKeyDown={e=>e.key==="Enter"&&handleGiris()} /></div>
                <button className="btn-primary" onClick={handleGiris} disabled={loading}>{loading?"Giriş yapılıyor...":"Giriş Yap →"}</button>
                <div className="trust-row"><div className="trust-dot"></div><span className="trust-text">SSL şifreli güvenli bağlantı</span></div>
              </>
            ) : (
              <>
                <h2 className="form-title">14 gün ücretsiz</h2>
                <p className="form-sub">Kredi kartı gerekmez</p>
                <div className="row-2">
                  <div className="field"><label>Ad</label><input type="text" placeholder="Ayşe" value={kayitForm.ad} onChange={e=>setKayitForm({...kayitForm,ad:e.target.value})} /></div>
                  <div className="field"><label>Soyad</label><input type="text" placeholder="Yılmaz" value={kayitForm.soyad} onChange={e=>setKayitForm({...kayitForm,soyad:e.target.value})} /></div>
                </div>
                <div className="field"><label>E-posta</label><input type="email" placeholder="ad@klinik.com" value={kayitForm.email} onChange={e=>setKayitForm({...kayitForm,email:e.target.value})} /></div>
                <div className="field"><label>Uzmanlık</label>
                  <select value={kayitForm.uzmanlik} onChange={e=>setKayitForm({...kayitForm,uzmanlik:e.target.value})}>
                    <option>Diyetisyen</option><option>Fitness Koçu</option><option>Beslenme Uzmanı</option>
                  </select>
                </div>
                <div className="field"><label>Şifre</label><input type="password" placeholder="En az 8 karakter" value={kayitForm.sifre} onChange={e=>setKayitForm({...kayitForm,sifre:e.target.value})} /></div>
                <button className="btn-primary" onClick={handleKayit} disabled={loading}>{loading?"Hesap oluşturuluyor...":"Ücretsiz Başla →"}</button>
                <div className="trust-row"><div className="trust-dot"></div><span className="trust-text">14 gün ücretsiz · İstediğin zaman iptal</span></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}