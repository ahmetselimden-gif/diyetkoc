/* eslint-disable */
import html2pdf from 'html2pdf.js';
import { useState } from "react";
import jsPDF from "jspdf";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', -apple-system, sans-serif; background: #f2f2f7; }

  .layout { display: flex; min-height: 100vh; }

  /* SIDEBAR */
  .sidebar { width: 240px; background: #1c1c1e; padding: 24px 16px; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; }
  .sidebar-logo { display: flex; align-items: center; gap: 10px; padding: 0 8px; margin-bottom: 32px; }
  .sidebar-logo-mark { width: 32px; height: 32px; border-radius: 10px; background: #30d158; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #000; }
  .sidebar-logo-text { font-size: 16px; font-weight: 600; color: #fff; letter-spacing: -0.3px; }
  .sidebar-section { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.3); letter-spacing: 0.06em; text-transform: uppercase; padding: 0 8px; margin-bottom: 6px; margin-top: 20px; }
  .sidebar-item { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 10px; font-size: 14px; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.15s; }
  .sidebar-item.active { background: rgba(255,255,255,0.08); color: #fff; }
  .sidebar-item svg { width: 16px; height: 16px; opacity: 0.7; }
  .sidebar-bottom { margin-top: auto; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; gap: 10px; }
  .sidebar-av { width: 32px; height: 32px; border-radius: 50%; background: #30d158; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #000; }
  .sidebar-user-name { font-size: 13px; font-weight: 500; color: #fff; }
  .sidebar-user-role { font-size: 11px; color: rgba(255,255,255,0.35); }

  /* MAIN */
  .main { margin-left: 240px; flex: 1; padding: 32px 28px; }
  .page-header { margin-bottom: 24px; }
  .page-title { font-size: 22px; font-weight: 600; color: #1c1c1e; letter-spacing: -0.4px; }
  .page-sub { font-size: 14px; color: #8e8e93; margin-top: 3px; }

  /* GRID */
  .grid { display: grid; grid-template-columns: 380px 1fr; gap: 16px; align-items: start; }

  /* FORM CARD */
  .form-card { background: #fff; border-radius: 16px; overflow: hidden; }
  .form-section { padding: 16px 20px; border-bottom: 1px solid #f2f2f7; }
  .form-section:last-child { border-bottom: none; }
  .form-section-title { font-size: 12px; font-weight: 600; color: #8e8e93; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 12px; }
  .field { margin-bottom: 10px; }
  .field:last-child { margin-bottom: 0; }
  .field label { display: block; font-size: 12px; font-weight: 500; color: #8e8e93; margin-bottom: 4px; }
  .field input, .field select, .field textarea {
    width: 100%; padding: 9px 12px;
    border: 1px solid #e5e5ea; border-radius: 10px;
    background: #f9f9f9; font-family: 'Inter', sans-serif;
    font-size: 14px; color: #1c1c1e; outline: none;
    transition: border-color 0.15s, background 0.15s;
    appearance: none; resize: none;
  }
  .field input:focus, .field select:focus, .field textarea:focus { border-color: #007aff; background: #fff; }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
  .field textarea { min-height: 60px; font-size: 13px; }

  /* TAGS */
  .tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag { padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; color: #3c3c43; background: #f2f2f7; border: none; cursor: pointer; transition: all 0.15s; font-family: 'Inter', sans-serif; }
  .tag.on { background: #007aff; color: #fff; }

  /* GENERATE BTN */
  .btn-generate { width: 100%; padding: 13px; border: none; border-radius: 12px; background: #007aff; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; color: #fff; cursor: pointer; transition: all 0.15s; letter-spacing: -0.2px; }
  .btn-generate:hover:not(:disabled) { background: #0071e3; }
  .btn-generate:active:not(:disabled) { transform: scale(0.99); }
  .btn-generate:disabled { opacity: 0.4; cursor: not-allowed; }

  /* OUTPUT CARD */
  .output-card { background: #fff; border-radius: 16px; overflow: hidden; min-height: 500px; }

  /* EMPTY */
  .output-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 500px; gap: 10px; }
  .empty-icon { width: 56px; height: 56px; border-radius: 16px; background: #f2f2f7; display: flex; align-items: center; justify-content: center; font-size: 24px; }
  .empty-title { font-size: 16px; font-weight: 600; color: #1c1c1e; }
  .empty-sub { font-size: 14px; color: #8e8e93; text-align: center; max-width: 240px; line-height: 1.5; }

  /* LOADING */
  .output-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 500px; gap: 16px; }
  .spinner { width: 36px; height: 36px; border-radius: 50%; border: 2.5px solid #e5e5ea; border-top-color: #007aff; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-label { font-size: 14px; color: #8e8e93; }

  /* OUTPUT HEADER */
  .output-header { padding: 14px 20px; border-bottom: 1px solid #f2f2f7; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
  .output-pills { display: flex; gap: 6px; flex-wrap: wrap; }
  .pill { padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 500; }
  .pill.green { background: #e8f9ee; color: #1d7a3a; }
  .pill.blue { background: #e8f0fe; color: #1a56db; }
  .pill.orange { background: #fff3e0; color: #e65100; }
  .output-btns { display: flex; gap: 8px; }
  .btn-sm { padding: 7px 14px; border-radius: 9px; font-size: 13px; font-weight: 500; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.15s; border: none; }
  .btn-sm.secondary { background: #f2f2f7; color: #1c1c1e; }
  .btn-sm.primary { background: #007aff; color: #fff; }
  .btn-sm:hover { opacity: 0.85; }

  /* PLAN CONTENT */
  .plan-body { padding: 20px; overflow-y: auto; max-height: 600px; }
  .plan-day { font-size: 11px; font-weight: 700; color: #007aff; letter-spacing: 0.07em; text-transform: uppercase; margin-top: 20px; margin-bottom: 8px; }
  .plan-day:first-child { margin-top: 0; }
  .plan-section-title { font-size: 11px; font-weight: 700; color: #8e8e93; letter-spacing: 0.07em; text-transform: uppercase; margin-top: 20px; margin-bottom: 8px; }
  .plan-meal { font-size: 13px; font-weight: 600; color: #1c1c1e; margin-top: 12px; margin-bottom: 4px; }
  .plan-item { font-size: 13px; color: #3c3c43; padding: 2px 0 2px 14px; position: relative; line-height: 1.6; }
  .plan-item::before { content: ''; position: absolute; left: 4px; top: 9px; width: 4px; height: 4px; border-radius: 50%; background: #c7c7cc; }
  .plan-note { font-size: 12px; color: #8e8e93; padding: 2px 0 2px 14px; line-height: 1.5; font-style: italic; }
  .plan-text { font-size: 13px; color: #3c3c43; line-height: 1.65; margin-bottom: 4px; }
  .plan-divider { height: 1px; background: #f2f2f7; margin: 14px 0; }
  .plan-gap { height: 4px; }
  .plan-total { font-size: 12px; font-weight: 600; color: #8e8e93; margin-top: 8px; }

  /* SHARE */
  .share-bar { padding: 12px 20px; border-top: 1px solid #f2f2f7; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .share-label { font-size: 12px; font-weight: 500; color: #8e8e93; margin-right: 4px; }
  .btn-share { padding: 7px 14px; border-radius: 9px; font-size: 12px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; border: none; transition: all 0.15s; }
  .btn-share:hover { opacity: 0.85; }
  .btn-share.wp { background: #25d366; color: #fff; }
  .btn-share.tg { background: #0088cc; color: #fff; }
  .btn-share.mail { background: #ff3b30; color: #fff; }

  /* ERROR */
  .error-box { margin: 20px; padding: 14px 16px; background: #fff5f5; border: 1px solid #fecaca; border-radius: 12px; font-size: 13px; color: #dc2626; }
`;

const ALLERGIES = ["Gluten","Laktoz","Fıstık","Yumurta","Balık","Soya"];
const RESTRICTIONS = ["Et yok","Vegan","Helal","Diyabetik","Düşük sodyum"];
const GOALS = ["kilo-verme","kas-yapma","sağlıklı-beslenme","form-koruma","spor-performansı"];
const GOAL_LABELS = {"kilo-verme":"Kilo Verme","kas-yapma":"Kas Yapma","sağlıklı-beslenme":"Sağlıklı Beslenme","form-koruma":"Form Koruma","spor-performansı":"Spor Performansı"};
const ACTIVITIES = ["düşük","orta","aktif","çok aktif"];

const DAYS = ["PAZARTESİ","SALI","ÇARŞAMBA","PERŞEMBE","CUMA","CUMARTESİ","PAZAR"];
const SECTIONS = ["GENEL DEĞERLENDİRME","GÜNLÜK ÖĞÜN PLANI","KAÇINILACAK","TAVSİYELER","SU VE EGZERSİZ","HAFTALIK"];
const MEALS = ["Kahvaltı","Ara Öğün","Öğle Yemeği","Akşam Yemeği","Sabah Ara","Öğleden Sonra","Günlük Toplam"];

function renderPlan(text) {
  const lines = text.split('\n');
  let html = '';
  for (const line of lines) {
    const t = line.trim();
    if (!t) { html += '<div class="plan-gap"></div>'; continue; }
    if (t === '---') { html += '<div class="plan-divider"></div>'; continue; }
    if (DAYS.some(d => t === d)) { html += `<div class="plan-day">${t}</div>`; continue; }
    if (SECTIONS.some(s => t.startsWith(s))) { html += `<div class="plan-section-title">${t}</div>`; continue; }
    if (MEALS.some(m => t.startsWith(m))) { html += `<div class="plan-meal">${t}</div>`; continue; }
    if (t.startsWith('- ')) { html += `<div class="plan-item">${t.substring(2)}</div>`; continue; }
    if (t.startsWith('* ')) { html += `<div class="plan-note">${t.substring(2)}</div>`; continue; }
    html += `<div class="plan-text">${t}</div>`;
  }
  return html;
}

export default function AIPlanUretici() {
  const [form, setForm] = useState({ ad:"", yas:"", cinsiyet:"Kadın", kilo:"", boy:"", hedef:"kilo-verme", aktivite:"orta", kalori:"1500", sure:"7", notlar:"" });
  const [allergies, setAllergies] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [planText, setPlanText] = useState("");
  const [loadStep, setLoadStep] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);

  const handleGenerate = async () => {
    setStatus("loading"); setPlanText(""); setErrorMsg("");
    const steps = ["Profil analiz ediliyor...","Kalori hesaplanıyor...","Plan oluşturuluyor..."];
    let i = 0; setLoadStep(steps[0]);
    const iv = setInterval(() => { i = (i+1)%steps.length; setLoadStep(steps[i]); }, 1000);
    try {
      const res = await fetch("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, allergies, restrictions })
      });
      clearInterval(iv);
      const data = await res.json();
      if (!res.ok || data.error) { setErrorMsg(data.error || "Hata oluştu"); setStatus("error"); }
      else { setPlanText(data.output || "Plan üretilemedi."); setStatus("done"); }
    } catch (err) { clearInterval(iv); setErrorMsg(err.message); setStatus("error"); }
  };

const handlePDF = () => {
  const div = document.createElement('div');
  div.innerHTML = planText;
  div.style.position = 'absolute';
  div.style.left = '-9999px';
  document.body.appendChild(div);

  const opt = {
    margin: 10,
    filename: `${form.ad || 'hasta'}-diyet-plani.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(div).save().then(() => {
    document.body.removeChild(div);
  });
};

  const wpLink = `https://wa.me/?text=${encodeURIComponent("DiyetPro tarafından hazırlanan diyet planınız hazır!\n\nPlanınızı görüntülemek için diyetisyeninizle iletişime geçin.\n\ndiyetpro.net")}`;
  const tgLink = `https://t.me/share/url?url=https://diyetpro.net&text=${encodeURIComponent(`${form.ad||"Hasta"} için diyet planı hazırlandı.`)}`;
  const mailLink = `mailto:?subject=${encodeURIComponent("Diyet Planınız - DiyetPro")}&body=${encodeURIComponent(`Merhaba ${form.ad||""},\n\nDiyet planınız hazırlanmıştır.\n\n${planText}\n\nDiyetPro — diyetpro.net`)}`;

  return (
    <>
      <style>{styles}</style>
      <div className="layout">
        <div className="sidebar">
          <div className="sidebar-logo">
            <div className="sidebar-logo-mark">DP</div>
            <span className="sidebar-logo-text">DiyetPro</span>
          </div>
          <div className="sidebar-section">Uygulama</div>
          <div className="sidebar-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            AI Plan Üret
          </div>
          <div className="sidebar-bottom">
            <div className="sidebar-av">DP</div>
            <div>
              <div className="sidebar-user-name">Misafir</div>
              <div className="sidebar-user-role">Premium</div>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="page-header">
            <div className="page-title">AI Plan Üretici</div>
            <div className="page-sub">Hasta bilgilerini gir, saniyeler içinde kişisel plan hazır</div>
          </div>

          <div className="grid">
            {/* FORM */}
            <div className="form-card">
              <div className="form-section">
                <div className="form-section-title">Kişisel Bilgiler</div>
                <div className="row2">
                  <div className="field"><label>Ad Soyad</label><input placeholder="Ayşe Kaya" value={form.ad} onChange={e=>setForm({...form,ad:e.target.value})} /></div>
                  <div className="field"><label>Yaş</label><input type="number" placeholder="32" value={form.yas} onChange={e=>setForm({...form,yas:e.target.value})} /></div>
                </div>
                <div className="row3">
                  <div className="field"><label>Cinsiyet</label><select value={form.cinsiyet} onChange={e=>setForm({...form,cinsiyet:e.target.value})}><option>Kadın</option><option>Erkek</option></select></div>
                  <div className="field"><label>Kilo (kg)</label><input type="number" placeholder="68" value={form.kilo} onChange={e=>setForm({...form,kilo:e.target.value})} /></div>
                  <div className="field"><label>Boy (cm)</label><input type="number" placeholder="165" value={form.boy} onChange={e=>setForm({...form,boy:e.target.value})} /></div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-section-title">Hedef</div>
                <div className="tags">
                  {GOALS.map(g=><button key={g} type="button" className={`tag ${form.hedef===g?"on":""}`} onClick={()=>setForm({...form,hedef:g})}>{GOAL_LABELS[g]}</button>)}
                </div>
              </div>

              <div className="form-section">
                <div className="form-section-title">Plan Detayları</div>
                <div className="row3">
                  <div className="field"><label>Aktivite</label><select value={form.aktivite} onChange={e=>setForm({...form,aktivite:e.target.value})}>{ACTIVITIES.map(a=><option key={a}>{a}</option>)}</select></div>
                  <div className="field"><label>Kalori</label><input type="number" placeholder="1500" value={form.kalori} onChange={e=>setForm({...form,kalori:e.target.value})} /></div>
                  <div className="field"><label>Süre (gün)</label><input type="number" placeholder="7" value={form.sure} onChange={e=>setForm({...form,sure:e.target.value})} /></div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-section-title">Alerjiler</div>
                <div className="tags">
                  {ALLERGIES.map(a=><button key={a} type="button" className={`tag ${allergies.includes(a)?"on":""}`} onClick={()=>toggle(allergies,setAllergies,a)}>{a}</button>)}
                </div>
              </div>

              <div className="form-section">
                <div className="form-section-title">Kısıtlamalar</div>
                <div className="tags">
                  {RESTRICTIONS.map(r=><button key={r} type="button" className={`tag ${restrictions.includes(r)?"on":""}`} onClick={()=>toggle(restrictions,setRestrictions,r)}>{r}</button>)}
                </div>
              </div>

              <div className="form-section">
                <div className="field"><label>Ek Notlar</label><textarea placeholder="Özel durumlar, tercihler..." value={form.notlar} onChange={e=>setForm({...form,notlar:e.target.value})} /></div>
                <button type="button" className="btn-generate" onClick={handleGenerate} disabled={status==="loading"}>
                  {status==="loading" ? "Hazırlanıyor..." : "Plan Üret"}
                </button>
              </div>
            </div>

            {/* OUTPUT */}
            <div className="output-card">
              {status==="idle" && (
                <div className="output-empty">
                  <div className="empty-icon">📋</div>
                  <div className="empty-title">Plan Bekleniyor</div>
                  <div className="empty-sub">Formu doldurup "Plan Üret" butonuna bas</div>
                </div>
              )}

              {status==="loading" && (
                <div className="output-loading">
                  <div className="spinner"></div>
                  <div className="loading-label">{loadStep}</div>
                </div>
              )}

              {status==="error" && (
                <div className="error-box">⚠️ {errorMsg}</div>
              )}

              {status==="done" && (
                <>
                  <div className="output-header">
                    <div className="output-pills">
                      <span className="pill green">{GOAL_LABELS[form.hedef]}</span>
                      <span className="pill blue">{form.kalori} kcal</span>
                      <span className="pill orange">{form.sure} gün</span>
                    </div>
                    <div className="output-btns">
                      <button className="btn-sm secondary" onClick={()=>navigator.clipboard.writeText(planText)}>Kopyala</button>
                      <button className="btn-sm secondary" onClick={handlePDF}>PDF</button>
                      <button className="btn-sm primary" onClick={handleGenerate}>Yenile</button>
                    </div>
                  </div>
                  <div className="plan-body">
                    <div dangerouslySetInnerHTML={{__html: renderPlan(planText)}} />
                  </div>
                  <div className="share-bar">
                    <span className="share-label">Paylaş</span>
                    <a href={wpLink} target="_blank" rel="noreferrer" className="btn-share wp">WhatsApp</a>
                    <a href={tgLink} target="_blank" rel="noreferrer" className="btn-share tg">Telegram</a>
                    <a href={mailLink} className="btn-share mail">E-posta</a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}