/* eslint-disable */
'use client';
import { useState } from "react";

const ALLERGIES = ["Gluten","Laktoz","Fıstık","Yumurta","Balık","Soya"];
const RESTRICTIONS = ["Et yok","Vegan","Helal","Diyabetik","Düşük sodyum"];
const HEDEFLER = ["Kilo verme","Kilo alma","Kas yapma","Sağlıklı beslenme","Form koruma"];
const AKTIVITELER = ["Sedanter (hareketsiz)","Hafif aktif","Orta aktif","Çok aktif"];

export default function AIPlanUretici() {
  const [form, setForm] = useState({
    ad:"", yas:"", cinsiyet:"Kadın", kilo:"", boy:"",
    hedef:"Kilo verme", aktivite:"Orta aktif", kalori:"1500", sure:"7", notlar:""
  });
  const [allergies, setAllergies] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [output, setOutput] = useState("");
  const [loadStep, setLoadStep] = useState("");

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);

  const handleGenerate = async () => {
    setStatus("loading");
    setOutput("");
    const steps = [
      "Profil analiz ediliyor...",
      "Kalori hesaplanıyor...",
      "DiyetPro veritabanı taranıyor...",
      "Plan oluşturuluyor..."
    ];
    let i = 0;
    setLoadStep(steps[0]);
    const interval = setInterval(() => {
      i = (i + 1) % steps.length;
      setLoadStep(steps[i]);
    }, 900);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, allergies, restrictions })
      });
      const data = await res.json();
      clearInterval(interval);
      if (data.error) {
        setOutput("Hata: " + data.error);
      } else {
        setOutput(data.output || "Plan üretilemedi.");
      }
      setStatus("done");
    } catch (err) {
      clearInterval(interval);
      setOutput("Bağlantı hatası: " + err.message);
      setStatus("done");
    }
  };

  const s = {
    wrap: { display:"flex", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", background:"#f5f2ec" },
    sidebar: { width:220, background:"#1c3829", padding:"1.5rem 1rem", display:"flex", flexDirection:"column", gap:"1.5rem", position:"fixed", top:0, left:0, bottom:0 },
    logo: { display:"flex", alignItems:"center", gap:10 },
    logoMark: { width:34, height:34, borderRadius:8, background:"#a8d5a2", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:"#1c3829", fontSize:14 },
    logoText: { color:"#f5f2ec", fontSize:17, fontWeight:500 },
    navItem: { display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10, color:"#a8d5a2", background:"rgba(168,213,162,0.15)", fontSize:14, cursor:"pointer" },
    sideUser: { marginTop:"auto", borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:"1rem", display:"flex", alignItems:"center", gap:10 },
    avatar: { width:36, height:36, borderRadius:"50%", background:"#a8d5a2", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:600, color:"#1c3829", fontSize:13 },
    main: { marginLeft:220, padding:"2rem", flex:1, maxWidth:1100 },
    title: { fontSize:26, fontWeight:300, color:"#1c3829", marginBottom:4 },
    sub: { fontSize:13, color:"#8a8378", marginBottom:"1.5rem" },
    grid: { display:"grid", gridTemplateColumns:"420px 1fr", gap:20, alignItems:"start" },
    card: { background:"#fff", border:"1px solid #e8e4dc", borderRadius:16, overflow:"hidden" },
    cardHead: { padding:"1rem 1.5rem", borderBottom:"1px solid #e8e4dc" },
    cardTitle: { fontSize:15, fontWeight:600, color:"#1c3829" },
    cardBody: { padding:"1.25rem 1.5rem" },
    label: { display:"block", fontSize:11, fontWeight:600, color:"#5a5650", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:5 },
    input: { width:"100%", padding:"10px 13px", border:"1.5px solid #ddd9d0", borderRadius:10, background:"#faf9f6", fontFamily:"inherit", fontSize:14, color:"#1c3829", outline:"none", boxSizing:"border-box" },
    select: { width:"100%", padding:"10px 13px", border:"1.5px solid #ddd9d0", borderRadius:10, background:"#faf9f6", fontFamily:"inherit", fontSize:14, color:"#1c3829", outline:"none", appearance:"none" },
    textarea: { width:"100%", padding:"10px 13px", border:"1.5px solid #ddd9d0", borderRadius:10, background:"#faf9f6", fontFamily:"inherit", fontSize:14, color:"#1c3829", outline:"none", resize:"vertical", minHeight:70, boxSizing:"border-box" },
    row2: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:"1rem" },
    row3: { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:"1rem" },
    field: { marginBottom:"1rem" },
    toggleGroup: { display:"flex", flexWrap:"wrap", gap:6 },
    toggleOn: { padding:"6px 14px", borderRadius:100, border:"1.5px solid #1c3829", background:"#1c3829", color:"#f5f2ec", fontSize:12, cursor:"pointer", fontFamily:"inherit" },
    toggleOff: { padding:"6px 14px", borderRadius:100, border:"1.5px solid #ddd9d0", background:"#faf9f6", color:"#5a5650", fontSize:12, cursor:"pointer", fontFamily:"inherit" },
    btnGenerate: { width:"100%", padding:"14px", border:"none", borderRadius:12, background:"#1c3829", color:"#f5f2ec", fontSize:15, fontWeight:600, cursor:"pointer", marginTop:"0.75rem", fontFamily:"inherit" },
    btnDisabled: { width:"100%", padding:"14px", border:"none", borderRadius:12, background:"#1c3829", color:"#f5f2ec", fontSize:15, fontWeight:600, cursor:"not-allowed", marginTop:"0.75rem", fontFamily:"inherit", opacity:0.6 },
    emptyBox: { display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"4rem 2rem", textAlign:"center", minHeight:400, color:"#b5b0a7" },
    loadBox: { display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:400, gap:"1rem" },
    spinner: { width:40, height:40, border:"3px solid #e8e4dc", borderTopColor:"#1c3829", borderRadius:"50%", animation:"spin 0.8s linear infinite" },
    planBox: { padding:"1.5rem", overflowY:"auto", maxHeight:700, whiteSpace:"pre-wrap", fontSize:14, color:"#2a2723", lineHeight:1.85 },
    footer: { marginTop:"2rem", paddingTop:"1.5rem", borderTop:"1px solid #e8e4dc", textAlign:"center", fontSize:12, color:"#8a8378" },
    footerLinks: { display:"flex", justifyContent:"center", gap:15, marginTop:8 },
    footerLink: { color:"#1c3829", textDecoration:"none", opacity:0.7 }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus, select:focus, textarea:focus { border-color: #1c3829 !important; }
      `}</style>
      <div style={s.wrap}>
        {/* Sidebar */}
        <div style={s.sidebar}>
          <div style={s.logo}>
            <div style={s.logoMark}>DP</div>
            <span style={s.logoText}>DiyetPro AI</span>
          </div>
          <div>
            <div style={{ fontSize:10, color:"rgba(245,242,236,0.35)", letterSpacing:"0.1em", textTransform:"uppercase", padding:"0 12px", marginBottom:6 }}>Uygulama</div>
            <div style={s.navItem}>◈ AI Plan Üret</div>
          </div>
          <div style={s.sideUser}>
            <div style={s.avatar}>DP</div>
            <div>
              <div style={{ fontSize:13, fontWeight:500, color:"#f5f2ec" }}>Misafir Kullanıcı</div>
              <div style={{ fontSize:11, color:"rgba(245,242,236,0.4)" }}>Premium Üye</div>
            </div>
          </div>
        </div>

        {/* Main */}
        <div style={s.main}>
          <h1 style={s.title}>✦ AI Plan Üretici</h1>
          <p style={s.sub}>Hasta bilgilerini gir, yapay zeka ile saniyeler içinde kişisel diyet planı oluştur</p>

          <div style={s.grid}>
            {/* Form */}
            <div style={s.card}>
              <div style={s.cardHead}><span style={s.cardTitle}>Hasta Bilgileri</span></div>
              <div style={s.cardBody}>
                <div style={s.row2}>
                  <div style={s.field}>
                    <label style={s.label}>Ad Soyad</label>
                    <input style={s.input} placeholder="Ayşe Kaya" value={form.ad} onChange={e => setForm({...form, ad:e.target.value})} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Yaş</label>
                    <input style={s.input} type="number" placeholder="32" value={form.yas} onChange={e => setForm({...form, yas:e.target.value})} />
                  </div>
                </div>

                <div style={s.row3}>
                  <div style={s.field}>
                    <label style={s.label}>Cinsiyet</label>
                    <select style={s.select} value={form.cinsiyet} onChange={e => setForm({...form, cinsiyet:e.target.value})}>
                      <option>Kadın</option>
                      <option>Erkek</option>
                    </select>
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Kilo (kg)</label>
                    <input style={s.input} type="number" placeholder="65" value={form.kilo} onChange={e => setForm({...form, kilo:e.target.value})} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Boy (cm)</label>
                    <input style={s.input} type="number" placeholder="165" value={form.boy} onChange={e => setForm({...form, boy:e.target.value})} />
                  </div>
                </div>

                <div style={s.row2}>
                  <div style={s.field}>
                    <label style={s.label}>Hedef</label>
                    <select style={s.select} value={form.hedef} onChange={e => setForm({...form, hedef:e.target.value})}>
                      {HEDEFLER.map(h => <option key={h}>{h}</option>)}
                    </select>
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Aktivite</label>
                    <select style={s.select} value={form.aktivite} onChange={e => setForm({...form, aktivite:e.target.value})}>
                      {AKTIVITELER.map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                </div>

                <div style={s.row2}>
                  <div style={s.field}>
                    <label style={s.label}>Günlük Kalori</label>
                    <input style={s.input} type="number" placeholder="1500" value={form.kalori} onChange={e => setForm({...form, kalori:e.target.value})} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Süre (gün)</label>
                    <input style={s.input} type="number" placeholder="7" value={form.sure} onChange={e => setForm({...form, sure:e.target.value})} />
                  </div>
                </div>

                <div style={s.field}>
                  <label style={s.label}>Alerjiler</label>
                  <div style={s.toggleGroup}>
                    {ALLERGIES.map(a => (
                      <button key={a} type="button"
                        style={allergies.includes(a) ? s.toggleOn : s.toggleOff}
                        onClick={() => toggle(allergies, setAllergies, a)}>{a}</button>
                    ))}
                  </div>
                </div>

                <div style={s.field}>
                  <label style={s.label}>Kısıtlamalar</label>
                  <div style={s.toggleGroup}>
                    {RESTRICTIONS.map(r => (
                      <button key={r} type="button"
                        style={restrictions.includes(r) ? s.toggleOn : s.toggleOff}
                        onClick={() => toggle(restrictions, setRestrictions, r)}>{r}</button>
                    ))}
                  </div>
                </div>

                <div style={s.field}>
                  <label style={s.label}>Ek Notlar</label>
                  <textarea style={s.textarea} placeholder="Örn: Hasta ofiste çalışıyor, öğle yemeğine 30dk var..." value={form.notlar} onChange={e => setForm({...form, notlar:e.target.value})} />
                </div>

                <button
                  type="button"
                  style={status === "loading" ? s.btnDisabled : s.btnGenerate}
                  onClick={handleGenerate}
                  disabled={status === "loading"}>
                  {status === "loading" ? "⏳ Plan Üretiliyor..." : "✦ AI ile Plan Üret"}
                </button>
              </div>
            </div>

            {/* Output */}
            <div style={s.card}>
              {status === "idle" && (
                <div style={s.emptyBox}>
                  <div style={{ fontSize:48, marginBottom:12 }}>◈</div>
                  <div style={{ fontSize:16, fontWeight:500, color:"#1c3829", marginBottom:6 }}>Plan Hazır Değil</div>
                  <div style={{ fontSize:13 }}>Hasta bilgilerini doldurun ve "AI ile Plan Üret" butonuna tıklayın</div>
                </div>
              )}
              {status === "loading" && (
                <div style={s.loadBox}>
                  <div style={s.spinner}></div>
                  <div style={{ fontSize:14, color:"#8a8378" }}>{loadStep}</div>
                  <div style={{ fontSize:12, color:"#a8d5a2", fontWeight:500 }}>Bu işlem 10-20 saniye sürebilir</div>
                </div>
              )}
              {status === "done" && (
                <>
                  <div style={{ padding:"1rem 1.5rem", borderBottom:"1px solid #e8e4dc", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontSize:15, fontWeight:600, color:"#1c3829" }}>📋 {form.ad || "Hasta"} - Diyet Planı</span>
                    <button