/* eslint-disable */
import { useState } from "react";
import html2pdf from 'html2pdf.js';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', -apple-system, sans-serif; background: #f2f2f7; }
  .layout { display: flex; min-height: 100vh; }
  .sidebar { width: 240px; background: #1c1c1e; padding: 24px 16px; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; }
  .sidebar-logo { display: flex; align-items: center; gap: 10px; padding: 0 8px; margin-bottom: 32px; }
  .sidebar-logo-mark { width: 32px; height: 32px; border-radius: 10px; background: #30d158; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #000; }
  .sidebar-logo-text { font-size: 16px; font-weight: 600; color: #fff; letter-spacing: -0.3px; }
  .sidebar-section { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.3); letter-spacing: 0.06em; text-transform: uppercase; padding: 0 8px; margin-bottom: 6px; margin-top: 20px; }
  .sidebar-item { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 10px; font-size: 14px; color: rgba(255,255,255,0.5); cursor: pointer; }
  .sidebar-item.active { background: rgba(255,255,255,0.08); color: #fff; }
  .sidebar-bottom { margin-top: auto; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; gap: 10px; }
  .sidebar-av { width: 32px; height: 32px; border-radius: 50%; background: #30d158; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #000; }
  .sidebar-user-name { font-size: 13px; font-weight: 500; color: #fff; }
  .sidebar-user-role { font-size: 11px; color: rgba(255,255,255,0.35); }
  .main { margin-left: 240px; flex: 1; padding: 32px 28px; }
  .page-header { margin-bottom: 24px; }
  .page-title { font-size: 22px; font-weight: 600; color: #1c1c1e; letter-spacing: -0.4px; }
  .page-sub { font-size: 14px; color: #8e8e93; margin-top: 3px; }
  .content-grid { display: grid; grid-template-columns: 360px 1fr; gap: 16px; align-items: start; }
  .form-card { background: #fff; border-radius: 16px; overflow: hidden; }
  .form-section { padding: 14px 18px; border-bottom: 1px solid #f2f2f7; }
  .form-section:last-child { border-bottom: none; }
  .form-section-title { font-size: 11px; font-weight: 600; color: #8e8e93; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 10px; }
  .field { margin-bottom: 8px; }
  .field:last-child { margin-bottom: 0; }
  .field label { display: block; font-size: 11px; font-weight: 500; color: #8e8e93; margin-bottom: 3px; }
  .field input, .field select, .field textarea { width: 100%; padding: 8px 11px; border: 1px solid #e5e5ea; border-radius: 9px; background: #f9f9f9; font-family: 'Inter', sans-serif; font-size: 13px; color: #1c1c1e; outline: none; appearance: none; resize: none; }
  .field textarea { min-height: 56px; }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag { padding: 5px 11px; border-radius: 20px; font-size: 12px; font-weight: 500; color: #3c3c43; background: #f2f2f7; border: none; cursor: pointer; font-family: 'Inter', sans-serif; }
  .tag.on { background: #007aff; color: #fff; }
  .btn-generate { width: 100%; padding: 12px; border: none; border-radius: 11px; background: #007aff; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #fff; cursor: pointer; margin-top: 8px; }
  .btn-generate:disabled { opacity: 0.4; cursor: not-allowed; }
  .output-card { background: #fff; border-radius: 16px; overflow: hidden; min-height: 500px; }
  .output-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 500px; gap: 10px; }
  .empty-icon { font-size: 36px; opacity: 0.2; }
  .empty-title { font-size: 16px; font-weight: 600; color: #1c1c1e; }
  .empty-sub { font-size: 13px; color: #8e8e93; text-align: center; max-width: 220px; line-height: 1.5; }
  .output-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 500px; gap: 16px; }
  .spinner { width: 36px; height: 36px; border-radius: 50%; border: 2.5px solid #e5e5ea; border-top-color: #007aff; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-label { font-size: 14px; color: #8e8e93; }
  .output-header { padding: 12px 18px; border-bottom: 1px solid #f2f2f7; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
  .output-pills { display: flex; gap: 6px; }
  .pill { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 500; }
  .pill.green { background: #e8f9ee; color: #1d7a3a; }
  .pill.blue { background: #e8f0fe; color: #1a56db; }
  .pill.orange { background: #fff3e0; color: #e65100; }
  .output-btns { display: flex; gap: 6px; }
  .btn-sm { padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 500; font-family: 'Inter', sans-serif; cursor: pointer; border: none; }
  .btn-sm.secondary { background: #f2f2f7; color: #1c1c1e; }
  .btn-sm.primary { background: #007aff; color: #fff; }
  .btn-sm.success { background: #30d158; color: #fff; }
  .plan-body { padding: 18px; overflow-y: auto; max-height: 640px; }
  .plan-day-title { font-size: 11px; font-weight: 700; color: #2d6a2d; text-transform: uppercase; letter-spacing: 0.07em; margin-top: 16px; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1.5px solid #cfe8c9; }
  .plan-section-bar { font-size: 10px; font-weight: 700; color: #2d6a2d; text-transform: uppercase; letter-spacing: 0.07em; margin-top: 16px; margin-bottom: 4px; background: #f0f8f0; padding: 5px 8px; border-radius: 4px; }
  .plan-meal-bar { background: #cfe8c9; color: #1a4a1a; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 5px 10px; margin-top: 8px; border-radius: 4px 4px 0 0; }
  .plan-food { font-size: 12px; color: #333; padding: 3px 10px 3px 16px; position: relative; line-height: 1.55; background: #fff; border-left: 1px solid #e8e8e8; border-right: 1px solid #e8e8e8; }
  .plan-food::before { content: ''; position: absolute; left: 6px; top: 9px; width: 4px; height: 4px; border-radius: 50%; background: #2d6a2d; }
  .plan-alt { font-size: 11px; color: #aaa; font-style: italic; padding: 2px 10px 4px 16px; background: #fff; border-left: 1px solid #e8e8e8; border-right: 1px solid #e8e8e8; border-bottom: 1px solid #e8e8e8; border-radius: 0 0 4px 4px; }
  .plan-total { font-size: 11px; font-weight: 600; color: #555; padding: 5px 10px; border-top: 1px solid #f0f0f0; margin-bottom: 2px; }
  .plan-hr { height: 1px; background: #f0f0f0; margin: 12px 0; }
  .plan-textline { font-size: 12px; color: #3c3c43; line-height: 1.6; padding: 2px 0; }
  .edit-textarea { width: 100%; min-height: 500px; padding: 18px; border: none; font-family: monospace; font-size: 12px; color: #1c1c1e; line-height: 1.8; outline: none; resize: none; background: #fafafa; }
  .error-box { margin: 16px; padding: 12px 16px; background: #fff5f5; border: 1px solid #fecaca; border-radius: 10px; font-size: 13px; color: #dc2626; }
  .share-bar { padding: 12px 18px; border-top: 1px solid #f2f2f7; display: flex; align-items: center; gap: 8px; }
  .share-label { font-size: 12px; font-weight: 500; color: #8e8e93; }
  .btn-share { padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; border: none; text-decoration: none; display: inline-block; }
  .btn-share.wp { background: #25d366; color: #fff; }
  .btn-share.tg { background: #0088cc; color: #fff; }
  .btn-share.mail { background: #ff3b30; color: #fff; }
`;

const ALLERGIES = ["Gluten","Laktoz","Fıstık","Yumurta","Balık","Soya"];
const RESTRICTIONS = ["Et yok","Vegan","Helal","Diyabetik","Düşük sodyum"];
const GOALS = ["kilo-verme","kas-yapma","sağlıklı-beslenme","form-koruma","spor-performansı"];
const GOAL_LABELS = {"kilo-verme":"Kilo Verme","kas-yapma":"Kas Yapma","sağlıklı-beslenme":"Sağlıklı Beslenme","form-koruma":"Form Koruma","spor-performansı":"Spor Performansı"};
const ACTIVITIES = ["düşük","orta","aktif","çok aktif"];
const DAYS_TR = ["PAZARTESİ","SALI","ÇARŞAMBA","PERŞEMBE","CUMA","CUMARTESİ","PAZAR","PAZARTESI","CARSAMBA","PERSEMBE","CUMARTESI"];

function cleanText(text) {
  return text
    .replace(/```html/gi, '')
    .replace(/```/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^#{1,4}\s*/gm, '')
    .trim();
}

function buildScreenHTML(planText) {
  const clean = cleanText(planText);
  let html = '';
  const lines = clean.split('\n');
  for (const line of lines) {
    const t = line.trim();
    if (!t) { html += '<div style="height:5px"></div>'; continue; }
    const upper = t.toUpperCase();
    const isDayTitle = DAYS_TR.some(d => upper === d);
    const hasMealKcal = /\(\d+\s*kcal\)/i.test(t);
    const isMealTitle = hasMealKcal && !t.startsWith('-') && !t.startsWith('•');
    const isSectionTitle = !isMealTitle && /^(HASTA|GUNLUK|GÜNLÜK|KAÇIN|KACIN|TAVSİYE|TAVSIYE|SU VE|NOTLAR|DEĞER|DEGER)/i.test(t);
    const isFood = t.startsWith('- ') || t.startsWith('• ') || t.startsWith('* ');
    const isAlt = /^(alternatif|alt\.|not:)/i.test(t);
    const isTotal = /toplam/i.test(t) && /\d/.test(t);
    if (t === '---') { html += '<div class="plan-hr"></div>'; continue; }
    if (isDayTitle) { html += '<div class="plan-day-title">' + t + '</div>'; continue; }
    if (isSectionTitle) { html += '<div class="plan-section-bar">' + t + '</div>'; continue; }
    if (isMealTitle) { html += '<div class="plan-meal-bar">' + t + '</div>'; continue; }
    if (isFood) { html += '<div class="plan-food">' + t.replace(/^[-•*]\s*/, '') + '</div>'; continue; }
    if (isAlt) { html += '<div class="plan-alt">' + t + '</div>'; continue; }
    if (isTotal) { html += '<div class="plan-total">' + t + '</div>'; continue; }
    html += '<div class="plan-textline">' + t + '</div>';
  }
  return html;
}

function buildPDFHTML(planText, form) {
  const clean = cleanText(planText);
  let content = '';
  const lines = clean.split('\n');
  for (const line of lines) {
    const t = line.trim();
    if (!t) { content += '<div style="height:4px"></div>'; continue; }
    const upper = t.toUpperCase();
    const isDayTitle = DAYS_TR.some(d => upper === d);
    const hasMealKcal = /\(\d+\s*kcal\)/i.test(t);
    const isMealTitle = hasMealKcal && !t.startsWith('-') && !t.startsWith('•');
    const isSectionTitle = !isMealTitle && /^(HASTA|GUNLUK|GÜNLÜK|KAÇIN|KACIN|TAVSİYE|TAVSIYE|SU VE|NOTLAR|DEĞER|DEGER)/i.test(t);
    const isFood = t.startsWith('- ') || t.startsWith('• ') || t.startsWith('* ');
    const isAlt = /^(alternatif|alt\.|not:)/i.test(t);
    const isTotal = /toplam/i.test(t) && /\d/.test(t);
    if (t === '---') { content += '<div class="pdf-hr"></div>'; continue; }
    if (isDayTitle) { content += '<div class="pdf-day">' + t + '</div>'; continue; }
    if (isSectionTitle) { content += '<div class="pdf-section">' + t + '</div>'; continue; }
    if (isMealTitle) { content += '<div class="pdf-meal">' + t + '</div>'; continue; }
    if (isFood) { content += '<div class="pdf-food">' + t.replace(/^[-•*]\s*/, '') + '</div>'; continue; }
    if (isAlt) { content += '<div class="pdf-alt">' + t + '</div>'; continue; }
    if (isTotal) { content += '<div class="pdf-total">' + t + '</div>'; continue; }
    content += '<div class="pdf-text">' + t + '</div>';
  }

  const info = [
    form.yas ? form.yas + ' yas' : null,
    form.cinsiyet,
    form.kilo ? form.kilo + ' kg' : null,
    form.boy ? form.boy + ' cm' : null,
    GOAL_LABELS[form.hedef],
    form.kalori + ' kcal/gun'
  ].filter(Boolean).join(' • ');

  const dateStr = new Date().toLocaleDateString('tr-TR', {day:'numeric',month:'long',year:'numeric'});
  const patientName = form.ad || 'Hasta';

  return '<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><style>' +
    '* { box-sizing: border-box; margin: 0; padding: 0; }' +
    'body { font-family: Arial, Helvetica, sans-serif; background: #fff; color: #1a1a1a; padding: 28px 32px; font-size: 11px; line-height: 1.55; }' +
    '.doc-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid #ddd; }' +
    '.doc-label { font-size: 11px; font-weight: 700; color: #2d6a2d; text-transform: uppercase; letter-spacing: 0.06em; }' +
    '.doc-title { font-size: 20px; font-weight: 700; color: #1a1a1a; margin-top: 2px; }' +
    '.doc-right { text-align: right; }' +
    '.doc-brand { font-size: 13px; font-weight: 700; color: #2d6a2d; }' +
    '.doc-site { font-size: 10px; color: #888; }' +
    '.doc-date { font-size: 10px; color: #aaa; margin-top: 3px; }' +
    '.patient-box { background: #f7f7f7; border-radius: 4px; padding: 10px 14px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; }' +
    '.patient-name { font-size: 13px; font-weight: 700; }' +
    '.patient-meta { font-size: 10px; color: #666; margin-top: 2px; }' +
    '.patient-dr { font-size: 10px; color: #888; }' +
    '.pdf-day { font-size: 11px; font-weight: 700; color: #2d6a2d; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 14px; margin-bottom: 5px; padding-bottom: 4px; border-bottom: 1.5px solid #cfe8c9; }' +
    '.pdf-section { background: #cfe8c9; color: #1a4a1a; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 5px 10px; margin-top: 12px; border-radius: 3px 3px 0 0; }' +
    '.pdf-meal { background: #cfe8c9; color: #1a4a1a; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 5px 10px; margin-top: 8px; border-radius: 3px 3px 0 0; }' +
    '.pdf-food { font-size: 11px; color: #333; padding: 3px 10px 3px 18px; background: #fff; border-left: 1px solid #e8e8e8; border-right: 1px solid #e8e8e8; position: relative; }' +
    '.pdf-food::before { content: "•"; position: absolute; left: 8px; color: #2d6a2d; }' +
    '.pdf-alt { font-size: 9px; color: #aaa; font-style: italic; padding: 2px 10px 4px 18px; background: #fff; border-left: 1px solid #e8e8e8; border-right: 1px solid #e8e8e8; border-bottom: 1px solid #e8e8e8; border-radius: 0 0 3px 3px; }' +
    '.pdf-total { font-size: 10px; font-weight: 600; color: #555; padding: 5px 10px; border-top: 1px solid #eee; margin-bottom: 4px; }' +
    '.pdf-text { font-size: 11px; color: #333; padding: 3px 0; }' +
    '.pdf-hr { height: 1px; background: #e0e0e0; margin: 10px 0; }' +
    '.doc-footer { margin-top: 20px; padding-top: 8px; border-top: 1px solid #ddd; display: flex; justify-content: space-between; font-size: 9px; color: #bbb; }' +
    '@media print { body { padding: 16px 20px; } @page { margin: 1cm; size: A4; } }' +
    '</style></head><body>' +
    '<div class="doc-header">' +
    '<div><div class="doc-label">Kisiye Ozel</div><div class="doc-title">DIYET LISTESI</div></div>' +
    '<div class="doc-right"><div class="doc-brand">DiyetPro</div><div class="doc-site">diyetpro.net</div><div class="doc-date">' + dateStr + '</div></div>' +
    '</div>' +
    '<div class="patient-box">' +
    '<div><div class="patient-name">' + patientName + '</div><div class="patient-meta">' + info + '</div></div>' +
    '<div class="patient-dr">Diyetisyen: DiyetPro</div>' +
    '</div>' +
    content +
    '<div class="doc-footer"><span>DiyetPro - diyetpro.net</span><span>Bu plan bilgilendirme amaclidir.</span></div>' +
    '</body></html>';
}

export default function AIPlanUretici() {
  const [form, setForm] = useState({ad:"",yas:"",cinsiyet:"Kadın",kilo:"",boy:"",hedef:"kilo-verme",aktivite:"orta",kalori:"1500",sure:"7",notlar:""});
  const [allergies, setAllergies] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [planText, setPlanText] = useState("");
  const [loadStep, setLoadStep] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedPlan, setEditedPlan] = useState("");

  const toggle = (arr, setArr, val) => setArr(arr.includes(val) ? arr.filter(v=>v!==val) : [...arr, val]);
  const currentPlan = editMode ? editedPlan : planText;

  const handleGenerate = async () => {
    setStatus("loading"); setPlanText(""); setErrorMsg(""); setEditMode(false);
    const steps = ["Profil analiz ediliyor...","Kalori hesaplanıyor...","Plan oluşturuluyor..."];
    let i = 0; setLoadStep(steps[0]);
    const iv = setInterval(()=>{i=(i+1)%steps.length;setLoadStep(steps[i]);},1000);
    try {
      const res = await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,allergies,restrictions})});
      clearInterval(iv);
      const data = await res.json();
      if(!res.ok||data.error){setErrorMsg(data.error||"Hata oluştu");setStatus("error");}
      else{const out=data.output||"Plan üretilemedi.";setPlanText(out);setEditedPlan(out);setStatus("done");}
    } catch(err){clearInterval(iv);setErrorMsg(err.message);setStatus("error");}
  };

  const handlePDF = () => {
    const pdfHTML = buildPDFHTML(currentPlan, form);
    const container = document.createElement('div');
    container.innerHTML = pdfHTML;
    container.style.cssText = 'position:absolute;left:-9999px;top:0;width:210mm;background:#fff;';
    document.body.appendChild(container);
    const opt = {
      margin:[8,8,8,8],
      filename:(form.ad||'hasta')+'-diyet-plani.pdf',
      image:{type:'jpeg',quality:0.98},
      html2canvas:{scale:2,useCORS:true,logging:false},
      jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}
    };
    html2pdf().set(opt).from(container).save().then(()=>{document.body.removeChild(container);});
  };

  const wpLink = "https://wa.me/?text="+encodeURIComponent("DiyetPro tarafindan hazirlanan diyet planiniz hazir!\n\ndiyetpro.net");
  const tgLink = "https://t.me/share/url?url=https://diyetpro.net&text="+encodeURIComponent((form.ad||"Hasta")+" icin diyet plani hazirlandi.");
  const mailLink = "mailto:?subject="+encodeURIComponent("Diyet Planiniz - DiyetPro")+"&body="+encodeURIComponent("Merhaba "+(form.ad||"")+",\n\nDiyet planiniz hazirlanmistir.\n\ndiyetpro.net");

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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:16,height:16}}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            AI Plan Üret
          </div>
          <div className="sidebar-bottom">
            <div className="sidebar-av">DP</div>
            <div><div className="sidebar-user-name">Misafir</div><div className="sidebar-user-role">Premium</div></div>
          </div>
        </div>

        <div className="main">
          <div className="page-header">
            <div className="page-title">AI Plan Üretici</div>
            <div className="page-sub">Hasta bilgilerini gir, saniyeler içinde kişisel plan hazır</div>
          </div>
          <div className="content-grid">
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
                <div className="tags">{GOALS.map(g=><button key={g} type="button" className={"tag"+(form.hedef===g?" on":"")} onClick={()=>setForm({...form,hedef:g})}>{GOAL_LABELS[g]}</button>)}</div>
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
                <div className="tags">{ALLERGIES.map(a=><button key={a} type="button" className={"tag"+(allergies.includes(a)?" on":"")} onClick={()=>toggle(allergies,setAllergies,a)}>{a}</button>)}</div>
              </div>
              <div className="form-section">
                <div className="form-section-title">Kısıtlamalar</div>
                <div className="tags">{RESTRICTIONS.map(r=><button key={r} type="button" className={"tag"+(restrictions.includes(r)?" on":"")} onClick={()=>toggle(restrictions,setRestrictions,r)}>{r}</button>)}</div>
              </div>
              <div className="form-section">
                <div className="field"><label>Ek Notlar</label><textarea placeholder="Özel durumlar, tercihler..." value={form.notlar} onChange={e=>setForm({...form,notlar:e.target.value})} /></div>
                <button type="button" className="btn-generate" onClick={handleGenerate} disabled={status==="loading"}>
                  {status==="loading" ? "Hazırlanıyor..." : "Plan Üret"}
                </button>
              </div>
            </div>

            <div className="output-card">
              {status==="idle" && (
                <div className="output-empty">
                  <div className="empty-icon">📋</div>
                  <div className="empty-title">Plan Bekleniyor</div>
                  <div className="empty-sub">Formu doldurup Plan Üret butonuna bas</div>
                </div>
              )}
              {status==="loading" && (
                <div className="output-loading">
                  <div className="spinner"></div>
                  <div className="loading-label">{loadStep}</div>
                </div>
              )}
              {status==="error" && (
                <div className="error-box">Hata: {errorMsg}</div>
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
                      {editMode ? (
                        <>
                          <button className="btn-sm success" onClick={()=>{setPlanText(editedPlan);setEditMode(false);}}>Kaydet</button>
                          <button className="btn-sm secondary" onClick={()=>{setEditedPlan(planText);setEditMode(false);}}>İptal</button>
                        </>
                      ) : (
                        <>
                          <button className="btn-sm secondary" onClick={()=>setEditMode(true)}>Düzenle</button>
                          <button className="btn-sm secondary" onClick={()=>navigator.clipboard.writeText(currentPlan)}>Kopyala</button>
                          <button className="btn-sm secondary" onClick={handlePDF}>PDF</button>
                          <button className="btn-sm primary" onClick={handleGenerate}>Yenile</button>
                        </>
                      )}
                    </div>
                  </div>
                  {editMode ? (
                    <textarea className="edit-textarea" value={editedPlan} onChange={e=>setEditedPlan(e.target.value)} />
                  ) : (
                    <div className="plan-body" dangerouslySetInnerHTML={{__html: buildScreenHTML(currentPlan)}} />
                  )}
                  {!editMode && (
                    <div className="share-bar">
                      <span className="share-label">Paylaş</span>
                      <a href={wpLink} target="_blank" rel="noreferrer" className="btn-share wp">WhatsApp</a>
                      <a href={tgLink} target="_blank" rel="noreferrer" className="btn-share tg">Telegram</a>
                      <a href={mailLink} className="btn-share mail">E-posta</a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}