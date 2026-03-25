/* eslint-disable */
import { useState } from "react";
import jsPDF from "jspdf";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #f5f2ec; }
  .ap-layout { display: flex; min-height: 100vh; }
  .ap-sidebar { width: 220px; min-height: 100vh; background: #1c3829; padding: 1.5rem 1rem; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; }
  .ap-logo { display: flex; align-items: center; gap: 10px; padding: 0 0.5rem; margin-bottom: 2rem; }
  .ap-logo-mark { width: 32px; height: 32px; border-radius: 8px; background: #a8d5a2; display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 15px; color: #1c3829; font-weight: 500; }
  .ap-logo-text { font-family: 'Fraunces', serif; font-size: 17px; color: #f5f2ec; font-weight: 400; }
  .ap-nav-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,242,236,0.35); padding: 0 0.75rem 0.5rem; }
  .ap-nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; font-size: 13px; color: rgba(245,242,236,0.6); cursor: pointer; margin-bottom: 2px; }
  .ap-nav-item.active { background: rgba(168,213,162,0.15); color: #a8d5a2; }
  .ap-sidebar-bottom { margin-top: auto; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem; display: flex; align-items: center; gap: 10px; }
  .ap-avatar { width: 34px; height: 34px; border-radius: 50%; background: #a8d5a2; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #1c3829; flex-shrink: 0; }
  .ap-user-name { font-size: 13px; color: #f5f2ec; font-weight: 500; }
  .ap-user-role { font-size: 11px; color: rgba(245,242,236,0.4); }
  .ap-main { margin-left: 220px; flex: 1; padding: 2.5rem 2rem; min-height: 100vh; display: flex; flex-direction: column; }
  .ap-header { margin-bottom: 2rem; }
  .ap-header h1 { font-family: 'Fraunces', serif; font-size: 1.8rem; font-weight: 300; color: #1c3829; letter-spacing: -0.02em; }
  .ap-header p { font-size: 13px; color: #8a8378; margin-top: 5px; }
  .ap-grid { display: grid; grid-template-columns: 400px 1fr; gap: 20px; align-items: start; flex: 1; }
  .ap-card { background: #fff; border: 1px solid #e8e4dc; border-radius: 18px; overflow: hidden; }
  .ap-card-head { padding: 1.25rem 1.5rem; border-bottom: 1px solid #f0ece4; }
  .ap-card-head h2 { font-size: 14px; font-weight: 600; color: #1c3829; }
  .ap-card-head p { font-size: 12px; color: #a09890; margin-top: 2px; }
  .ap-card-body { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 14px; }
  .ap-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .ap-row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
  .ap-field label { display: block; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #7a746e; margin-bottom: 5px; }
  .ap-field input, .ap-field select, .ap-field textarea { width: 100%; padding: 10px 12px; border: 1.5px solid #e4dfd5; border-radius: 10px; background: #faf9f6; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1c3829; outline: none; transition: border-color 0.15s; appearance: none; resize: vertical; }
  .ap-field input:focus, .ap-field select:focus { border-color: #1c3829; }
  .ap-field textarea { min-height: 70px; }
  .ap-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .ap-tag { padding: 5px 12px; border-radius: 100px; border: 1.5px solid #e4dfd5; background: #faf9f6; font-size: 12px; color: #6b6560; cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
  .ap-tag.on { border-color: #1c3829; background: #1c3829; color: #f5f2ec; }
  .ap-divider { height: 1px; background: #f0ece4; margin: 2px 0; }
  .ap-btn { width: 100%; padding: 13px; border: none; border-radius: 12px; background: #1c3829; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; color: #f5f2ec; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .ap-btn:hover:not(:disabled) { background: #234a33; }
  .ap-btn:disabled { opacity: 0.55; cursor: not-allowed; }
  .ap-output-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 500px; padding: 3rem; text-align: center; }
  .ap-empty-icon { font-size: 3rem; margin-bottom: 1rem; opacity: 0.2; }
  .ap-empty-title { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 300; color: #1c3829; margin-bottom: 6px; }
  .ap-empty-sub { font-size: 13px; color: #b5afa7; line-height: 1.6; max-width: 280px; }
  .ap-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 500px; padding: 3rem; gap: 1.5rem; }
  .ap-spinner { width: 44px; height: 44px; border-radius: 50%; border: 2px solid #e8e4dc; border-top-color: #1c3829; animation: ap-spin 0.75s linear infinite; }
  @keyframes ap-spin { to { transform: rotate(360deg); } }
  .ap-load-step { font-size: 13px; color: #8a8378; text-align: center; }
  .ap-load-step strong { display: block; font-size: 15px; color: #1c3829; font-weight: 500; margin-bottom: 4px; font-family: 'Fraunces', serif; }
  .ap-output-head { padding: 1.25rem 1.5rem; border-bottom: 1px solid #f0ece4; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
  .ap-pills { display: flex; gap: 6px; flex-wrap: wrap; }
  .ap-pill { padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; }
  .ap-pill.green { background: #eaf4e3; color: #3a6b1e; }
  .ap-pill.blue { background: #e3eef9; color: #1a5490; }
  .ap-pill.amber { background: #fdf0d9; color: #8a5a00; }
  .ap-actions { display: flex; gap: 8px; flex-wrap: wrap; }
  .ap-action-btn { padding: 7px 14px; border-radius: 9px; font-size: 12px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.15s; }
  .ap-action-btn.outline { border: 1.5px solid #e4dfd5; background: #fff; color: #1c3829; }
  .ap-action-btn.outline:hover { border-color: #1c3829; }
  .ap-action-btn.solid { border: none; background: #1c3829; color: #f5f2ec; }
  .ap-action-btn.wp { border: none; background: #25D366; color: #fff; }
  .ap-action-btn.tg { border: none; background: #0088cc; color: #fff; }
  .ap-action-btn.mail { border: none; background: #ea4335; color: #fff; }
  .ap-plan-body { padding: 1.5rem; overflow-y: auto; max-height: 580px; }
  .ap-plan-text h1 { font-family: 'Fraunces', serif; font-size: 1.15rem; color: #1c3829; margin: 1.2rem 0 0.5rem; font-weight: 400; }
  .ap-plan-text h2 { font-size: 0.95rem; font-weight: 700; color: #1c3829; margin: 1.2rem 0 0.4rem; border-bottom: 1px solid #f0ece4; padding-bottom: 4px; }
  .ap-plan-text h3 { font-size: 0.88rem; font-weight: 600; color: #4a7c59; margin: 1rem 0 0.3rem; }
  .ap-plan-text p { font-size: 13.5px; color: #3a3730; line-height: 1.85; margin-bottom: 6px; }
  .ap-plan-text strong { font-weight: 600; color: #1c3829; }
  .ap-plan-text ul { padding-left: 1.2rem; margin: 0.4rem 0; }
  .ap-plan-text li { font-size: 13.5px; color: #3a3730; margin-bottom: 4px; line-height: 1.7; }
  .ap-plan-text hr { border: none; border-top: 1px solid #f0ece4; margin: 1rem 0; }
  .ap-plan-text table { width: 100%; border-collapse: collapse; margin: 0.75rem 0; font-size: 13px; }
  .ap-plan-text th { background: #f5f2ec; padding: 8px 12px; text-align: left; font-weight: 600; color: #1c3829; border: 1px solid #e8e4dc; }
  .ap-plan-text td { padding: 7px 12px; border: 1px solid #e8e4dc; color: #3a3730; }
  .ap-error { padding: 1.5rem; }
  .ap-error-box { background: #fff5f5; border: 1px solid #fecdcd; border-radius: 12px; padding: 1rem 1.25rem; }
  .ap-error-box p { font-size: 13px; color: #c53030; }
  .share-section { padding: 1rem 1.5rem; border-top: 1px solid #f0ece4; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .share-label { font-size: 12px; color: #8a8378; font-weight: 500; margin-right: 4px; }
`;

const ALLERGIES = ["Gluten","Laktoz","Fıstık","Yumurta","Balık","Soya"];
const RESTRICTIONS = ["Et yok","Vegan","Helal","Diyabetik","Düşük sodyum"];
const GOALS = ["kilo-verme","kas-yapma","sağlıklı-beslenme","form-koruma","spor-performansı"];
const GOAL_LABELS = {"kilo-verme":"Kilo Verme","kas-yapma":"Kas Yapma","sağlıklı-beslenme":"Sağlıklı Beslenme","form-koruma":"Form Koruma","spor-performansı":"Spor Performansı"};
const ACTIVITIES = ["düşük","orta","aktif","çok aktif"];

function parseMarkdown(text) {
  return text
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.*?)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    .replace(/---/g, '<hr/>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul]|<hr)(.+)$/gm, '<p>$1</p>');
}

export default function AIPlanUretici() {
  const [form, setForm] = useState({
    ad:"", yas:"", cinsiyet:"Kadın", kilo:"", boy:"",
    hedef:"kilo-verme", aktivite:"orta", kalori:"1500", sure:"7", notlar:""
  });
  const [allergies, setAllergies] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [planText, setPlanText] = useState("");
  const [loadStep, setLoadStep] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);

  const handleGenerate = async () => {
    setStatus("loading");
    setPlanText("");
    setErrorMsg("");
    const steps = ["Profil analiz ediliyor...","Kalori hesaplanıyor...","DiyetPro veritabanı taranıyor...","Plan oluşturuluyor..."];
    let i = 0;
    setLoadStep(steps[0]);
    const interval = setInterval(() => { i = (i + 1) % steps.length; setLoadStep(steps[i]); }, 1000);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, allergies, restrictions })
      });
      clearInterval(interval);
      const data = await res.json();
      if (!res.ok || data.error) { setErrorMsg(data.error || "Sunucu hatası"); setStatus("error"); }
      else { setPlanText(data.output || "Plan üretilemedi."); setStatus("done"); }
    } catch (err) {
      clearInterval(interval);
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxW = pageW - margin * 2;
    let y = 20;

    // Header - Logo alanı
    doc.setFillColor(28, 56, 41);
    doc.rect(0, 0, pageW, 30, "F");

    // Logo text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(168, 213, 162);
    doc.text("DiyetPro", margin, 19);

    // Sağda tarih
    doc.setFontSize(9);
    doc.setTextColor(200, 230, 200);
    doc.text(new Date().toLocaleDateString("tr-TR"), pageW - margin, 19, { align: "right" });

    y = 42;

    // Hasta bilgileri kutusu
    doc.setFillColor(245, 242, 236);
    doc.roundedRect(margin, y - 6, maxW, 22, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(28, 56, 41);
    doc.text(form.ad || "Hasta", margin + 6, y + 4);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(90, 86, 80);
    const bilgi = [
      form.yas ? `Yaş: ${form.yas}` : null,
      form.cinsiyet,
      form.kilo ? `${form.kilo} kg` : null,
      form.boy ? `${form.boy} cm` : null,
      GOAL_LABELS[form.hedef],
      `${form.kalori} kcal`,
    ].filter(Boolean).join("  |  ");
    doc.text(bilgi, margin + 6, y + 12);
    y += 30;

    // Plan içeriği - markdown temizle
    const clean = planText
      .replace(/#{1,3} /g, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/---/g, "─────────────────────────")
      .replace(/\|/g, " ")
      .replace(/^[-•] /gm, "• ");

    const lines = clean.split("\n").filter(l => l.trim() !== "");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) { y += 4; continue; }

      // Başlık satırları
      const isHeader = trimmed.startsWith("HASTA") || trimmed.startsWith("GÜNLÜK") ||
        trimmed.startsWith("PAZARTESİ") || trimmed.startsWith("SALI") ||
        trimmed.startsWith("ÇARŞAMBA") || trimmed.startsWith("PERŞEMBE") ||
        trimmed.startsWith("CUMA") || trimmed.startsWith("CUMARTESİ") ||
        trimmed.startsWith("PAZAR") || trimmed.startsWith("KAHVALTI") ||
        trimmed.startsWith("ÖĞLE") || trimmed.startsWith("AKŞAM") ||
        trimmed.startsWith("KAÇ") || trimmed.startsWith("TAVSİYE") ||
        trimmed.startsWith("SU") || trimmed.startsWith("EGZERSİZ") ||
        trimmed.includes("TOPLAM") || trimmed.startsWith("─────");

      if (isHeader) {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(28, 56, 41);
        doc.text(trimmed, margin, y);
        y += 6;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(40, 40, 40);
      } else {
        const wrapped = doc.splitTextToSize(trimmed, maxW);
        for (const wl of wrapped) {
          if (y > 275) { doc.addPage(); y = 20; }
          doc.setFontSize(9.5);
          doc.text(wl, margin, y);
          y += 5.5;
        }
      }
    }

    // Footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFillColor(245, 242, 236);
      doc.rect(0, 287, pageW, 10, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(138, 131, 120);
      doc.text("DiyetPro — diyetpro.net", margin, 293);
      doc.text(`Sayfa ${p} / ${totalPages}`, pageW - margin, 293, { align: "right" });
    }

    doc.save(`${form.ad || "hasta"}-diyet-plani.pdf`);
  };

  const planOzeti = planText.substring(0, 300) + "...";
  const wpLink = `https://wa.me/?text=${encodeURIComponent("DiyetPro tarafından hazırlanan diyet planınız:\n\n" + planOzeti)}`;
  const tgLink = `https://t.me/share/url?url=https://diyetpro.net&text=${encodeURIComponent("Diyet planınız hazır!")}`;
  const mailLink = `mailto:?subject=${encodeURIComponent("Diyet Planınız - DiyetPro")}&body=${encodeURIComponent("Merhaba " + (form.ad || "") + ",\n\nDiyet planınız hazırlanmıştır:\n\n" + planText)}`;

  return (
    <>
      <style>{styles}</style>
      <div className="ap-layout">
        <div className="ap-sidebar">
          <div className="ap-logo">
            <div className="ap-logo-mark">DP</div>
            <span className="ap-logo-text">DiyetPro</span>
          </div>
          <div className="ap-nav-label">Uygulama</div>
          <div className="ap-nav-item active">◈ AI Plan Üret</div>
          <div className="ap-sidebar-bottom">
            <div className="ap-avatar">DP</div>
            <div>
              <div className="ap-user-name">Misafir</div>
              <div className="ap-user-role">Premium Üye</div>
            </div>
          </div>
        </div>

        <div className="ap-main">
          <div className="ap-header">
            <h1>✦ AI Plan Üretici</h1>
            <p>Hasta bilgilerini gir, yapay zeka saniyeler içinde kişiselleştirilmiş diyet planını oluştursun</p>
          </div>

          <div className="ap-grid">
            <div className="ap-card">
              <div className="ap-card-head">
                <h2>Hasta Bilgileri</h2>
                <p>Tüm alanları doldurarak daha iyi sonuç alın</p>
              </div>
              <div className="ap-card-body">
                <div className="ap-row2">
                  <div className="ap-field"><label>Ad Soyad</label><input placeholder="Ayşe Kaya" value={form.ad} onChange={e=>setForm({...form,ad:e.target.value})} /></div>
                  <div className="ap-field"><label>Yaş</label><input type="number" placeholder="32" value={form.yas} onChange={e=>setForm({...form,yas:e.target.value})} /></div>
                </div>
                <div className="ap-row3">
                  <div className="ap-field"><label>Cinsiyet</label><select value={form.cinsiyet} onChange={e=>setForm({...form,cinsiyet:e.target.value})}><option>Kadın</option><option>Erkek</option></select></div>
                  <div className="ap-field"><label>Kilo (kg)</label><input type="number" placeholder="68" value={form.kilo} onChange={e=>setForm({...form,kilo:e.target.value})} /></div>
                  <div className="ap-field"><label>Boy (cm)</label><input type="number" placeholder="165" value={form.boy} onChange={e=>setForm({...form,boy:e.target.value})} /></div>
                </div>
                <div className="ap-divider" />
                <div className="ap-field">
                  <label>Hedef</label>
                  <div className="ap-tags">
                    {GOALS.map(g=><button key={g} type="button" className={`ap-tag ${form.hedef===g?"on":""}`} onClick={()=>setForm({...form,hedef:g})}>{GOAL_LABELS[g]}</button>)}
                  </div>
                </div>
                <div className="ap-row3">
                  <div className="ap-field"><label>Aktivite</label><select value={form.aktivite} onChange={e=>setForm({...form,aktivite:e.target.value})}>{ACTIVITIES.map(a=><option key={a}>{a}</option>)}</select></div>
                  <div className="ap-field"><label>Kalori (kcal)</label><input type="number" placeholder="1500" value={form.kalori} onChange={e=>setForm({...form,kalori:e.target.value})} /></div>
                  <div className="ap-field"><label>Süre (gün)</label><input type="number" placeholder="7" value={form.sure} onChange={e=>setForm({...form,sure:e.target.value})} /></div>
                </div>
                <div className="ap-divider" />
                <div className="ap-field">
                  <label>Alerjiler</label>
                  <div className="ap-tags">
                    {ALLERGIES.map(a=><button key={a} type="button" className={`ap-tag ${allergies.includes(a)?"on":""}`} onClick={()=>toggle(allergies,setAllergies,a)}>{a}</button>)}
                  </div>
                </div>
                <div className="ap-field">
                  <label>Kısıtlamalar</label>
                  <div className="ap-tags">
                    {RESTRICTIONS.map(r=><button key={r} type="button" className={`ap-tag ${restrictions.includes(r)?"on":""}`} onClick={()=>toggle(restrictions,setRestrictions,r)}>{r}</button>)}
                  </div>
                </div>
                <div className="ap-field"><label>Ek Notlar</label><textarea placeholder="Örn: Hasta ofiste çalışıyor, öğle arası kısa..." value={form.notlar} onChange={e=>setForm({...form,notlar:e.target.value})} /></div>
                <button type="button" className="ap-btn" onClick={handleGenerate} disabled={status==="loading"}>
                  {status==="loading" ? "⏳ Üretiliyor..." : "✦ AI ile Plan Üret"}
                </button>
              </div>
            </div>

            <div className="ap-card">
              {status==="idle" && (
                <div className="ap-output-empty">
                  <div className="ap-empty-icon">◈</div>
                  <div className="ap-empty-title">Plan Burada Görünecek</div>
                  <div className="ap-empty-sub">Hasta bilgilerini doldurup "AI ile Plan Üret" butonuna tıklayın</div>
                </div>
              )}
              {status==="loading" && (
                <div className="ap-loading">
                  <div className="ap-spinner"></div>
                  <div className="ap-load-step"><strong>Plan Hazırlanıyor</strong>{loadStep}</div>
                </div>
              )}
              {status==="error" && (
                <div className="ap-error"><div className="ap-error-box"><p>⚠️ {errorMsg}</p></div></div>
              )}
              {status==="done" && (
                <>
                  <div className="ap-output-head">
                    <div className="ap-pills">
                      <span className="ap-pill green">{GOAL_LABELS[form.hedef]}</span>
                      <span className="ap-pill blue">{form.kalori} kcal</span>
                      <span className="ap-pill amber">{form.sure} gün</span>
                    </div>
                    <div className="ap-actions">
                      <button className="ap-action-btn outline" onClick={()=>navigator.clipboard.writeText(planText)}>Kopyala</button>
                      <button className="ap-action-btn outline" onClick={handlePDF}>PDF İndir</button>
                      <button className="ap-action-btn solid" onClick={handleGenerate}>Yenile</button>
                    </div>
                  </div>
                  <div className="ap-plan-body">
                    <div className="ap-plan-text" dangerouslySetInnerHTML={{__html: parseMarkdown(planText)}} />
                  </div>
                  <div className="share-section">
                    <span className="share-label">Paylaş:</span>
                    <a href={wpLink} target="_blank" rel="noreferrer" className="ap-action-btn wp">WhatsApp</a>
                    <a href={tgLink} target="_blank" rel="noreferrer" className="ap-action-btn tg">Telegram</a>
                    <a href={mailLink} className="ap-action-btn mail">E-posta</a>
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