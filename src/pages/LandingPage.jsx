import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body, #root { font-family: 'DM Sans', sans-serif; background: #f5f2ec; color: #1c3829; }

  /* NAV */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: all 0.3s; }
  .nav.scrolled { background: rgba(245,242,236,0.92); backdrop-filter: blur(12px); border-bottom: 0.5px solid #e8e4dc; }
  .nav-inner { max-width: 1100px; margin: 0 auto; padding: 1.25rem 2rem; display: flex; align-items: center; justify-content: space-between; }
  .logo { display: flex; align-items: center; gap: 10px; }
  .logo-mark { width: 34px; height: 34px; border-radius: 9px; background: #1c3829; display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 17px; color: #a8d5a2; }
  .logo-text { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 400; color: #1c3829; }
  .nav-links { display: flex; align-items: center; gap: 2rem; }
  .nav-link { font-size: 14px; color: #5a5650; cursor: pointer; transition: color 0.15s; text-decoration: none; }
  .nav-link:hover { color: #1c3829; }
  .nav-cta { padding: 9px 22px; background: #1c3829; color: #f5f2ec; border: none; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
  .nav-cta:hover { background: #264d38; transform: translateY(-1px); }

  /* HERO */
  .hero { min-height: 100vh; display: flex; align-items: center; padding: 8rem 2rem 4rem; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; top: -200px; right: -200px; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(168,213,162,0.12) 0%, transparent 70%); pointer-events: none; }
  .hero::after { content: ''; position: absolute; bottom: -100px; left: -100px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(28,56,41,0.05) 0%, transparent 70%); pointer-events: none; }
  .hero-inner { max-width: 1100px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .hero-tag { display: inline-flex; align-items: center; gap: 8px; background: #e8f5e4; border: 1px solid #c5e0bf; border-radius: 100px; padding: 6px 16px; font-size: 12px; font-weight: 500; color: #3B6D11; margin-bottom: 1.5rem; }
  .tag-dot { width: 6px; height: 6px; border-radius: 50%; background: #3B6D11; }
  .hero-title { font-family: 'Fraunces', serif; font-size: clamp(2.5rem, 5vw, 3.8rem); font-weight: 300; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 1.25rem; }
  .hero-title em { font-style: italic; color: #3B6D11; }
  .hero-sub { font-size: 17px; color: #5a5650; line-height: 1.7; margin-bottom: 2rem; max-width: 480px; }
  .hero-actions { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .btn-hero { padding: 14px 32px; background: #1c3829; color: #f5f2ec; border: none; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
  .btn-hero:hover { background: #264d38; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(28,56,41,0.2); }
  .btn-ghost { padding: 14px 24px; background: transparent; color: #1c3829; border: 1.5px solid #c8c4bb; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 15px; cursor: pointer; transition: all 0.2s; }
  .btn-ghost:hover { border-color: #1c3829; }
  .hero-trust { margin-top: 2rem; display: flex; align-items: center; gap: 12px; }
  .trust-avatars { display: flex; }
  .trust-av { width: 30px; height: 30px; border-radius: 50%; border: 2px solid #f5f2ec; background: #a8d5a2; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; color: #1c3829; margin-left: -8px; }
  .trust-av:first-child { margin-left: 0; }
  .trust-text { font-size: 13px; color: #8a8378; }
  .trust-text strong { color: #1c3829; }

  /* HERO VISUAL */
  .hero-visual { position: relative; }
  .mockup-card { background: #fff; border: 0.5px solid #e8e4dc; border-radius: 20px; padding: 1.5rem; box-shadow: 0 20px 60px rgba(28,56,41,0.1); }
  .mock-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
  .mock-title { font-family: 'Fraunces', serif; font-size: 1rem; color: #1c3829; }
  .mock-badge { padding: 4px 12px; background: #EAF3DE; color: #3B6D11; font-size: 11px; font-weight: 500; border-radius: 100px; }
  .mock-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 1.25rem; }
  .mock-stat { background: #f5f2ec; border-radius: 10px; padding: 10px; text-align: center; }
  .mock-stat-val { font-family: 'Fraunces', serif; font-size: 1.2rem; color: #1c3829; }
  .mock-stat-lbl { font-size: 10px; color: #8a8378; }
  .mock-list { display: flex; flex-direction: column; gap: 8px; }
  .mock-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: #faf9f6; border-radius: 10px; }
  .mock-av { width: 28px; height: 28px; border-radius: 50%; background: #e8e4dc; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 500; color: #5a5650; }
  .mock-name { font-size: 13px; font-weight: 500; color: #1c3829; flex: 1; }
  .mock-prog { font-size: 11px; color: #8a8378; }
  .mock-dot { width: 8px; height: 8px; border-radius: 50%; background: #a8d5a2; }
  .float-card { position: absolute; background: #1c3829; border-radius: 14px; padding: 12px 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
  .float-card.top { top: -20px; right: -20px; }
  .float-card.bottom { bottom: -20px; left: -20px; }
  .float-val { font-family: 'Fraunces', serif; font-size: 1.4rem; color: #a8d5a2; }
  .float-lbl { font-size: 11px; color: rgba(245,242,236,0.6); margin-top: 2px; }

  /* LOGOS */
  .logos-section { padding: 3rem 2rem; border-top: 0.5px solid #e8e4dc; border-bottom: 0.5px solid #e8e4dc; background: #fff; }
  .logos-inner { max-width: 1100px; margin: 0 auto; text-align: center; }
  .logos-label { font-size: 12px; color: #b5b0a7; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1.5rem; }
  .logos-row { display: flex; align-items: center; justify-content: center; gap: 3rem; flex-wrap: wrap; }
  .logo-item { font-family: 'Fraunces', serif; font-size: 1.1rem; color: #c4bfb6; font-weight: 400; }

  /* FEATURES */
  .features { padding: 6rem 2rem; }
  .section-inner { max-width: 1100px; margin: 0 auto; }
  .section-tag { display: inline-block; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #3B6D11; background: #EAF3DE; padding: 5px 14px; border-radius: 100px; margin-bottom: 1rem; }
  .section-title { font-family: 'Fraunces', serif; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 300; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
  .section-sub { font-size: 16px; color: #5a5650; max-width: 520px; line-height: 1.7; margin-bottom: 3rem; }
  .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .feat-card { background: #fff; border: 0.5px solid #e8e4dc; border-radius: 16px; padding: 1.75rem; transition: all 0.2s; }
  .feat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(28,56,41,0.08); }
  .feat-icon { width: 44px; height: 44px; border-radius: 12px; background: #f0f5f2; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 1rem; }
  .feat-title { font-size: 16px; font-weight: 500; color: #1c3829; margin-bottom: 0.5rem; }
  .feat-desc { font-size: 14px; color: #5a5650; line-height: 1.6; }

  /* HOW IT WORKS */
  .how { padding: 6rem 2rem; background: #fff; }
  .steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; position: relative; }
  .steps::before { content: ''; position: absolute; top: 28px; left: 12.5%; right: 12.5%; height: 1px; background: #e8e4dc; z-index: 0; }
  .step { text-align: center; position: relative; z-index: 1; }
  .step-num { width: 56px; height: 56px; border-radius: 50%; background: #1c3829; color: #a8d5a2; font-family: 'Fraunces', serif; font-size: 1.3rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }
  .step-title { font-size: 15px; font-weight: 500; color: #1c3829; margin-bottom: 0.4rem; }
  .step-desc { font-size: 13px; color: #8a8378; line-height: 1.6; }

  /* TESTIMONIALS */
  .testimonials { padding: 6rem 2rem; }
  .testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
  .testi-card { background: #fff; border: 0.5px solid #e8e4dc; border-radius: 16px; padding: 1.75rem; }
  .testi-stars { color: #EF9F27; font-size: 14px; margin-bottom: 0.75rem; letter-spacing: 2px; }
  .testi-text { font-size: 14px; color: #3a3732; line-height: 1.7; margin-bottom: 1.25rem; font-style: italic; }
  .testi-author { display: flex; align-items: center; gap: 10px; }
  .testi-av { width: 36px; height: 36px; border-radius: 50%; background: #e8e4dc; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; color: #5a5650; }
  .testi-name { font-size: 13px; font-weight: 500; color: #1c3829; }
  .testi-role { font-size: 12px; color: #8a8378; }

  /* PRICING */
  .pricing { padding: 6rem 2rem; background: #fff; }
  .pricing-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; max-width: 900px; margin: 0 auto; }
  .price-card { border: 0.5px solid #e8e4dc; border-radius: 18px; padding: 2rem; background: #faf9f6; }
  .price-card.featured { background: #1c3829; border-color: #1c3829; }
  .price-label { font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: #8a8378; margin-bottom: 0.75rem; }
  .price-card.featured .price-label { color: rgba(245,242,236,0.5); }
  .price-popular { display: inline-block; background: #a8d5a2; color: #1c3829; font-size: 11px; font-weight: 500; padding: 3px 12px; border-radius: 100px; margin-bottom: 0.75rem; }
  .price-amount { font-family: 'Fraunces', serif; font-size: 2.5rem; font-weight: 300; letter-spacing: -0.03em; color: #1c3829; }
  .price-card.featured .price-amount { color: #f5f2ec; }
  .price-period { font-size: 14px; color: #8a8378; }
  .price-card.featured .price-period { color: rgba(245,242,236,0.5); }
  .price-desc { font-size: 13px; color: #8a8378; margin: 0.5rem 0 1.5rem; line-height: 1.5; }
  .price-card.featured .price-desc { color: rgba(245,242,236,0.5); }
  .price-features { display: flex; flex-direction: column; gap: 10px; margin-bottom: 1.75rem; }
  .price-feat { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #3a3732; }
  .price-card.featured .price-feat { color: rgba(245,242,236,0.8); }
  .price-check { width: 18px; height: 18px; border-radius: 50%; background: #EAF3DE; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #3B6D11; flex-shrink: 0; }
  .price-card.featured .price-check { background: rgba(168,213,162,0.2); color: #a8d5a2; }
  .btn-price { width: 100%; padding: 13px; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; border: 1.5px solid #1c3829; background: transparent; color: #1c3829; }
  .btn-price:hover { background: #1c3829; color: #f5f2ec; }
  .price-card.featured .btn-price { background: #a8d5a2; color: #1c3829; border-color: #a8d5a2; }
  .price-card.featured .btn-price:hover { background: #bde0b8; }

  /* CTA */
  .cta-section { padding: 6rem 2rem; }
  .cta-box { max-width: 700px; margin: 0 auto; background: #1c3829; border-radius: 24px; padding: 4rem 3rem; text-align: center; position: relative; overflow: hidden; }
  .cta-box::before { content: ''; position: absolute; top: -80px; right: -80px; width: 300px; height: 300px; border-radius: 50%; background: rgba(168,213,162,0.08); }
  .cta-title { font-family: 'Fraunces', serif; font-size: 2.2rem; font-weight: 300; color: #f5f2ec; letter-spacing: -0.02em; margin-bottom: 0.75rem; position: relative; }
  .cta-sub { font-size: 16px; color: rgba(245,242,236,0.6); margin-bottom: 2rem; line-height: 1.6; position: relative; }
  .btn-cta { padding: 15px 40px; background: #a8d5a2; color: #1c3829; border: none; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 500; cursor: pointer; transition: all 0.2s; position: relative; }
  .btn-cta:hover { background: #bde0b8; transform: translateY(-2px); }
  .cta-note { font-size: 13px; color: rgba(245,242,236,0.4); margin-top: 1rem; position: relative; }

  /* FOOTER */
  .footer { background: #1c3829; padding: 3rem 2rem 2rem; }
  .footer-inner { max-width: 1100px; margin: 0 auto; }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
  .footer-brand p { font-size: 14px; color: rgba(245,242,236,0.5); line-height: 1.7; margin-top: 0.75rem; max-width: 260px; }
  .footer-col-title { font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(245,242,236,0.4); margin-bottom: 1rem; }
  .footer-link { display: block; font-size: 14px; color: rgba(245,242,236,0.6); margin-bottom: 0.6rem; cursor: pointer; transition: color 0.15s; text-decoration: none; }
  .footer-link:hover { color: #f5f2ec; }
  .footer-bottom { border-top: 0.5px solid rgba(255,255,255,0.1); padding-top: 1.5rem; display: flex; align-items: center; justify-content: space-between; }
  .footer-copy { font-size: 13px; color: rgba(245,242,236,0.3); }

  @media (max-width: 768px) {
    .hero-inner { grid-template-columns: 1fr; }
    .hero-visual { display: none; }
    .features-grid { grid-template-columns: 1fr; }
    .steps { grid-template-columns: 1fr 1fr; }
    .steps::before { display: none; }
    .testi-grid { grid-template-columns: 1fr; }
    .pricing-grid { grid-template-columns: 1fr; }
    .footer-top { grid-template-columns: 1fr 1fr; }
  }
`;

const features = [
  { icon:"🤖", title:"AI Diyet Planı", desc:"Hasta bilgilerini gir, saniyeler içinde Türk gıda veritabanıyla kişiselleştirilmiş haftalık plan hazır." },
  { icon:"📊", title:"Müşteri Takibi", desc:"Tüm müşterilerini tek panelden yönet. Kilo, ölçü, ilerleme grafikleri otomatik oluşur." },
  { icon:"📱", title:"Müşteri Portalı", desc:"Her müşteriye özel link. Planını görür, ölçüm girer, sana otomatik ulaşır." },
  { icon:"📤", title:"PDF & Paylaşım", desc:"Markalı, profesyonel PDF planı tek tıkla oluştur. WhatsApp veya e-posta ile gönder." },
  { icon:"🔔", title:"Otomatik Hatırlatma", desc:"Ölçüm günleri, su içme, öğün saatleri için müşteriye otomatik bildirim gönderilir." },
  { icon:"💳", title:"Otomatik Ödeme", desc:"Abonelik ücretlerini İyzico ile otomatik tahsil et. Takip, fatura, her şey otomatik." },
];

const steps = [
  { num:"1", title:"Üye ol", desc:"14 günlük ücretsiz denemeye başla, kredi kartı gerekmez." },
  { num:"2", title:"Müşterini ekle", desc:"Hasta bilgilerini gir, sistem profili oluşturur." },
  { num:"3", title:"Plan üret", desc:"AI ile saniyede kişiselleştirilmiş diyet planı oluştur." },
  { num:"4", title:"Takip et", desc:"Müşteri portalından ölçümleri takip et, planı güncelle." },
];

const testimonials = [
  { text:"Haftada 4 saatimi geri kazandım. Artık müşteri planı yazmak yerine müşterilerimle vakit geçiriyorum.", name:"Dyt. Selin Kara", role:"Klinik Diyetisyen, İstanbul", initials:"SK" },
  { text:"30 müşterimi tek panelden yönetiyorum. Eskiden Excel ve WhatsApp karmaşasıydı, şimdi her şey bir arada.", name:"Dyt. Ahmet Yıldız", role:"Beslenme Uzmanı, Ankara", initials:"AY" },
  { text:"Müşterilerim portala bayıldı. Artık her şeyi telefonlarından takip ediyorlar, bana çok daha az soru geliyor.", name:"Dyt. Merve Arslan", role:"Fitness Diyetisyeni, İzmir", initials:"MA" },
];

export default function App() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [count, setCount] = useState({ koç: 0, plan: 0, saat: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const targets = { koç: 847, plan: 12400, saat: 4 };
    const duration = 2000;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount({
        koç: Math.round(targets.koç * ease),
        plan: Math.round(targets.plan * ease),
        saat: Math.round(targets.saat * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const prices = annual
    ? [{ name:"Başlangıç", amount:"239", desc:"10 aktif müşteriye kadar" }, { name:"Pro", amount:"479", desc:"50 aktif müşteriye kadar" }, { name:"Klinik", amount:"799", desc:"Sınırsız müşteri" }]
    : [{ name:"Başlangıç", amount:"299", desc:"10 aktif müşteriye kadar" }, { name:"Pro", amount:"599", desc:"50 aktif müşteriye kadar" }, { name:"Klinik", amount:"999", desc:"Sınırsız müşteri" }];

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled?"scrolled":""}`}>
        <div className="nav-inner">
          <div className="logo">
            <div className="logo-mark">D</div>
            <span className="logo-text">DiyetPro</span>
          </div>
          <div className="nav-links">
            <a className="nav-link" href="#ozellikler">Özellikler</a>
            <a className="nav-link" href="#nasil">Nasıl çalışır?</a>
            <a className="nav-link" href="#fiyat">Fiyatlar</a>
            <button className="nav-link" style={{background:"none",border:"none",cursor:"pointer",fontFamily:"inherit"}} onClick={()=>navigate('/plan-uret')}>Plan Üret — Dene</button>
            <button className="nav-link" style={{background:"none",border:"1.5px solid #c8c4bb",cursor:"pointer",fontFamily:"inherit",borderRadius:"100px",padding:"8px 18px"}} onClick={()=>navigate('/giris')}>Giriş Yap</button>
            <button className="nav-cta" onClick={()=>navigate('/giris')}>Ücretsiz Başla</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-tag"><div className="tag-dot"></div>Türkiye'nin ilk AI diyetisyen platformu</div>
            <h1 className="hero-title">
              Müşteri planlarını<br/><em>saniyeler içinde</em><br/>hazırla
            </h1>
            <p className="hero-sub">
              Diyetisyenler ve fitness koçları için AI destekli plan üretimi, müşteri takibi ve otomatik ödeme sistemi. Haftada 4 saatini geri al.
            </p>
            <div className="hero-actions">
              <button className="btn-hero" onClick={()=>navigate('/giris')}>14 Gün Ücretsiz Dene →</button>
              <button className="btn-ghost" onClick={()=>navigate('/plan-uret')}>Plan Üret — Dene</button>
            </div>
            <div className="hero-trust">
              <div className="trust-avatars">
                {["SK","AY","MA","DK","EC"].map((i,idx)=><div key={idx} className="trust-av">{i}</div>)}
              </div>
              <span className="trust-text"><strong>{count.koç}+ koç</strong> aktif olarak kullanıyor</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="mockup-card">
              <div className="mock-header">
                <span className="mock-title">Bugünün Özeti</span>
                <span className="mock-badge">Pro Plan</span>
              </div>
              <div className="mock-stats">
                {[{val:count.plan.toLocaleString(),lbl:"üretilen plan"},{val:"28",lbl:"aktif müşteri"},{val:"%94",lbl:"memnuniyet"}].map((s,i)=>(
                  <div key={i} className="mock-stat">
                    <div className="mock-stat-val">{s.val}</div>
                    <div className="mock-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
              <div className="mock-list">
                {[{i:"AK",n:"Ayşe Kaya",p:"4. hafta · %65"},{i:"MD",n:"Mehmet Demir",p:"Yeni plan bekleniyor"},{i:"ZA",n:"Zeynep Arslan",p:"8. hafta · %88"}].map((r,i)=>(
                  <div key={i} className="mock-row">
                    <div className="mock-av">{r.i}</div>
                    <div className="mock-name">{r.n}</div>
                    <div className="mock-prog">{r.p}</div>
                    <div className="mock-dot"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="float-card top">
              <div className="float-val">{count.saat} saat</div>
              <div className="float-lbl">haftalık kazanç</div>
            </div>
            <div className="float-card bottom">
              <div className="float-val">✦ Plan hazır</div>
              <div className="float-lbl">7 saniyede oluşturuldu</div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <div className="logos-section">
        <div className="logos-inner">
          <div className="logos-label">Türkiye'nin önde gelen klinikleri tarafından kullanılıyor</div>
          <div className="logos-row">
            {["NutriLife Klinik","FitZone Gym","Wellness İstanbul","BeslenMe","ProFit Koçluk"].map((l,i)=>(
              <div key={i} className="logo-item">{l}</div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="features" id="ozellikler">
        <div className="section-inner">
          <div className="section-tag">Özellikler</div>
          <h2 className="section-title">Diyetisyenlerin ihtiyacı olan<br/>her şey tek yerde</h2>
          <p className="section-sub">Excel, WhatsApp, Word karmaşasına son. Müşteri yönetiminden ödeme takibine kadar her şey burada.</p>
          <div className="features-grid">
            {features.map((f,i)=>(
              <div key={i} className="feat-card">
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="how" id="nasil">
        <div className="section-inner">
          <div className="section-tag">Nasıl çalışır?</div>
          <h2 className="section-title">4 adımda başla</h2>
          <p className="section-sub" style={{marginBottom:"3.5rem"}}>Kurulum yok, teknik bilgi gerekmez. Bugün üye ol, bugün kullanmaya başla.</p>
          <div className="steps">
            {steps.map((s,i)=>(
              <div key={i} className="step">
                <div className="step-num">{s.num}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="section-inner">
          <div className="section-tag">Yorumlar</div>
          <h2 className="section-title">Koçlar ne diyor?</h2>
          <p className="section-sub" style={{marginBottom:"2.5rem"}}>Türkiye'nin dört bir yanından 800+ diyetisyen DiyetPro ile çalışıyor.</p>
          <div className="testi-grid">
            {testimonials.map((t,i)=>(
              <div key={i} className="testi-card">
                <div className="testi-stars">★★★★★</div>
                <div className="testi-text">"{t.text}"</div>
                <div className="testi-author">
                  <div className="testi-av">{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="fiyat">
        <div className="section-inner">
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <div className="section-tag" style={{display:"inline-block"}}>Fiyatlar</div>
            <h2 className="section-title" style={{marginTop:"0.75rem"}}>Sana uygun planı seç</h2>
            <p className="section-sub" style={{margin:"0.5rem auto 1.5rem",textAlign:"center"}}>14 gün ücretsiz dene, istediğin zaman iptal et.</p>
            <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"#f5f2ec",border:"0.5px solid #e8e4dc",borderRadius:100,padding:"6px 6px 6px 16px"}}>
              <span style={{fontSize:13,color: annual?"#8a8378":"#1c3829",fontWeight:annual?"400":"500"}}>Aylık</span>
              <div onClick={()=>setAnnual(!annual)} style={{width:40,height:22,borderRadius:100,background: annual?"#1c3829":"#e8e4dc",position:"relative",cursor:"pointer",transition:"background 0.2s"}}>
                <div style={{position:"absolute",top:3,left: annual?19:3,width:16,height:16,borderRadius:50,background:"#fff",transition:"left 0.2s"}}></div>
              </div>
              <span style={{fontSize:13,color: annual?"#1c3829":"#8a8378",fontWeight:annual?"500":"400"}}>Yıllık</span>
              <span style={{fontSize:11,background:"#EAF3DE",color:"#3B6D11",padding:"3px 10px",borderRadius:100,fontWeight:500}}>%20 indirim</span>
            </div>
          </div>
          <div className="pricing-grid">
            {prices.map((p,i)=>(
              <div key={i} className={`price-card ${i===1?"featured":""}`}>
                {i===1 && <div className="price-popular">En popüler</div>}
                <div className="price-label">{p.name}</div>
                <div className="price-amount">₺{p.amount}<span className="price-period">/ay</span></div>
                <div className="price-desc">{p.desc}</div>
                <div className="price-features">
                  {["AI plan üretimi","Müşteri portalı","PDF çıktısı", i>0?"Otomatik hatırlatma":null, i>1?"Sınırsız ekip üyesi":null].filter(Boolean).map((f,j)=>(
                    <div key={j} className="price-feat">
                      <div className="price-check">✓</div>{f}
                    </div>
                  ))}
                </div>
                <button className="btn-price">14 Gün Ücretsiz Dene</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box">
          <h2 className="cta-title">Bugün başla, bu hafta<br/>zaman kazan</h2>
          <p className="cta-sub">847 diyetisyen DiyetPro ile haftada ortalama 4 saat kazanıyor.<br/>Kredi kartı gerekmez, 14 gün ücretsiz.</p>
          <button className="btn-cta">Ücretsiz Hesap Oluştur →</button>
          <div className="cta-note">Kurulum yok · İstediğin zaman iptal</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div>
  <div className="footer-col-title">Ahmet Selim</div>

  <p className="footer-link">ahmetselimden@gmail.com</p>
  <p className="footer-link">WhatsApp: 0506 102 14 01</p>
  <p className="footer-link">İnsta:@Selimdennn</p>
</div>
              <div className="logo">
                <div className="logo-mark" style={{background:"#a8d5a2"}}>D</div>
                <span className="logo-text">DiyetPro</span>
              </div>
              <p>Türkiye'nin diyetisyen ve fitness koçları için AI destekli platform.</p>
            </div>
            <div>
              <div className="footer-col-title">Ürün</div>
              {["Özellikler","Fiyatlar","Demo","Güncellemeler"].map(l=><a key={l} className="footer-link">{l}</a>)}
            </div>
            <div>
              <div className="footer-col-title">Destek</div>
              {["Yardım Merkezi","Bize Ulaş","SSS","Blog"].map(l=><a key={l} className="footer-link">{l}</a>)}
            </div>
            <div>
              <div className="footer-col-title">Yasal</div>
              {["Gizlilik","Kullanım Koşulları","KVKK"].map(l=><a key={l} className="footer-link">{l}</a>)}
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2025 DiyetPro. Tüm hakları saklıdır.</span>
            <span className="footer-copy">Türkiye'de üretildi 🇹🇷</span>
          </div>
        </div>
      </footer>
    </>
  );
}
