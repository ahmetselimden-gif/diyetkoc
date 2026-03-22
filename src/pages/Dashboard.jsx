import { useState } from "react";

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
  .metric-change { font-size: 12px; margin-top: 4px; }
  .metric-change.up { color: #3B6D11; }
  .metric-change.neutral { color: #8a8378; }
  .content-grid { display: grid; grid-template-columns: 1fr 340px; gap: 16px; }
  .card { background: #fff; border: 0.5px solid #e8e4dc; border-radius: 16px; overflow: hidden; }
  .card-header { padding: 1.25rem 1.5rem; border-bottom: 0.5px solid #e8e4dc; display: flex; align-items: center; justify-content: space-between; }
  .card-title { font-size: 15px; font-weight: 500; color: #1c3829; }
  .card-sub { font-size: 12px; color: #8a8378; margin-top: 2px; }
  .search-bar { display: flex; align-items: center; gap: 8px; padding: 8px 14px; background: #f5f2ec; border-radius: 9px; font-size: 13px; color: #8a8378; }
  table { width: 100%; border-collapse: collapse; }
  thead th { padding: 12px 1.5rem; text-align: left; font-size: 11px; font-weight: 500; color: #b5b0a7; letter-spacing: 0.06em; text-transform: uppercase; border-bottom: 0.5px solid #e8e4dc; }
  tbody tr { border-bottom: 0.5px solid #f0ece4; cursor: pointer; }
  tbody tr:hover { background: #faf9f6; }
  tbody tr:last-child { border-bottom: none; }
  tbody td { padding: 13px 1.5rem; font-size: 14px; color: #3a3732; }
  .client-name { display: flex; align-items: center; gap: 10px; }
  .client-avatar { width: 32px; height: 32px; border-radius: 50%; background: #e8e4dc; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; color: #5a5650; }
  .client-fullname { font-weight: 500; color: #1c3829; }
  .client-email { font-size: 12px; color: #8a8378; }
  .badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 500; }
  .badge.active { background: #EAF3DE; color: #3B6D11; }
  .badge.waiting { background: #FAEEDA; color: #854F0B; }
  .badge.new { background: #E6F1FB; color: #185FA5; }
  .progress-wrap { display: flex; align-items: center; gap: 8px; }
  .progress-bar { flex: 1; height: 6px; background: #e8e4dc; border-radius: 3px; overflow: hidden; max-width: 80px; }
  .progress-fill { height: 100%; border-radius: 3px; background: #1c3829; }
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
  .activity-list { padding: 0 1rem 1rem; }
  .activity-item { display: flex; gap: 12px; padding: 12px 0.5rem; border-bottom: 0.5px solid #f0ece4; }
  .activity-item:last-child { border-bottom: none; }
  .activity-dot { width: 8px; height: 8px; border-radius: 50%; background: #a8d5a2; margin-top: 5px; flex-shrink: 0; }
  .activity-text { font-size: 13px; color: #3a3732; line-height: 1.5; }
  .activity-time { font-size: 11px; color: #b5b0a7; margin-top: 2px; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(28,56,41,0.4); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 1rem; }
  .modal { background: #f5f2ec; border-radius: 20px; padding: 2rem; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; }
  .modal-title { font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 300; color: #1c3829; margin-bottom: 0.4rem; }
  .modal-sub { font-size: 13px; color: #8a8378; margin-bottom: 1.5rem; }
  .plan-output { background: #fff; border: 0.5px solid #e8e4dc; border-radius: 12px; padding: 1.25rem; font-size: 13px; color: #3a3732; line-height: 1.8; white-space: pre-wrap; margin-bottom: 1rem; max-height: 320px; overflow-y: auto; }
  .modal-actions { display: flex; gap: 10px; }
  .modal-actions .btn-outline { flex: 1; }
  .modal-actions .btn-primary { flex: 1; }
`;

const clients = [
  { id:1, name:"Ayşe Kaya", email:"ayse@gmail.com", initials:"AK", goal:"Kilo verme", week:4, progress:65, status:"active", lastPlan:"3 gün önce" },
  { id:2, name:"Mehmet Demir", email:"mdemir@gmail.com", initials:"MD", goal:"Kas yapma", week:2, progress:30, status:"new", lastPlan:"Bugün" },
  { id:3, name:"Zeynep Arslan", email:"zeynep.a@gmail.com", initials:"ZA", goal:"Sağlıklı beslenme", week:8, progress:88, status:"active", lastPlan:"1 hafta önce" },
  { id:4, name:"Ali Çelik", email:"alicelik@gmail.com", initials:"AÇ", goal:"Kilo verme", week:1, progress:10, status:"waiting", lastPlan:"Henüz yok" },
  { id:5, name:"Fatma Yıldız", email:"fatma.y@gmail.com", initials:"FY", goal:"Form koruma", week:12, progress:95, status:"active", lastPlan:"2 gün önce" },
];

const activities = [
  { text:"Mehmet Demir ölçüm girdi: 84.2 kg", time:"10 dakika önce" },
  { text:"Ayşe Kaya diyet planını görüntüledi", time:"45 dakika önce" },
  { text:"Fatma Yıldız haftalık raporu gönderildi", time:"2 saat önce" },
  { text:"Yeni müşteri Ali Çelik kaydoldu", time:"Dün 14:32" },
];

const samplePlan = `📋 HAFTALIK DİYET PLANI — Ayşe Kaya
Hedef: Kilo verme | Kalori: 1500 kcal/gün

PAZARTESI
🌅 Kahvaltı (350 kcal)
- 2 yumurta, 1 dilim tam buğday ekmek
- Beyaz peynir, domates, salatalık

☀️ Öğle (400 kcal)
- Mercimek çorbası, ızgara tavuk (120g)
- Mevsim salatası

🌙 Akşam (450 kcal)
- Fırın sebze, bulgur pilavı, cacık

💧 Su: Günde en az 2.5 litre`;

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("musteriler");
  const [generating, setGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [form, setForm] = useState({ musteri:"", hedef:"kilo-verme", kalori:"1500", sure:"4" });

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setShowModal(true); }, 1800);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="layout">
        <div className="sidebar">
          <div className="logo"><div className="logo-mark">D</div><span className="logo-text">DiyetKoç</span></div>
          <div className="nav">
            <div className="nav-section">Genel</div>
            {[{id:"ozet",icon:"▦",label:"Özet"},{id:"musteriler",icon:"◎",label:"Müşteriler",badge:"5"},{id:"planlar",icon:"◈",label:"AI Planlar"}].map(n=>(
              <div key={n.id} className={`nav-item ${activeNav===n.id?"active":""}`} onClick={()=>setActiveNav(n.id)}>
                <span className="icon">{n.icon}</span>{n.label}
                {n.badge&&<span className="nav-badge">{n.badge}</span>}
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
            <div className="avatar">AY</div>
            <div className="user-info"><div className="name">Ayşe Yılmaz</div><div className="role">Diyetisyen · Pro</div></div>
          </div>
        </div>

        <div className="main">
          <div className="topbar">
            <div className="topbar-left"><h1>Hoş geldin, Ayşe 👋</h1><p>Bugün 2 müşterinin planı güncellenmeli</p></div>
            <div className="topbar-right">
              <button className="btn-outline">📤 Rapor</button>
              <button className="btn-primary">+ Yeni Müşteri</button>
            </div>
          </div>

          <div className="metrics">
            {[
              {label:"Aktif Müşteri",val:"5",icon:"◎",change:"↑ Bu ay 2 yeni",dir:"up"},
              {label:"Bu Hafta Plan",val:"3",icon:"◈",change:"2 bekliyor",dir:"neutral"},
              {label:"Ort. İlerleme",val:"%58",icon:"◉",change:"↑ +8% geçen aya göre",dir:"up"},
              {label:"Aylık Gelir",val:"₺1.797",icon:"◫",change:"3 aktif abonelik",dir:"up"},
            ].map((m,i)=>(
              <div key={i} className="metric-card">
                <div className="metric-top"><span className="metric-label">{m.label}</span><span>{m.icon}</span></div>
                <div className="metric-val">{m.val}</div>
                <div className={`metric-change ${m.dir}`}>{m.change}</div>
              </div>
            ))}
          </div>

          <div className="content-grid">
            <div>
              <div className="card">
                <div className="card-header">
                  <div><div className="card-title">Müşteriler</div><div className="card-sub">5 aktif kayıt</div></div>
                  <div className="search-bar">🔍 Ara...</div>
                </div>
                <table>
                  <thead><tr><th>Müşteri</th><th>Hedef</th><th>Hafta</th><th>İlerleme</th><th>Durum</th></tr></thead>
                  <tbody>
                    {clients.map(c=>(
                      <tr key={c.id} onClick={()=>setSelectedClient(c)}>
                        <td><div className="client-name"><div className="client-avatar">{c.initials}</div><div><div className="client-fullname">{c.name}</div><div className="client-email">{c.email}</div></div></div></td>
                        <td>{c.goal}</td>
                        <td>{c.week}. hafta</td>
                        <td><div className="progress-wrap"><div className="progress-bar"><div className="progress-fill" style={{width:`${c.progress}%`}}></div></div><span style={{fontSize:"12px",color:"#8a8378"}}>%{c.progress}</span></div></td>
                        <td><span className={`badge ${c.status}`}>{c.status==="active"?"Aktif":c.status==="new"?"Yeni":"Bekliyor"}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="right-col">
              <div className="ai-card">
                <div className="ai-card-title">AI Plan Üret</div>
                <div className="ai-card-sub">Saniyeler içinde kişiselleştirilmiş plan</div>
                <div className="ai-field"><label>Müşteri</label><select value={form.musteri} onChange={e=>setForm({...form,musteri:e.target.value})}><option value="">Seç...</option>{clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}</select></div>
                <div className="ai-field"><label>Hedef</label><select value={form.hedef} onChange={e=>setForm({...form,hedef:e.target.value})}><option value="kilo-verme">Kilo verme</option><option value="kas-yapma">Kas yapma</option><option value="form-koruma">Form koruma</option></select></div>
                <div className="ai-row">
                  <div className="ai-field"><label>Kalori</label><input placeholder="1500" value={form.kalori} onChange={e=>setForm({...form,kalori:e.target.value})} /></div>
                  <div className="ai-field"><label>Süre (hafta)</label><input placeholder="4" value={form.sure} onChange={e=>setForm({...form,sure:e.target.value})} /></div>
                </div>
                <button className="btn-ai" onClick={handleGenerate} disabled={generating}>{generating?"⏳ Üretiliyor...":"✦ Planı Üret"}</button>
              </div>

              <div className="card">
                <div className="card-header"><div><div className="card-title">Son Aktiviteler</div><div className="card-sub">Gerçek zamanlı</div></div></div>
                <div className="activity-list">
                  {activities.map((a,i)=>(
                    <div key={i} className="activity-item">
                      <div className="activity-dot"></div>
                      <div><div className="activity-text">{a.text}</div><div className="activity-time">{a.time}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal&&(
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-title">Plan Hazır ✦</div>
            <div className="modal-sub">{form.musteri||"Müşteri"} için oluşturuldu</div>
            <div className="plan-output">{samplePlan}</div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={()=>setShowModal(false)}>Düzenle</button>
              <button className="btn-primary" onClick={()=>setShowModal(false)}>📤 PDF İndir</button>
            </div>
          </div>
        </div>
      )}

      {selectedClient&&(
        <div className="modal-overlay" onClick={()=>setSelectedClient(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"1.5rem"}}>
              <div className="client-avatar" style={{width:52,height:52,fontSize:18}}>{selectedClient.initials}</div>
              <div><div className="modal-title" style={{marginBottom:2}}>{selectedClient.name}</div><div style={{fontSize:13,color:"#8a8378"}}>{selectedClient.email}</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:"1.5rem"}}>
              {[{label:"Hedef",val:selectedClient.goal},{label:"Hafta",val:`${selectedClient.week}. hafta`},{label:"İlerleme",val:`%${selectedClient.progress}`},{label:"Son Plan",val:selectedClient.lastPlan}].map((row,i)=>(
                <div key={i} style={{background:"#f5f2ec",borderRadius:10,padding:"12px 14px"}}>
                  <div style={{fontSize:11,color:"#8a8378",marginBottom:3}}>{row.label}</div>
                  <div style={{fontSize:15,fontWeight:500,color:"#1c3829"}}>{row.val}</div>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={()=>setSelectedClient(null)}>Kapat</button>
              <button className="btn-primary" onClick={()=>{setSelectedClient(null);handleGenerate();}}>✦ Plan Üret</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}