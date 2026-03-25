/* eslint-disable */
import { useState, useEffect } from "react";
import { supabase, getMusteriler, musteri_ekle, planKaydet, signOut } from "../lib/supabase";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { min-height: 100vh; font-family: 'DM Sans', sans-serif; background: #f5f2ec; }
  .layout { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }
  .sidebar { background: #1c3829; padding: 1.5rem 1rem; display: flex; flex-direction: column; gap: 2rem; position: fixed; top: 0; left: 0; bottom: 0; width: 220px; overflow-y: auto; }
  .logo { display: flex; align-items: center; gap: 10px; padding: 0 0.5rem; }
  .logo-mark { width: 32px; height: 32px; border-radius: 8px; background: #a8d5a2; display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 16px; color: #1c3829; }
  .logo-text { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 400; color: #f5f2ec; }
  .nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }
  .nav-section { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,242,236,0.35); padding: 0.75rem 0.75rem 0.4rem; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; font-size: 14px; color: rgba(245,242,236,0.6); cursor: pointer; transition: all 0.15s; }
  .nav-item:hover { background: rgba(255,255,255,0.07); color: #f5f2ec; }
  .nav-item.active { background: rgba(168,213,162,0.15); color: #a8d5a2; }
  .nav-item .icon { font-size: 16px; width: 20px; text-align: center; }
  .nav-badge { margin-left: auto; background: #a8d5a2; color: #1c3829; font-size: 10px; font-weight: 500; padding: 2px 7px; border-radius: 100px; }
  .sidebar-user { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem; display: flex; align-items: center; gap: 10px; }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: #a8d5a2; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; color: #1c3829; }
  .user-info .name { font-size: 13px; font-weight: 500; color: #f5f2ec; }
  .user-info .role { font-size: 11px; color: rgba(245,242,236,0.4); }
  .main { margin-left: 220px; padding: 2rem; }
  .topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
  .topbar-left h1 { font-family: 'Fraunces', serif; font-size: 1.6rem; font-weight: 300; color: #1c3829; letter-spacing: -0.02em; }
  .topbar-left p { font-size: 13px; color: #8a8378; margin-top: 2px; }
  .topbar-right { display: flex; align-items: center; gap: 10px; }
  .btn-outline { padding: 9px 18px; border: 1.5px solid #ddd9d0; border-radius: 10px; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1c3829; cursor: pointer; }
  .btn-primary { padding: 9px 18px; border: none; border-radius: 10px; background: #1c3829; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #f5f2ec; cursor: pointer; font-weight: 500; }
  .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 2rem; }
  .metric-card { background: #fff; border: 0.5px solid #e8e4dc; border-radius: 14px; padding: 1.25rem; }
  .metric-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
  .metric-label { font-size: 12px; color: #8a8378; font-weight: 500; }
  .metric-val { font-family: 'Fraunces', serif; font-size: 2rem; font-weight: 400; color: #1c3829; }
  .metric-change { font-size: 12px; margin-top: 4px; color: #8a8378; }
  .content-grid { display: grid; grid-template-columns: 1fr 340px; gap: 16px; }
  .card { background: #fff; border: 0.5px solid #e8e4dc; border-radius: 16px; overflow: hidden; }
  .card-header { padding: 1.25rem 1.5rem; border-bottom: 0.5px solid #e8e4dc; display: flex; align-items: center; justify-content: space-between; }
  .card-title { font-size: 15px; font-weight: 500; color: #1c3829; }
  .card-sub { font-size: 12px; color: #8a8378; margin-top: 2px; }
  table { width: 100%; border-collapse: collapse; }
  thead th { padding: 12px 1.5rem; text-align: left; font-size: 11px; font-weight: 500; color: #b5b0a7; letter-spacing: 0.06em; text-transform: uppercase; border-bottom: 0.5px solid #e8e4dc; }
  tbody tr { border-bottom: 0.5px solid #f0ece4; cursor: pointer; }
  tbody tr:hover { background: #faf9f6; }
  tbody tr:last-child { border-bottom: none; }
  tbody td { padding: 13px 1.5rem; font-size: 14px; color: #3a3732; }
  .client-name { display: flex; align-items: center; gap: 10px; }
  .client-avatar { width: 32px; height: 32px; border-radius: 50%; background: #e8e4dc; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; color: #5a5650; flex-shrink: 0; }
  .client-fullname { font-weight: 500; color: #1c3829; }
  .client-email { font-size: 12px; color: #8a8378; }
  .badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 500; }
  .badge.active { background: #EAF3DE; color: #3B6D11; }
  .badge.waiting { background: #FAEEDA; color: #854F0B; }
  .right-col { display: flex; flex-direction: column; gap: 16px; }
  .ai-card { background: #1c3829; border-radius: 16px; padding: 1.5rem; }
  .ai-card-title { font-family: 'Fraunces', serif; font-size: 1.1rem; font-weight: 300; color: #f5f2ec; margin-bottom: 0.4rem; }
  .ai-card-sub { font-size: 13px; color: rgba(245,242,236,0.5); margin-bottom: 1.25rem; }
  .ai-field { margin-bottom: 10px; }
  .ai-field label { display: block; font-size: 11px; font-weight: 500; color: rgba(245,242,236,0.5); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 5px; }
  .ai-field select, .ai-field input { width: 100%; padding: 10px 12px; border: 1px solid rgba(255,255,255,0.12); border-radius: 9px; background: rgba(255,255,255,0.07); font-family: 'DM Sans', sans-serif; font-size: 13px; color: #f5f2ec; outline: none; appearance: none; }
  .ai-field select option { background: #1c3829; }
  .ai-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .btn-ai { width: 100%; padding: 12px; margin-top: 4px; background: #a8d5a2; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: #1c3829; cursor: pointer; }
  .btn-ai:disabled { opacity: 0.6; cursor: not-allowed; }
  .empty-state { padding: 3rem; text-align: center; color: #8a8378; font-size: 14px; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(28,56,41,0.4); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 1rem; }
  .modal { background: #f5f2ec; border-radius: 20px; padding: 2rem; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; }
  .modal-title { font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 300; color: #1c3829; margin-bottom: 0.4rem; }
  .modal-sub { font-size: 13px; color: #8a8378; margin-bottom: 1.5rem; }
  .form-field { margin-bottom: 12px; }
  .form-field label { display: block; font-size: 11px; font-weight: 500; color: #5a5650; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 5px; }
  .form-field input, .form-field select { width: 100%; padding: 10px 12px; border: 1.5px solid #e4dfd5; border-radius: 10px; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1c3829; outline: none; appearance: none; }
  .form-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .plan-output { background: #fff; border: 0.5px solid #e8e4dc; border-radius: 12px; padding: 1.25rem; font-size: 13px; color: #3a3732; line-height: 1.8; white-space: pre-wrap; margin-bottom: 1rem; max-height: 320px; overflow-y: auto; }
  .modal-actions { display: flex; gap: 10px; }
  .modal-actions .btn-outline { flex: 1; }
  .modal-actions .btn-primary { flex: 1; }
  .loading-row { padding: 2rem; text-align: center; color: #8a8378; font-size: 13px; }
  .error-box { background: #fff5f5; border: 1px solid #fecdcd; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #c53030; margin-bottom: 12px; }
  .success-box { background: #f0f9f0; border: 1px solid #a8d5a2; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #3B6D11; margin-bottom: 12px; }
  .portal-link { font-size: 12px; color: #1c3829; text-decoration: none; padding: 4px 10px; border: 1px solid #e8e4dc; border-radius: 6px; }
  .portal-link:hover { background: #f5f2ec; }
`;

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("musteriler");
  const [musteriler, setMusteriler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [user, setUser] = useState(null);
  const [showYeniMusteri, setShowYeniMusteri] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [planUretiyor, setPlanUretiyor] = useState(false);
  const [uretilmisPlan, setUretilmisPlan] = useState("");
  const [hata, setHata] = useState("");
  const [basari, setBasari] = useState("");
  const [aiForm, setAiForm] = useState({ musteriId:"", hedef:"kilo-verme", kalori:"1500", sure:"4" });
  const [yeniForm, setYeniForm] = useState({ ad:"", soyad:"", email:"", telefon:"", yas:"", cinsiyet:"Kadın", kilo:"", boy:"", hedef:"Kilo verme" });

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await getMusteriler(user.id);
        setMusteriler(data || []);
      }
      setYukleniyor(false);
    };
    init();
  }, []);

  const musteriyiYenile = async () => {
    if (!user) return;
    const { data } = await getMusteriler(user.id);
    setMusteriler(data || []);
  };

  const handleYeniMusteri = async () => {
    if (!yeniForm.ad || !yeniForm.soyad) { setHata("Ad ve soyad zorunlu!"); return; }
    setHata("");
    const kocId = user?.id || "00000000-0000-0000-0000-000000000000";
    const { error } = await musteri_ekle({
      ...yeniForm,
      koc_id: kocId,
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
      setYeniForm({ ad:"", soyad:"", email:"", telefon:"", yas:"", cinsiyet:"Kadın", kilo:"", boy:"", hedef:"Kilo verme" });
    }, 1500);
    musteriyiYenile();
  };

  const handlePlanUret = async () => {
    const seciliMusteri = musteriler.find(m => m.id === aiForm.musteriId);
    if (!seciliMusteri) { setHata("Müşteri seçiniz!"); return; }
    setPlanUretiyor(true);
    setHata("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ad: seciliMusteri.ad + " " + seciliMusteri.soyad,
          yas: seciliMusteri.yas,
          cinsiyet: seciliMusteri.cinsiyet,
          kilo: seciliMusteri.kilo,
          boy: seciliMusteri.boy,
          hedef: aiForm.hedef,
          aktivite: "orta",
          kalori: aiForm.kalori,
          sure: parseInt(aiForm.sure) * 7,
          notlar: "",
          allergies: [],
          restrictions: []
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setUretilmisPlan(data.output);
      await planKaydet({
        musteri_id: seciliMusteri.id,
        koc_id: user.id,
        icerik: data.output,
        kalori: parseInt(aiForm.kalori),
        sure: parseInt(aiForm.sure)
      });
      setShowPlanModal(true);
    } catch (err) {
      setHata("Hata: " + err.message);
    }
    setPlanUretiyor(false);
  };

  const initials = (ad, soyad) => ((ad?.[0]||"") + (soyad?.[0]||"")).toUpperCase();
  const aktifSayisi = musteriler.filter(m => m.aktif).length;

  return (
    <>
      <style>{styles}</style>
      <div className="layout">

        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="logo">
            <div className="logo-mark">D</div>
            <span className="logo-text">DiyetKoç</span>
          </div>
          <div className="nav">
            <div className="nav-section">Genel</div>
            {[{id:"ozet",icon:"▦",label:"Özet"},{id:"musteriler",icon:"◎",label:"Müşteriler",badge:aktifSayisi},{id:"planlar",icon:"◈",label:"AI Planlar"}].map(n=>(
              <div key={n.id} className={`nav-item ${activeNav===n.id?"active":""}`} onClick={()=>setActiveNav(n.id)}>
                <span className="icon">{n.icon}</span>{n.label}
                {n.badge>0&&<span className="nav-badge">{n.badge}</span>}
              </div>
            ))}
            <div className="nav-section">Takip</div>
            {[{id:"ilerleme",icon:"◉",label:"İlerleme"},{id:"raporlar",icon:"◫",label:"Raporlar"},{id:"odemeler",icon:"◈",label:"Ödemeler"}].map(n=>(
              <div key={n.id} className={`nav-item ${activeNav===n.id?"active":""}`} onClick={()=>setActiveNav(n.id)}>
                <span className="icon">{n.icon}</span>{n.label}
              </div>
            ))}
          </div>
          <div className="sidebar-user">
            <div className="avatar">{user?.user_metadata?.ad?.[0] || "D"}</div>
            <div className="user-info">
              <div className="name">{user?.user_metadata?.ad || user?.email?.split("@")[0] || "Kullanıcı"}</div>
              <div className="role">Diyetisyen · Pro</div>
              <div style={{cursor:'pointer',fontSize:12,color:'rgba(245,242,236,0.4)',marginTop:4}}
                onClick={async()=>{ await signOut(); window.location.href='/giris'; }}>
                Çıkış Yap
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <div className="topbar-left">
              <h1>Hoş geldin 👋</h1>
              <p>{aktifSayisi} aktif müşteri</p>
            </div>
            <div className="topbar-right">
              <button className="btn-primary" onClick={()=>setShowYeniMusteri(true)}>+ Yeni Müşteri</button>
            </div>
          </div>

          <div className="metrics">
            {[
              {label:"Aktif Müşteri", val:aktifSayisi, change:"Toplam kayıt"},
              {label:"Toplam Müşteri", val:musteriler.length, change:"Tüm zamanlar"},
              {label:"Bu Ay", val:musteriler.filter(m=>new Date(m.created_at)>new Date(Date.now()-30*24*60*60*1000)).length, change:"Yeni kayıt"},
              {label:"Platform", val:"Pro", change:"Aktif plan"},
            ].map((m,i)=>(
              <div key={i} className="metric-card">
                <div className="metric-top"><span className="metric-label">{m.label}</span></div>
                <div className="metric-val">{m.val}</div>
                <div className="metric-change">{m.change}</div>
              </div>
            ))}
          </div>

          <div className="content-grid">
            <div className="card">
              <div className="card-header">
                <div><div className="card-title">Müşteriler</div><div className="card-sub">{musteriler.length} kayıt</div></div>
              </div>
              {yukleniyor ? (
                <div className="loading-row">Yükleniyor...</div>
              ) : musteriler.length === 0 ? (
                <div className="empty-state">Henüz müşteri yok. "+ Yeni Müşteri" ile başla!</div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Müşteri</th>
                      <th>Hedef</th>
                      <th>Kilo</th>
                      <th>Durum</th>
                      <th>Portal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {musteriler.map(c=>(
                      <tr key={c.id} onClick={()=>setSelectedClient(c)}>
                        <td>
                          <div className="client-name">
                            <div className="client-avatar">{initials(c.ad, c.soyad)}</div>
                            <div>
                              <div className="client-fullname">{c.ad} {c.soyad}</div>
                              <div className="client-email">{c.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>{c.hedef || "-"}</td>
                        <td>{c.kilo ? `${c.kilo} kg` : "-"}</td>
                        <td><span className={`badge ${c.aktif?"active":"waiting"}`}>{c.aktif?"Aktif":"Pasif"}</span></td>
                        <td onClick={e=>e.stopPropagation()}>
                          <a className="portal-link" href={`/portal?email=${c.email}`} target="_blank" rel="noreferrer">Portal →</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="right-col">
              <div className="ai-card">
                <div className="ai-card-title">AI Plan Üret</div>
                <div className="ai-card-sub">Saniyeler içinde kişiselleştirilmiş plan</div>
                {hata && <div className="error-box">{hata}</div>}
                <div className="ai-field">
                  <label>Müşteri</label>
                  <select value={aiForm.musteriId} onChange={e=>setAiForm({...aiForm,musteriId:e.target.value})}>
                    <option value="">Seç...</option>
                    {musteriler.map(c=><option key={c.id} value={c.id}>{c.ad} {c.soyad}</option>)}
                  </select>
                </div>
                <div className="ai-field">
                  <label>Hedef</label>
                  <select value={aiForm.hedef} onChange={e=>setAiForm({...aiForm,hedef:e.target.value})}>
                    <option value="kilo-verme">Kilo verme</option>
                    <option value="kas-yapma">Kas yapma</option>
                    <option value="form-koruma">Form koruma</option>
                  </select>
                </div>
                <div className="ai-row">
                  <div className="ai-field"><label>Kalori</label><input placeholder="1500" value={aiForm.kalori} onChange={e=>setAiForm({...aiForm,kalori:e.target.value})} /></div>
                  <div className="ai-field"><label>Süre (hafta)</label><input placeholder="4" value={aiForm.sure} onChange={e=>setAiForm({...aiForm,sure:e.target.value})} /></div>
                </div>
                <button className="btn-ai" onClick={handlePlanUret} disabled={planUretiyor}>
                  {planUretiyor ? "⏳ Üretiliyor..." : "✦ Planı Üret"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Yeni Müşteri Modal */}
      {showYeniMusteri && (
        <div className="modal-overlay" onClick={()=>setShowYeniMusteri(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-title">Yeni Müşteri Ekle</div>
            <div className="modal-sub">Müşteri bilgilerini girin</div>
            {hata && <div className="error-box">{hata}</div>}
            {basari && <div className="success-box">{basari}</div>}
            <div className="form-row2">
              <div className="form-field"><label>Ad</label><input placeholder="Ayşe" value={yeniForm.ad} onChange={e=>setYeniForm({...yeniForm,ad:e.target.value})} /></div>
              <div className="form-field"><label>Soyad</label><input placeholder="Kaya" value={yeniForm.soyad} onChange={e=>setYeniForm({...yeniForm,soyad:e.target.value})} /></div>
            </div>
            <div className="form-field"><label>E-posta</label><input placeholder="ayse@gmail.com" value={yeniForm.email} onChange={e=>setYeniForm({...yeniForm,email:e.target.value})} /></div>
            <div className="form-field"><label>Telefon</label><input placeholder="0555 123 45 67" value={yeniForm.telefon} onChange={e=>setYeniForm({...yeniForm,telefon:e.target.value})} /></div>
            <div className="form-row2">
              <div className="form-field"><label>Yaş</label><input type="number" placeholder="32" value={yeniForm.yas} onChange={e=>setYeniForm({...yeniForm,yas:e.target.value})} /></div>
              <div className="form-field"><label>Cinsiyet</label>
                <select value={yeniForm.cinsiyet} onChange={e=>setYeniForm({...yeniForm,cinsiyet:e.target.value})}>
                  <option>Kadın</option><option>Erkek</option>
                </select>
              </div>
            </div>
            <div className="form-row2">
              <div className="form-field"><label>Kilo (kg)</label><input type="number" placeholder="68" value={yeniForm.kilo} onChange={e=>setYeniForm({...yeniForm,kilo:e.target.value})} /></div>
              <div className="form-field"><label>Boy (cm)</label><input type="number" placeholder="165" value={yeniForm.boy} onChange={e=>setYeniForm({...yeniForm,boy:e.target.value})} /></div>
            </div>
            <div className="form-field"><label>Hedef</label>
              <select value={yeniForm.hedef} onChange={e=>setYeniForm({...yeniForm,hedef:e.target.value})}>
                <option>Kilo verme</option><option>Kas yapma</option><option>Sağlıklı beslenme</option><option>Form koruma</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={()=>setShowYeniMusteri(false)}>İptal</button>
              <button className="btn-primary" onClick={handleYeniMusteri}>Müşteri Ekle</button>
            </div>
          </div>
        </div>
      )}

      {/* Plan Modal */}
      {showPlanModal && (
        <div className="modal-overlay" onClick={()=>setShowPlanModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-title">Plan Hazır ✦</div>
            <div className="modal-sub">Supabase'e kaydedildi</div>
            <div className="plan-output">{uretilmisPlan}</div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={()=>setShowPlanModal(false)}>Kapat</button>
              <button className="btn-primary" onClick={()=>{navigator.clipboard.writeText(uretilmisPlan);setShowPlanModal(false);}}>Kopyala</button>
            </div>
          </div>
        </div>
      )}

      {/* Müşteri Detay Modal */}
      {selectedClient && (
        <div className="modal-overlay" onClick={()=>setSelectedClient(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"1.5rem"}}>
              <div className="client-avatar" style={{width:52,height:52,fontSize:18}}>{initials(selectedClient.ad,selectedClient.soyad)}</div>
              <div>
                <div className="modal-title" style={{marginBottom:2}}>{selectedClient.ad} {selectedClient.soyad}</div>
                <div style={{fontSize:13,color:"#8a8378"}}>{selectedClient.email}</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:"1.5rem"}}>
              {[
                {label:"Hedef",val:selectedClient.hedef||"-"},
                {label:"Kilo",val:selectedClient.kilo?`${selectedClient.kilo} kg`:"-"},
                {label:"Boy",val:selectedClient.boy?`${selectedClient.boy} cm`:"-"},
                {label:"Yaş",val:selectedClient.yas||"-"},
              ].map((row,i)=>(
                <div key={i} style={{background:"#f5f2ec",borderRadius:10,padding:"12px 14px"}}>
                  <div style={{fontSize:11,color:"#8a8378",marginBottom:3}}>{row.label}</div>
                  <div style={{fontSize:15,fontWeight:500,color:"#1c3829"}}>{row.val}</div>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={()=>setSelectedClient(null)}>Kapat</button>
              <button className="btn-primary" onClick={()=>{setAiForm({...aiForm,musteriId:selectedClient.id});setSelectedClient(null);}}>✦ Plan Üret</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}