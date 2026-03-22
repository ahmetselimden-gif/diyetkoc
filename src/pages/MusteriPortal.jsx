import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { min-height: 100vh; font-family: 'DM Sans', sans-serif; background: #f5f2ec; display: flex; justify-content: center; }
  .phone-wrap { width: 100%; max-width: 420px; min-height: 100vh; background: #f5f2ec; display: flex; flex-direction: column; }
  .topbar { background: #1c3829; padding: 1.25rem 1.25rem 1rem; }
  .topbar-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
  .greeting { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 300; color: #f5f2ec; }
  .greeting span { color: #a8d5a2; }
  .notif-btn { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; }
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
  .card-action { font-size: 12px; color: #8a8378; cursor: pointer; }
  .day-tabs { display: flex; gap: 6px; padding: 1rem 1.25rem 0.5rem; overflow-x: auto; }
  .day-tab { flex-shrink: 0; padding: 6px 14px; border-radius: 100px; font-size: 12px; cursor: pointer; border: 1.5px solid #e8e4dc; color: #8a8378; background: #faf9f6; }
  .day-tab.active { background: #1c3829; color: #f5f2ec; border-color: #1c3829; }
  .meal-list { padding: 0.5rem 0 0.75rem; }
  .meal-item { display: flex; gap: 12px; padding: 12px 1.25rem; border-bottom: 0.5px solid #f5f2ec; }
  .meal-item:last-child { border-bottom: none; }
  .meal-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .meal-icon.kahvalti { background: #FAEEDA; }
  .meal-icon.ara { background: #EAF3DE; }
  .meal-icon.ogle { background: #E6F1FB; }
  .meal-icon.aksam { background: #EEEDFE; }
  .meal-body { flex: 1; }
  .meal-name { font-size: 13px; font-weight: 500; color: #1c3829; margin-bottom: 3px; }
  .meal-desc { font-size: 12px; color: #8a8378; line-height: 1.5; }
  .meal-kcal { font-size: 12px; color: #b5b0a7; margin-top: 3px; }
  .meal-check { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid #e8e4dc; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; margin-top: 6px; font-size: 12px; }
  .meal-check.done { background: #1c3829; border-color: #1c3829; color: #f5f2ec; }
  .water-row { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; }
  .water-left { display: flex; align-items: center; gap: 10px; }
  .water-icon { font-size: 24px; }
  .water-info .label { font-size: 13px; font-weight: 500; color: #1c3829; }
  .water-info .sub { font-size: 12px; color: #8a8378; }
  .water-glasses { display: flex; gap: 4px; }
  .glass { width: 20px; height: 26px; border-radius: 3px; border: 1.5px solid #e8e4dc; background: #faf9f6; cursor: pointer; }
  .glass.filled { background: #185FA5; border-color: #185FA5; }
  .olcum-form { padding: 1.25rem; }
  .olcum-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
  .olcum-field label { display: block; font-size: 11px; color: #8a8378; margin-bottom: 4px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
  .olcum-field input { width: 100%; padding: 10px 12px; border: 1.5px solid #e8e4dc; border-radius: 9px; background: #faf9f6; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1c3829; outline: none; }
  .btn-save { width: 100%; padding: 12px; background: #1c3829; color: #f5f2ec; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; }
  .saved-msg { text-align: center; padding: 8px; font-size: 13px; color: #3B6D11; font-weight: 500; }
  .progress-list { padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 12px; }
  .progress-week { display: flex; align-items: center; gap: 12px; }
  .pw-label { font-size: 12px; color: #8a8378; min-width: 55px; }
  .pw-bar-wrap { flex: 1; background: #e8e4dc; border-radius: 4px; height: 8px; overflow: hidden; }
  .pw-bar { height: 100%; border-radius: 4px; background: #1c3829; }
  .pw-val { font-size: 12px; font-weight: 500; color: #1c3829; min-width: 50px; text-align: right; }
  .change-badge { display: inline-block; padding: 2px 8px; border-radius: 100px; font-size: 11px; }
  .change-badge.down { background: #EAF3DE; color: #3B6D11; }
  .notes-list { padding: 0.75rem 1.25rem 1rem; display: flex; flex-direction: column; gap: 10px; }
  .note-item { background: #f5f2ec; border-radius: 10px; padding: 12px; }
  .note-text { font-size: 13px; color: #3a3732; line-height: 1.6; }
  .note-from { font-size: 11px; color: #8a8378; margin-top: 5px; }
  .bottom-nav { background: #fff; border-top: 0.5px solid #e8e4dc; display: flex; padding: 10px 0; }
  .nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 6px; cursor: pointer; }
  .nav-btn-icon { font-size: 20px; }
  .nav-btn-label { font-size: 10px; color: #8a8378; }
  .nav-btn.active .nav-btn-label { color: #1c3829; font-weight: 500; }
`;

const days = ["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"];
const meals = [
  { type:"kahvalti", icon:"🌅", name:"Kahvaltı", desc:"2 haşlama yumurta, 1 dilim tam buğday ekmek, beyaz peynir, domates", kcal:"350 kcal" },
  { type:"ara", icon:"🍎", name:"Ara Öğün", desc:"1 elma, 5 adet ceviz", kcal:"180 kcal" },
  { type:"ogle", icon:"☀️", name:"Öğle", desc:"Mercimek çorbası, ızgara tavuk göğsü (120g), mevsim salatası", kcal:"400 kcal" },
  { type:"ara", icon:"🥛", name:"Ara Öğün", desc:"1 kase yoğurt, tarçın", kcal:"120 kcal" },
  { type:"aksam", icon:"🌙", name:"Akşam", desc:"Fırın sebze, bulgur pilavı, cacık", kcal:"450 kcal" },
];
const progressData = [
  { label:"1. Hafta", kilo:"72.4 kg", change:"-0.8", pct:15 },
  { label:"2. Hafta", kilo:"71.6 kg", change:"-0.8", pct:30 },
  { label:"3. Hafta", kilo:"71.0 kg", change:"-0.6", pct:45 },
  { label:"4. Hafta", kilo:"70.3 kg", change:"-0.7", pct:62 },
];
const notes = [
  { text:"Harika gidiyorsun Ayşe! Bu hafta su içimini artırmaya çalış, en az 2.5 litre olsun.", from:"Dyt. Yılmaz • 2 gün önce" },
  { text:"Egzersiz günlerinde ara öğün olarak muz ekleyebilirsin.", from:"Dyt. Yılmaz • 1 hafta önce" },
];

export default function MusteriPortal() {
  const [tab, setTab] = useState("plan");
  const [activeDay, setActiveDay] = useState(0);
  const [checked, setChecked] = useState([]);
  const [water, setWater] = useState(4);
  const [olcum, setOlcum] = useState({ kilo:"", bel:"", kalca:"" });
  const [saved, setSaved] = useState(false);

  const toggleCheck = (i) => setChecked(c=>c.includes(i)?c.filter(x=>x!==i):[...c,i]);
  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false),2500); setOlcum({kilo:"",bel:"",kalca:""}); };
  const dashOffset = 220 - (220 * 62 / 100);

  return (
    <>
      <style>{styles}</style>
      <div className="phone-wrap">
        <div className="topbar">
          <div className="topbar-row">
            <div className="greeting">Merhaba, <span>Ayşe</span> 👋</div>
            <div className="notif-btn">🔔</div>
          </div>
          <div className="week-pill"><div className="week-pill-dot"></div><span className="week-pill-text">4. Hafta · Dyt. Yılmaz ile</span></div>
        </div>

        <div className="progress-section">
          <div className="ring-wrap">
            <svg className="ring-svg" width="80" height="80" viewBox="0 0 80 80">
              <circle className="ring-bg" cx="40" cy="40" r="35" />
              <circle className="ring-fill" cx="40" cy="40" r="35" strokeDashoffset={dashOffset} />
            </svg>
            <div className="ring-label"><div className="ring-pct">%62</div><div className="ring-sub">ilerleme</div></div>
          </div>
          <div className="progress-info">
            <div className="prog-title">Kilo Verme Hedefi</div>
            <div className="prog-detail">Başlangıç: <span className="prog-stat">73.2 kg</span><br/>Şu an: <span className="prog-stat">70.3 kg</span><br/>Hedef: <span className="prog-stat">65.0 kg</span></div>
          </div>
        </div>

        <div className="tabs">
          {[{id:"plan",label:"📋 Planım"},{id:"olcum",label:"📏 Ölçüm"},{id:"ilerleme",label:"📈 İlerleme"},{id:"notlar",label:"💬 Notlar"}].map(t=>(
            <button key={t.id} className={`tab-btn ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>{t.label}</button>
          ))}
        </div>

        <div className="content">
          {tab==="plan"&&(
            <>
              <div className="card">
                <div className="day-tabs">{days.map((d,i)=><button key={i} className={`day-tab ${activeDay===i?"active":""}`} onClick={()=>setActiveDay(i)}>{d}</button>)}</div>
                <div className="meal-list">
                  {meals.map((m,i)=>(
                    <div key={i} className="meal-item">
                      <div className={`meal-icon ${m.type}`}>{m.icon}</div>
                      <div className="meal-body"><div className="meal-name">{m.name}</div><div className="meal-desc">{m.desc}</div><div className="meal-kcal">{m.kcal}</div></div>
                      <div className={`meal-check ${checked.includes(i)?"done":""}`} onClick={()=>toggleCheck(i)}>{checked.includes(i)?"✓":""}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="water-row">
                  <div className="water-left"><div className="water-icon">💧</div><div className="water-info"><div className="label">Su Takibi</div><div className="sub">{water}/8 bardak</div></div></div>
                  <div className="water-glasses">{[...Array(8)].map((_,i)=><div key={i} className={`glass ${i<water?"filled":""}`} onClick={()=>setWater(i+1)} />)}</div>
                </div>
              </div>
            </>
          )}

          {tab==="olcum"&&(
            <div className="card">
              <div className="card-head"><div className="card-title">📏 Ölçüm Gir</div></div>
              <div className="olcum-form">
                <div className="olcum-grid">
                  <div className="olcum-field"><label>Kilo (kg)</label><input type="number" placeholder="70.3" value={olcum.kilo} onChange={e=>setOlcum({...olcum,kilo:e.target.value})} /></div>
                  <div className="olcum-field"><label>Bel (cm)</label><input type="number" placeholder="76" value={olcum.bel} onChange={e=>setOlcum({...olcum,bel:e.target.value})} /></div>
                  <div className="olcum-field"><label>Kalça (cm)</label><input type="number" placeholder="96" value={olcum.kalca} onChange={e=>setOlcum({...olcum,kalca:e.target.value})} /></div>
                  <div className="olcum-field"><label>Tarih</label><input type="date" defaultValue={new Date().toISOString().split("T")[0]} /></div>
                </div>
                {saved?<div className="saved-msg">✓ Kaydedildi ve koçuna gönderildi!</div>:<button className="btn-save" onClick={handleSave}>Ölçümü Kaydet & Gönder</button>}
              </div>
            </div>
          )}

          {tab==="ilerleme"&&(
            <div className="card">
              <div className="card-head"><div className="card-title">📈 Kilo İlerleme</div></div>
              <div className="progress-list">
                {progressData.map((p,i)=>(
                  <div key={i} className="progress-week">
                    <span className="pw-label">{p.label}</span>
                    <div className="pw-bar-wrap"><div className="pw-bar" style={{width:`${p.pct}%`}}></div></div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",minWidth:80}}>
                      <span className="pw-val">{p.kilo}</span>
                      <span className="change-badge down">{p.change} kg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="notlar"&&(
            <div className="card">
              <div className="card-head"><div className="card-title">💬 Koç Notları</div></div>
              <div className="notes-list">
                {notes.map((n,i)=><div key={i} className="note-item"><div className="note-text">{n.text}</div><div className="note-from">{n.from}</div></div>)}
              </div>
            </div>
          )}
        </div>

        <div className="bottom-nav">
          {[{id:"plan",icon:"📋",label:"Plan"},{id:"olcum",icon:"📏",label:"Ölçüm"},{id:"ilerleme",icon:"📈",label:"İlerleme"},{id:"notlar",icon:"💬",label:"Notlar"}].map(n=>(
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