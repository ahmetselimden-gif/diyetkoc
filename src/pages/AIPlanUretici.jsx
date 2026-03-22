import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { min-height: 100vh; font-family: 'DM Sans', sans-serif; background: #f5f2ec; }
  .layout { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }
  .sidebar { background: #1c3829; padding: 1.5rem 1rem; display: flex; flex-direction: column; gap: 2rem; position: fixed; top: 0; left: 0; bottom: 0; width: 220px; }
  .logo { display: flex; align-items: center; gap: 10px; padding: 0 0.5rem; }
  .logo-mark { width: 32px; height: 32px; border-radius: 8px; background: #a8d5a2; display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 16px; color: #1c3829; }
  .logo-text { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 400; color: #f5f2ec; }
  .nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }
  .nav-section { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,242,236,0.35); padding: 0.75rem 0.75rem 0.4rem; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; font-size: 14px; color: rgba(245,242,236,0.6); cursor: pointer; }
  .nav-item.active { background: rgba(168,213,162,0.15); color: #a8d5a2; }
  .nav-item .icon { font-size: 16px; width: 20px; text-align: center; }
  .sidebar-user { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem; display: flex; align-items: center; gap: 10px; }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: #a8d5a2; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; color: #1c3829; }
  .user-info .name { font-size: 13px; font-weight: 500; color: #f5f2ec; }
  .user-info .role { font-size: 11px; color: rgba(245,242,236,0.4); }
  .main { margin-left: 220px; padding: 2rem; max-width: 1200px; }
  .topbar { margin-bottom: 2rem; }
  .topbar h1 { font-family: 'Fraunces', serif; font-size: 1.6rem; font-weight: 300; color: #1c3829; letter-spacing: -0.02em; }
  .topbar p { font-size: 13px; color: #8a8378; margin-top: 3px; }
  .grid { display: grid; grid-template-columns: 420px 1fr; gap: 16px; align-items: start; }
  .card { background: #fff; border: 0.5px solid #e8e4dc; border-radius: 16px; overflow: hidden; }
  .card-header { padding: 1.25rem 1.5rem; border-bottom: 0.5px solid #e8e4dc; }
  .card-title { font-size: 15px; font-weight: 500; color: #1c3829; }
  .card-sub { font-size: 12px; color: #8a8378; margin-top: 2px; }
  .card-body { padding: 1.5rem; }
  .field { margin-bottom: 1rem; }
  .field label { display: block; font-size: 11px; font-weight: 500; color: #5a5650; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 6px; }
  .field input, .field select, .field textarea { width: 100%; padding: 11px 14px; border: 1.5px solid #ddd9d0; border-radius: 10px; background: #faf9f6; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1c3829; outline: none; appearance: none; resize: none; }
  .field input:focus, .field select:focus { border-color: #1c3829; }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
  .toggle-group { display: flex; flex-wrap: wrap; gap: 6px; }
  .toggle-btn { padding: 6px 14px; border: 1.5px solid #ddd9d0; border-radius: 100px; background: #faf9f6; font-family: 'DM Sans', sans-serif; font-size: 12px; color: #5a5650; cursor: pointer; }
  .toggle-btn.on { border-color: #1c3829; background: #1c3829; color: #f5f2ec; }
  .btn-generate { width: 100%; padding: 14px; border: none; border-radius: 12px; background: #1c3829; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; color: #f5f2ec; cursor: pointer; margin-top: 0.5rem; }
  .btn-generate:disabled { opacity: 0.6; cursor: not-allowed; }
  .output-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 2rem; text-align: center; min-height: 400px; }
  .empty-icon { font-size: 48px; margin-bottom: 1rem; opacity: 0.3; }
  .empty-title { font-family: 'Fraunces', serif; font-size: 1.2rem; font-weight: 300; color: #1c3829; margin-bottom: 0.4rem; }
  .empty-sub { font-size: 13px; color: #b5b0a7; }
  .output-header { padding: 1.25rem 1.5rem; border-bottom: 0.5px solid #e8e4dc; display: flex; align-items: center; justify-content: space-between; }
  .output-meta { display: flex; gap: 8px; flex-wrap: wrap; }
  .meta-pill { padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 500; background: #EAF3DE; color: #3B6D11; }
  .meta-pill.blue { background: #E6F1FB; color: #185FA5; }
  .meta-pill.amber { background: #FAEEDA; color: #854F0B; }
  .output-actions { display: flex; gap: 8px; }
  .btn-sm { padding: 7px 14px; border-radius: 9px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; }
  .btn-sm.outline { border: 1.5px solid #ddd9d0; background: #fff; color: #1c3829; }
  .btn-sm.solid { border: none; background: #1c3829; color: #f5f2ec; }
  .plan-content { padding: 1.5rem; overflow-y: auto; max-height: 640px; }
  .streaming-text { white-space: pre-wrap; font-size: 14px; color: #3a3732; line-height: 1.8; }
  .loading-box { padding: 3rem 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; min-height: 400px; justify-content: center; }
  .spinner { width: 40px; height: 40px; border: 2px solid #e8e4dc; border-top-color: #1c3829; border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { font-size: 14px; color: #8a8378; text-align: center; line-height: 1.7; }
  .loading-step { font-size: 12px; color: #a8d5a2; font-weight: 500; }
  .note-box { margin: 1rem 1.5rem; padding: 12px 16px; background: #f0f5f2; border-radius: 10px; border-left: 3px solid #1c3829; font-size: 13px; color: #3a3732; line-height: 1.6; }
`;

const ALLERGIES = ["Gluten","Laktoz","Fıstık","Yumurta","Balık","Soya"];
const RESTRICTIONS = ["Et yok","Vegan","Helal","Diyabetik","Düşük sodyum"];

export default function AIPlanUretici() {
  const [form, setForm] = useState({ ad:"", yas:"", cinsiyet:"Kadın", kilo:"", boy:"", hedef:"kilo-verme", aktivite:"orta", kalori:"1500", sure:"7", notlar:"" });
  const [allergies, setAllergies] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [streamText, setStreamText] = useState("");
  const [loadStep, setLoadStep] = useState("");

  const toggle = (arr, setArr, val) => setArr(arr.includes(val) ? arr.filter(v=>v!==val) : [...arr, val]);

  const buildPrompt = () => `Sen bir uzman Türk diyetisyenisin. ${form.sure} günlük Türkçe diyet planı hazırla.
Ad: ${form.ad||"Hasta"}, Yaş: ${form.yas}, Cinsiyet: ${form.cinsiyet}
Kilo: ${form.kilo} kg, Boy: ${form.boy} cm
Hedef: ${form.hedef}, Aktivite: ${form.aktivite}, Kalori: ${form.kalori} kcal
${allergies.length?`Alerjiler: ${allergies.join(", ")}`:""}
${restrictions.length?`Kısıtlamalar: ${restrictions.join(", ")}`:""}
${form.notlar?`Notlar: ${form.notlar}`:""}
Her gün için: GÜN N - Kahvaltı, Ara Öğün, Öğle, Ara Öğün, Akşam formatında yaz. Türk gıdaları kullan.`;

  const handleGenerate = async () => {
    setStatus("loading");
    setStreamText("");
    const steps = ["Profil analiz ediliyor...","Kalori hesaplanıyor...","Türk gıda veritabanı taranıyor...","Plan oluşturuluyor..."];
    let i = 0;
    setLoadStep(steps[0]);
    const interval = setInterval(() => { i=(i+1)%steps.length; setLoadStep(steps[i]); }, 900);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          messages: [{ role: "user", content: buildPrompt() }]
        })
      });
      clearInterval(interval);
      const data = await response.json();
      const text = data.content[0].textconst text = data?.content?.[0]?.text || data?.completion || JSON.stringify(data);
      setStreamText(text);
      setStatus("done");
    } catch(err) {
      clearInterval(interval);
      setStreamText("Hata oluştu: " + err.message);
      setStatus("done");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="layout">
        <div className="sidebar">
          <div className="logo"><div className="logo-mark">D</div><span className="logo-text">DiyetKoç</span></div>
          <div className="nav">
            <div className="nav-section">Genel</div>
            {[{id:"ozet",icon:"▦",label:"Özet"},{id:"musteriler",icon:"◎",label:"Müşteriler"},{id:"planlar",icon:"◈",label:"AI Planlar",active:true}].map(n=>(
              <div key={n.id} className={`nav-item ${n.active?"active":""}`}><span className="icon">{n.icon}</span>{n.label}</div>
            ))}
          </div>
          <div className="sidebar-user">
            <div className="avatar">AY</div>
            <div className="user-info"><div className="name">Ayşe Yılmaz</div><div className="role">Diyetisyen · Pro</div></div>
          </div>
        </div>

        <div className="main">
          <div className="topbar">
            <h1>✦ AI Plan Üretici</h1>
            <p>Hasta bilgilerini gir, saniyeler içinde kişiselleştirilmiş diyet planı al</p>
          </div>
          <div className="grid">
            <div className="card">
              <div className="card-header"><div className="card-title">Hasta Bilgileri</div><div className="card-sub">Tüm alanlar planı daha iyi yapar</div></div>
              <div className="card-body">
                <div className="row2">
                  <div className="field"><label>Ad Soyad</label><input placeholder="Ayşe Kaya" value={form.ad} onChange={e=>setForm({...form,ad:e.target.value})} /></div>
                  <div className="field"><label>Yaş</label><input type="number" placeholder="32" value={form.yas} onChange={e=>setForm({...form,yas:e.target.value})} /></div>
                </div>
                <div className="row3">
                  <div className="field"><label>Cinsiyet</label><select value={form.cinsiyet} onChange={e=>setForm({...form,cinsiyet:e.target.value})}><option>Kadın</option><option>Erkek</option></select></div>
                  <div className="field"><label>Kilo (kg)</label><input type="number" placeholder="68" value={form.kilo} onChange={e=>setForm({...form,kilo:e.target.value})} /></div>
                  <div className="field"><label>Boy (cm)</label><input type="number" placeholder="165" value={form.boy} onChange={e=>setForm({...form,boy:e.target.value})} /></div>
                </div>
                <div className="field"><label>Hedef</label><select value={form.hedef} onChange={e=>setForm({...form,hedef:e.target.value})}><option value="kilo-verme">Kilo verme</option><option value="kas-yapma">Kas yapma</option><option value="form-koruma">Form koruma</option><option value="saglikli-beslenme">Sağlıklı beslenme</option></select></div>
                <div className="row3">
                  <div className="field"><label>Aktivite</label><select value={form.aktivite} onChange={e=>setForm({...form,aktivite:e.target.value})}><option value="dusuk">Düşük</option><option value="orta">Orta</option><option value="yuksek">Yüksek</option></select></div>
                  <div className="field"><label>Kalori</label><input type="number" placeholder="1500" value={form.kalori} onChange={e=>setForm({...form,kalori:e.target.value})} /></div>
                  <div className="field"><label>Süre</label><select value={form.sure} onChange={e=>setForm({...form,sure:e.target.value})}><option value="3">3 gün</option><option value="7">7 gün</option><option value="14">14 gün</option></select></div>
                </div>
                <div className="field"><label>Alerjiler</label><div className="toggle-group">{ALLERGIES.map(a=><button key={a} className={`toggle-btn ${allergies.includes(a)?"on":""}`} onClick={()=>toggle(allergies,setAllergies,a)}>{a}</button>)}</div></div>
                <div className="field"><label>Kısıtlamalar</label><div className="toggle-group">{RESTRICTIONS.map(r=><button key={r} className={`toggle-btn ${restrictions.includes(r)?"on":""}`} onClick={()=>toggle(restrictions,setRestrictions,r)}>{r}</button>)}</div></div>
                <div className="field"><label>Ek Notlar</label><textarea rows={3} placeholder="Örn: Hasta ofiste çalışıyor..." value={form.notlar} onChange={e=>setForm({...form,notlar:e.target.value})} /></div>
                <button className="btn-generate" onClick={handleGenerate} disabled={status==="loading"}>
                  {status==="loading"?"⏳ Üretiliyor...":"✦ AI ile Plan Üret"}
                </button>
              </div>
            </div>

            <div className="card">
              {status==="idle"&&<div className="output-empty"><div className="empty-icon">◈</div><div className="empty-title">Plan burada görünecek</div><div className="empty-sub">Hasta bilgilerini doldurup butona bas</div></div>}
              {status==="loading"&&<div className="loading-box"><div className="spinner"></div><div className="loading-text"><div className="loading-step">{loadStep}</div><div style={{marginTop:6}}>AI planı hazırlıyor...</div></div></div>}
              {status==="done"&&(
                <>
                  <div className="output-header">
                    <div className="output-meta">
                      <span className="meta-pill">{form.ad||"Hasta"}</span>
                      <span className="meta-pill blue">{form.kalori} kcal/gün</span>
                      <span className="meta-pill amber">{form.sure} günlük</span>
                    </div>
                    <div className="output-actions">
                      <button className="btn-sm outline" onClick={()=>navigator.clipboard.writeText(streamText)}>📋 Kopyala</button>
                      <button className="btn-sm solid">📤 PDF</button>
                    </div>
                  </div>
                  <div className="plan-content"><div className="streaming-text">{streamText}</div></div>
                  <div className="note-box">💡 Bu plan AI tarafından oluşturulmuştur. Klinik değerlendirme ile birlikte kullanınız.</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}