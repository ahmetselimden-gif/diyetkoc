import { useState } from "react";

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
  .field input:focus, .field select:focus { border-color: #1c3829; }
  .field input::placeholder { color: #c4bfb6; }
  .row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .btn-primary { width: 100%; padding: 15px; background: #1c3829; color: #f5f2ec; border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; margin-top: 1.25rem; transition: all 0.2s; }
  .btn-primary:hover { background: #264d38; }
  .trust-row { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 1.25rem; }
  .trust-dot { width: 6px; height: 6px; border-radius: 50%; background: #a8d5a2; }
  .trust-text { font-size: 12px; color: #b5b0a7; }
  .plan-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 1rem; }
  .plan-card { border: 1.5px solid #ddd9d0; border-radius: 10px; padding: 12px; cursor: pointer; transition: all 0.2s; background: #fff; }
  .plan-card.selected { border-color: #1c3829; background: #f0f5f2; }
  .plan-card-name { font-size: 13px; font-weight: 500; color: #1c3829; margin-bottom: 2px; }
  .plan-card-price { font-family: 'Fraunces', serif; font-size: 16px; color: #1c3829; }
  .plan-card-sub { font-size: 11px; color: #8a8378; }
  .success-screen { text-align: center; padding: 2rem 0; }
  .success-icon { width: 64px; height: 64px; background: #1c3829; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 28px; }
  .success-title { font-family: 'Fraunces', serif; font-size: 1.5rem; font-weight: 300; color: #1c3829; margin-bottom: 0.5rem; }
  .success-sub { font-size: 14px; color: #8a8378; line-height: 1.6; margin-bottom: 2rem; }
  @media (max-width: 768px) { .container { grid-template-columns: 1fr; } .left { display: none; } }
`;

export default function AuthPage() {
  const [tab, setTab] = useState("giris");
  const [plan, setPlan] = useState("pro");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1200);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="left">
          <div className="logo">
            <div className="logo-mark">D</div>
            <span className="logo-text">DiyetKoç</span>
          </div>
          <div className="hero-text">
            <div className="hero-tag">Türkiye'nin #1 Diyetisyen Platformu</div>
            <h1 className="hero-title">Müşteri planlarını <em>saniyeler</em> içinde hazırla</h1>
            <p className="hero-sub">AI destekli diyet ve egzersiz planı oluşturma, müşteri takibi ve otomatik hatırlatmalar.</p>
          </div>
          <div className="stats">
            <div className="stat"><div className="stat-val">4 saat</div><div className="stat-lbl">haftalık kazanç</div></div>
            <div className="stat"><div className="stat-val">80K+</div><div className="stat-lbl">potansiyel kullanıcı</div></div>
            <div className="stat"><div className="stat-val">%0</div><div className="stat-lbl">Türkçe rakip</div></div>
          </div>
        </div>
        <div className="right">
          <div className="form-box">
            {success ? (
              <div className="success-screen">
                <div className="success-icon">✓</div>
                <h2 className="success-title">Hoş geldin!</h2>
                <p className="success-sub">Hesabın oluşturuldu. 14 günlük ücretsiz denemen başladı.</p>
                <button className="btn-primary" onClick={() => setSuccess(false)}>Dashboard'a Git →</button>
              </div>
            ) : (
              <>
                <div className="tabs">
                  <button className={`tab ${tab === "giris" ? "active" : ""}`} onClick={() => setTab("giris")}>Giriş Yap</button>
                  <button className={`tab ${tab === "kayit" ? "active" : ""}`} onClick={() => setTab("kayit")}>Ücretsiz Başla</button>
                </div>
                {tab === "giris" ? (
                  <>
                    <h2 className="form-title">Tekrar hoş geldin</h2>
                    <p className="form-sub">Hesabına giriş yap</p>
                    <div className="field"><label>E-posta</label><input type="email" placeholder="ad@klinik.com" /></div>
                    <div className="field"><label>Şifre</label><input type="password" placeholder="••••••••" /></div>
                    <button className="btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? "Giriş yapılıyor..." : "Giriş Yap →"}</button>
                    <div className="trust-row"><div className="trust-dot"></div><span className="trust-text">SSL şifreli güvenli bağlantı</span></div>
                  </>
                ) : (
                  <>
                    <h2 className="form-title">14 gün ücretsiz</h2>
                    <p className="form-sub">Kredi kartı gerekmez</p>
                    <div className="row-2">
                      <div className="field"><label>Ad</label><input type="text" placeholder="Ayşe" /></div>
                      <div className="field"><label>Soyad</label><input type="text" placeholder="Yılmaz" /></div>
                    </div>
                    <div className="field"><label>E-posta</label><input type="email" placeholder="ad@klinik.com" /></div>
                    <div className="field"><label>Uzmanlık</label><select><option>Diyetisyen</option><option>Fitness Koçu</option><option>Beslenme Uzmanı</option></select></div>
                    <div className="field">
                      <label>Plan seç</label>
                      <div className="plan-cards">
                        <div className={`plan-card ${plan === "baslangic" ? "selected" : ""}`} onClick={() => setPlan("baslangic")}>
                          <div className="plan-card-name">Başlangıç</div>
                          <div className="plan-card-price">₺299</div>
                          <div className="plan-card-sub">/ay · 10 müşteri</div>
                        </div>
                        <div className={`plan-card ${plan === "pro" ? "selected" : ""}`} onClick={() => setPlan("pro")}>
                          <div className="plan-card-name">Pro ⭐</div>
                          <div className="plan-card-price">₺599</div>
                          <div className="plan-card-sub">/ay · 50 müşteri</div>
                        </div>
                      </div>
                    </div>
                    <div className="field"><label>Şifre</label><input type="password" placeholder="En az 8 karakter" /></div>
                    <button className="btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? "Hesap oluşturuluyor..." : "Ücretsiz Başla →"}</button>
                    <div className="trust-row"><div className="trust-dot"></div><span className="trust-text">14 gün ücretsiz · İstediğin zaman iptal</span></div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}