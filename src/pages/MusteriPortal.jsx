/* eslint-disable */
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { min-height: 100vh; font-family: 'DM Sans', sans-serif; background: #f5f2ec; display: flex; justify-content: center; }
  .phone-wrap { width: 100%; max-width: 420px; min-height: 100vh; background: #f5f2ec; display: flex; flex-direction: column; }
  .topbar { background: #1c3829; padding: 1.25rem 1.25rem 1rem; }
  .topbar-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
  .greeting { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 300; color: #f5f2ec; }
  .greeting span { color: #a8d5a2; }
  .week-pill { display: inline-flex; align-items: center; gap: 6px; background: rgba(168,213,162,0.15); border: 1px solid rgba(168,213,162,0.3); border-radius: 100px; padding: 6px 14px; }
  .week-pill-text { font-size: 12px; color: #a8d5a2; }
  .week-pill-dot { width: 6px; height: 6px; border-radius: 50%; background: #a8d5a2; }
  .progress-section { background: #1c3829; padding: 0 1.25rem 1.5rem; display: flex; align-items: center; gap: 1.25rem; }
  .ring-wrap { position: relative; width: 80px; height: 80px; flex-shrink: 0; }
  .ring-svg { transform: rotate(-90deg); }
  .ring-bg { fill: none; stroke: rgba(255,255,255,0.1); stroke-width: 6; }
  .ring-fill { fill: none; stroke: #a8d5a2; stroke-width: 6; stroke-linecap: round; stroke-dasharray: 220; }
  .ring-label { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .ring-pct { font-family: 'Fraunces', serif; font-size: 1.1rem; color: #f5f2ec; }
  .ring-sub { font-size: 9px; color: rgba(245,242,236,0.5); }
  .progress-info { flex: 1; }
  .prog-title { font-size: 13px; font-weight: 500; color: #f5f2ec; margin-bottom: 4px; }
  .prog-detail { font-size: 12px; color: rgba(245,242,236,0.5); line-height: 1.6; }
  .prog-stat { color: #a8d5a2; font-weight: 500; }
  .tabs { display: flex; background: #fff; border-bottom: 0.5px solid #e8e4dc; }
  .tab-btn { flex: 1; padding: 14px 8px; border: none; background: transparent; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #8a8378; cursor: pointer; border-bottom: 2px solid transparent; }
  .tab-btn.active { color: #1c3829; font-weight: 500; border-bottom-color: #1c3829; }
  .content { flex: 1; overflow-y: auto; padding: 1.25rem; display: flex; flex-direction: column; gap: 12px; }
  .card { background: #fff; border: 0.5px solid #e8e4dc; border-radius: 14px; overflow: hidden; }
  .card-head { padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 0.5px solid #f5f2ec; }
  .card-title { font-size: 14px; font-weight: 500; color: #1c3829; }
  .meal-list { padding: 0.5rem 0 0.75rem; }
  .meal-item { display: flex; gap: 12px; padding: 12px 1.25rem; border-bottom: 0.5px solid #f5f2ec; }
  .meal-item:last-child { border-bottom: none; }
  .meal-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; background: #f5f2ec; }
  .meal-body { flex: 1; }
  .meal-name { font-size: 13px; font-weight: 500; color: #1c3829; margin-bottom: 3px; }
  .meal-desc { font-size: 12px; color: #8a8378; line-height: 1.5; }
  .water-row { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; }
  .water-left { display: flex; align-items: center; gap: 10px; }
  .water-icon { font-size: 24px; }
  .water-info .label { font-size: 13px; font-weight: 500; color: #1c3829; }
  .water-info .sub { font-size: 12px; color: #8a8378; }
  .water-glasses { display: flex; gap: 4px; }
  .glass { width: 20px; height: 26px; border-radius: 3px; border: 1.5px solid #e8e4dc; background: #faf9f6; cursor: pointer; transition: all 0.15s; }
  .glass.filled { background: #185FA5; border-color: #185FA5; }
  .olcum-form { padding: 1.25rem; }
  .olcum-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
  .olcum-field label { display: block; font-size: 11px; color: #8a8378; margin-bottom: 4px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
  .olcum-field input { width: 100%; padding: 10px 12px; border: 1.5px solid #e8e4dc; border-radius: 9px; background: #faf9f6; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1c3829; outline: none; }
  .btn-save { width: 100%; padding: 12px; background: #1c3829; color: #f5f2ec; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; }
  .saved-msg { text-align: center; padding: 8px; font-size: 13px; color: #3B6D11; font-weight: 500; }
  .progress-list { padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 12px; }
  .progress-week { display: flex; align-items: center; gap: 12px; }
  .pw-label { font-size: 12px; color: #8a8378; min-width: 80px; }
  .pw-bar-wrap { flex: 1; background: #e8e4dc; border-radius: 4px; height: 8px; overflow: hidden; }
  .pw-bar { height: 100%; border-radius: 4px; background: #1c3829; }
  .pw-val { font-size: 12px; font-weight: 500; color: #1c3829; min-width: 60px; text-align: right; }
  .plan-text { white-space: pre-wrap; font-size: 13px; color: #3a3732; line-height: 1.8; padding: 1.25rem; }
  .empty-state { padding: 2rem; text-align: center; color: #8a8378; font-size: 13px; }
  .bottom-nav { background: #fff; border-top: 0.5px solid #e8e4dc; display: flex; padding: 10px 0; }
  .nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 6px; cursor: pointer; }
  .nav-btn-icon { font-size: 20px; }
  .nav-btn-label { font-size: 10px; color: #8a8378; }
  .nav-btn.active .nav-btn-label { color: #1c3829; font-weight: 500; }
  .login-box { padding: 2rem 1.25rem; }
  .login-title { font-family: 'Fraunces', serif; font-size: 1.2rem; color: #1c3829; margin-bottom: 0.5rem; }
  .login-sub { font-size: 13px; color: #8a8378; margin-bottom: 1.5rem; }
  .login-field { margin-bottom: 10px; }
  .login-field label { display: block; font-size: 11px; font-weight: 500; color: #5a5650; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 5px; }
  .login-field input { width: 100%; padding: 11px 14px; border: 1.5px solid #e4dfd5; border-radius: 10px; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1c3829; outline: none; }
  .btn-login { width: 100%; padding: 13px; background: #1c3829; color: #f5f2ec; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; margin-top: 8px; }
  .error-box { background: #fff5f5; border: 1px solid #fecdcd; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #c53030; margin-bottom: 12px; }
`;

export default function MusteriPortal() {
  const [tab, setTab] = useState("plan");
  const [water, setWater] = useState(4);
  const [olcum, setOlcum] = useState({ kilo: "", bel: "", kalca: "" });
  const [saved, setSaved] = useState(false);
  const [musteri, setMusteri] = useState(null);
  const [planlar, setPlanlar] = useState([]);
  const [olcumler, setOlcumler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [email, setEmail] = useState("");
  const [girisYapildi, setGirisYapildi] = useState(false);
  const [hata, setHata] = useState("");

  const handleMusteriGiris = async () => {
    if (!email) { setHata("Email giriniz!"); return; }
    setHata("");
    const { data, error } = await supabase
      .from("musteriler")
      .select("*")
      .eq("email", email)
      .single();
    if (error || !data) { setHata("Müşteri bulunamadı!"); return; }
    setMusteri(data);
    setGirisYapildi(true);

    const { data: planData } = await supabase
      .from("planlar")
      .select("*")
      .eq("musteri_id", data.id)
      .order("created_at", { ascending: false });
    setPlanlar(planData || []);

    const { data: olcumData } = await supabase
      .from("olcumler")
      .select("*")
      .eq("musteri_id", data.id)
      .order("tarih", { ascending: true });
    setOlcumler(olcumData || []);
    setYukleniyor(false);
  };

  const handleOlcumKaydet = async () => {
    if (!olcum.kilo) { return; }
    const { error } = await supabase.from("olcumler").insert([{
      musteri_id: musteri.id,
      kilo: parseFloat(olcum.kilo),
      bel: olcum.bel ? parseFloat(olcum.bel) : null,
      kalca: olcum.kalca ? parseFloat(olcum.kalca) : null,
      tarih: new Date().toISOString().split("T")[0]
    }]);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      setOlcum({ kilo: "", bel: "", kalca: "" });
      const { data } = await supabase.from("olcumler").select("*").eq("musteri_id", musteri.id).order("tarih", { ascending: true });
      setOlcumler(data || []);
    }
  };

  const ilkKilo = olcumler[0]?.kilo;
  const sonKilo = olcumler[olcumler.length - 1]?.kilo;
  const fark = ilkKilo && sonKilo ? (sonKilo - ilkKilo).toFixed(1) : null;
  const maxKilo = Math.max(...olcumler.map(o => o.kilo || 0), 1);

  if (!girisYapildi) {
    return (
      <>
        <style>{styles}</style>
        <div className="phone-wrap">
          <div className="topbar">
            <div className="topbar-row">
              <div className="greeting">DiyetPro <span>Portalı</span></div>
            </div>
          </div>
          <div className="login-box">
            <div className="login-title">Müşteri Girişi</div>
            <div className="login-sub">Email adresinizle portalınıza erişin</div>
            {hata && <div className="error-box">{hata}</div>}
            <div className="login-field">
              <label>E-posta</label>
              <input type="email" placeholder="ayse@gmail.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleMusteriGiris()} />
            </div>
            <button className="btn-login" onClick={handleMusteriGiris}>Portala Gir →</button>
          </div>
        </div>
      </>
    );
  }

  const sonPlan = planlar[0];

  return (
    <>
      <style>{styles}</style>
      <div className="phone-wrap">
        <div className="topbar">
          <div className="topbar-row">
            <div className="greeting">Merhaba, <span>{musteri.ad}</span> 👋</div>
          </div>
          <div className="week-pill"><div className="week-pill-dot"></div><span className="week-pill-text">{musteri.hedef || "Diyet Planı"}</span></div>
        </div>

        <div className="progress-section">
          <div className="ring-wrap">
            <svg className="ring-svg" width="80" height="80" viewBox="0 0 80 80">
              <circle className="ring-bg" cx="40" cy="40" r="35" />
              <circle className="ring-fill" cx="40" cy="40" r="35" strokeDashoffset={olcumler.length > 0 ? 220 - (220 * Math.min(olcumler.length * 10, 100) / 100) : 220} />
            </svg>
            <div className="ring-label">
              <div className="ring-pct">%{Math.min(olcumler.length * 10, 100)}</div>
              <div className="ring-sub">ilerleme</div>
            </div>
          </div>
          <div className="progress-info">
            <div className="prog-title">{musteri.hedef || "Hedef"}</div>
            <div className="prog-detail">
              {ilkKilo && <span>Başlangıç: <span className="prog-stat">{ilkKilo} kg</span><br/></span>}
              {sonKilo && <span>Şu an: <span className="prog-stat">{sonKilo} kg</span><br/></span>}
              {fark && <span>Fark: <span className="prog-stat">{fark > 0 ? "+" : ""}{fark} kg</span></span>}
            </div>
          </div>
        </div>

        <div className="tabs">
          {[{id:"plan",label:"📋 Planım"},{id:"olcum",label:"📏 Ölçüm"},{id:"ilerleme",label:"📈 İlerleme"}].map(t=>(
            <button key={t.id} className={`tab-btn ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>{t.label}</button>
          ))}
        </div>

        <div className="content">
          {tab === "plan" && (
            <>
              <div className="card">
                <div className="card-head"><div className="card-title">📋 Son Diyet Planım</div></div>
                {sonPlan ? (
                  <div className="plan-text">{sonPlan.icerik}</div>
                ) : (
                  <div className="empty-state">Henüz plan oluşturulmadı. Koçunuz yakında planınızı hazırlayacak.</div>
                )}
              </div>
              <div className="card">
                <div className="water-row">
                  <div className="water-left">
                    <div className="water-icon">💧</div>
                    <div className="water-info">
                      <div className="label">Su Takibi</div>
                      <div className="sub">{water}/8 bardak</div>
                    </div>
                  </div>
                  <div className="water-glasses">
                    {[...Array(8)].map((_,i)=>(
                      <div key={i} className={`glass ${i<water?"filled":""}`} onClick={()=>setWater(i+1)} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === "olcum" && (
            <div className="card">
              <div className="card-head"><div className="card-title">📏 Ölçüm Gir</div></div>
              <div className="olcum-form">
                <div className="olcum-grid">
                  <div className="olcum-field"><label>Kilo (kg)</label><input type="number" placeholder="70.3" value={olcum.kilo} onChange={e=>setOlcum({...olcum,kilo:e.target.value})} /></div>
                  <div className="olcum-field"><label>Bel (cm)</label><input type="number" placeholder="76" value={olcum.bel} onChange={e=>setOlcum({...olcum,bel:e.target.value})} /></div>
                  <div className="olcum-field"><label>Kalça (cm)</label><input type="number" placeholder="96" value={olcum.kalca} onChange={e=>setOlcum({...olcum,kalca:e.target.value})} /></div>
                  <div className="olcum-field"><label>Tarih</label><input type="date" defaultValue={new Date().toISOString().split("T")[0]} /></div>
                </div>
                {saved ? <div className="saved-msg">✓ Kaydedildi!</div> : <button className="btn-save" onClick={handleOlcumKaydet}>Ölçümü Kaydet</button>}
              </div>
            </div>
          )}

          {tab === "ilerleme" && (
            <div className="card">
              <div className="card-head"><div className="card-title">📈 Kilo İlerleme</div></div>
              {olcumler.length === 0 ? (
                <div className="empty-state">Henüz ölçüm yok. Ölçüm sekmesinden kilo gir!</div>
              ) : (
                <div className="progress-list">
                  {olcumler.map((o,i)=>(
                    <div key={i} className="progress-week">
                      <span className="pw-label">{new Date(o.tarih).toLocaleDateString("tr-TR",{day:"numeric",month:"short"})}</span>
                      <div className="pw-bar-wrap"><div className="pw-bar" style={{width:`${(o.kilo/maxKilo)*100}%`}}></div></div>
                      <span className="pw-val">{o.kilo} kg</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bottom-nav">
          {[{id:"plan",icon:"📋",label:"Plan"},{id:"olcum",icon:"📏",label:"Ölçüm"},{id:"ilerleme",icon:"📈",label:"İlerleme"}].map(n=>(
            <div key={n.id} className={`nav-btn ${tab===n.id?"active":""}`} onClick={()=>setTab(n.id)}>
              <div className="nav-btn-icon">{n.icon}</div>
              <div className="nav-btn-label">{n.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}