/* eslint-disable */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { min-height: 100vh; font-family: 'DM Sans', sans-serif; background: #f5f2ec; display: flex; justify-content: center; }

  .portal-wrap { width: 100%; max-width: 480px; min-height: 100vh; background: #f5f2ec; display: flex; flex-direction: column; }

  /* Topbar */
  .portal-topbar { background: #1c3829; padding: 1.5rem 1.25rem 1.25rem; }
  .portal-topbar-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
  .portal-greeting { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 300; color: #f5f2ec; }
  .portal-greeting span { color: #a8d5a2; }
  .portal-hedef-pill { display: inline-flex; align-items: center; gap: 6px; background: rgba(168,213,162,0.15); border: 1px solid rgba(168,213,162,0.3); border-radius: 100px; padding: 6px 14px; }
  .portal-hedef-text { font-size: 12px; color: #a8d5a2; }
  .portal-hedef-dot { width: 6px; height: 6px; border-radius: 50%; background: #a8d5a2; }

  /* Progress ring */
  .portal-progress { background: #1c3829; padding: 0 1.25rem 1.5rem; display: flex; align-items: center; gap: 1.25rem; }
  .portal-ring-wrap { position: relative; width: 80px; height: 80px; flex-shrink: 0; }
  .portal-ring-svg { transform: rotate(-90deg); }
  .portal-ring-bg { fill: none; stroke: rgba(255,255,255,0.1); stroke-width: 6; }
  .portal-ring-fill { fill: none; stroke: #a8d5a2; stroke-width: 6; stroke-linecap: round; stroke-dasharray: 220; transition: stroke-dashoffset 0.6s ease; }
  .portal-ring-label { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .portal-ring-pct { font-family: 'Fraunces', serif; font-size: 1.1rem; color: #f5f2ec; }
  .portal-ring-sub { font-size: 9px; color: rgba(245,242,236,0.5); }
  .portal-progress-info { flex: 1; }
  .portal-prog-title { font-size: 13px; font-weight: 500; color: #f5f2ec; margin-bottom: 4px; }
  .portal-prog-detail { font-size: 12px; color: rgba(245,242,236,0.5); line-height: 1.6; }
  .portal-prog-stat { color: #a8d5a2; font-weight: 500; }

  /* Tabs */
  .portal-tabs { display: flex; background: #fff; border-bottom: 0.5px solid #e8e4dc; }
  .portal-tab { flex: 1; padding: 14px 8px; border: none; background: transparent; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #8a8378; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s; }
  .portal-tab.active { color: #1c3829; font-weight: 500; border-bottom-color: #1c3829; }

  /* Content */
  .portal-content { flex: 1; overflow-y: auto; padding: 1.25rem; display: flex; flex-direction: column; gap: 12px; }

  /* Cards */
  .portal-card { background: #fff; border: 0.5px solid #e8e4dc; border-radius: 14px; overflow: hidden; }
  .portal-card-head { padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 0.5px solid #f5f2ec; }
  .portal-card-title { font-size: 14px; font-weight: 500; color: #1c3829; }

  /* Plan text */
  .portal-plan-text { white-space: pre-wrap; font-size: 13px; color: #3a3732; line-height: 1.8; padding: 1.25rem; }

  /* Empty */
  .portal-empty { padding: 2rem; text-align: center; color: #8a8378; font-size: 13px; line-height: 1.7; }

  /* Water */
  .portal-water-row { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; }
  .portal-water-left { display: flex; align-items: center; gap: 10px; }
  .portal-water-icon { font-size: 24px; }
  .portal-water-label { font-size: 13px; font-weight: 500; color: #1c3829; }
  .portal-water-sub { font-size: 12px; color: #8a8378; }
  .portal-glasses { display: flex; gap: 4px; }
  .portal-glass { width: 20px; height: 26px; border-radius: 3px; border: 1.5px solid #e8e4dc; background: #faf9f6; cursor: pointer; transition: all 0.15s; }
  .portal-glass.filled { background: #185FA5; border-color: #185FA5; }

  /* Ölçüm form */
  .portal-olcum-form { padding: 1.25rem; }
  .portal-olcum-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
  .portal-olcum-field label { display: block; font-size: 11px; color: #8a8378; margin-bottom: 4px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
  .portal-olcum-field input, .portal-olcum-field textarea { width: 100%; padding: 10px 12px; border: 1.5px solid #e8e4dc; border-radius: 9px; background: #faf9f6; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1c3829; outline: none; transition: border-color 0.15s; }
  .portal-olcum-field input:focus, .portal-olcum-field textarea:focus { border-color: #a8d5a2; }
  .portal-btn-save { width: 100%; padding: 12px; background: #1c3829; color: #f5f2ec; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: background 0.15s; }
  .portal-btn-save:hover { background: #243d2f; }
  .portal-btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
  .portal-saved-msg { text-align: center; padding: 10px; font-size: 13px; color: #3B6D11; font-weight: 500; background: #F0FDF4; border-radius: 8px; }

  /* Progress list */
  .portal-progress-list { padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 12px; }
  .portal-pw { display: flex; align-items: center; gap: 12px; }
  .portal-pw-label { font-size: 12px; color: #8a8378; min-width: 80px; }
  .portal-pw-bar-wrap { flex: 1; background: #e8e4dc; border-radius: 4px; height: 8px; overflow: hidden; }
  .portal-pw-bar { height: 100%; border-radius: 4px; background: #1c3829; transition: width 0.4s; }
  .portal-pw-val { font-size: 12px; font-weight: 500; color: #1c3829; min-width: 60px; text-align: right; }

  /* Mesaj */
  .portal-mesaj-wrap { padding: 1.25rem; }
  .portal-mesaj-list { max-height: 280px; overflow-y: auto; margin-bottom: 12px; display: flex; flex-direction: column; gap: 8px; }
  .portal-mesaj-item { padding: 10px 14px; border-radius: 12px; font-size: 13px; line-height: 1.5; max-width: 85%; }
  .portal-mesaj-item.musteri { background: #1c3829; color: #f5f2ec; align-self: flex-end; border-bottom-right-radius: 4px; }
  .portal-mesaj-item.koc { background: #e8f5e4; color: #1c3829; align-self: flex-start; border-bottom-left-radius: 4px; }
  .portal-mesaj-item .mesaj-zaman { font-size: 10px; opacity: 0.6; margin-top: 4px; }
  .portal-mesaj-input-row { display: flex; gap: 8px; }
  .portal-mesaj-input { flex: 1; padding: 10px 14px; border: 1.5px solid #e8e4dc; border-radius: 10px; background: #faf9f6; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: #1c3829; outline: none; }
  .portal-mesaj-input:focus { border-color: #a8d5a2; }
  .portal-btn-send { padding: 10px 18px; background: #1c3829; color: #f5f2ec; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; }
  .portal-btn-send:hover { background: #243d2f; }

  /* Bottom nav */
  .portal-bottom-nav { background: #fff; border-top: 0.5px solid #e8e4dc; display: flex; padding: 10px 0; }
  .portal-nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 6px; cursor: pointer; border: none; background: none; }
  .portal-nav-icon { font-size: 20px; }
  .portal-nav-label { font-size: 10px; color: #8a8378; }
  .portal-nav-btn.active .portal-nav-label { color: #1c3829; font-weight: 500; }

  /* Loading & Error */
  .portal-loading { display: flex; align-items: center; justify-content: center; min-height: 100vh; font-size: 15px; color: #8a8378; }
  .portal-error-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; }
  .portal-error-box { text-align: center; padding: 2rem; }
  .portal-error-icon { font-size: 48px; margin-bottom: 1rem; }
  .portal-error-title { font-family: 'Fraunces', serif; font-size: 1.4rem; color: #1c3829; margin-bottom: 0.5rem; }
  .portal-error-text { font-size: 14px; color: #8a8378; line-height: 1.6; }

  /* Koc bilgisi */
  .portal-koc-card { padding: 1.25rem; display: flex; align-items: center; gap: 14px; }
  .portal-koc-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #a8d5a2, #7ec477); display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 17px; font-weight: 600; color: #1c3829; flex-shrink: 0; }
  .portal-koc-name { font-size: 14px; font-weight: 500; color: #1c3829; }
  .portal-koc-role { font-size: 12px; color: #8a8378; }
`;

export default function MusteriPortal() {
  const { portalLink } = useParams();
  const [tab, setTab] = useState("plan");
  const [water, setWater] = useState(0);
  const [olcum, setOlcum] = useState({ kilo: "", bel: "", kalca: "" });
  const [saved, setSaved] = useState(false);
  const [musteri, setMusteri] = useState(null);
  const [koc, setKoc] = useState(null);
  const [planlar, setPlanlar] = useState([]);
  const [olcumler, setOlcumler] = useState([]);
  const [mesajlar, setMesajlar] = useState([]);
  const [mesaj, setMesaj] = useState("");
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState("");

  useEffect(() => {
    if (!portalLink) { setHata("Geçersiz portal linki."); setYukleniyor(false); return; }
    loadPortal();
  }, [portalLink]);

  const loadPortal = async () => {
    // 1. Müşteriyi portal_link ile bul
    const { data: musteriData, error: musteriError } = await supabase
      .from("musteriler")
      .select("*")
      .eq("portal_link", portalLink)
      .single();

    if (musteriError || !musteriData) {
      setHata("Bu portal linki geçersiz veya süresi dolmuş.");
      setYukleniyor(false);
      return;
    }
    setMusteri(musteriData);

    // 2. Koç bilgisini getir
    if (musteriData.koc_id) {
      const { data: kocData } = await supabase.auth.admin?.getUserById?.(musteriData.koc_id) || {};
      // Admin API yoksa profiles tablosu veya user_metadata kullan
      // Basit fallback: koç ID'sini sakla
      setKoc({ id: musteriData.koc_id });
    }

    // 3. Planları getir
    const { data: planData } = await supabase
      .from("planlar")
      .select("*")
      .eq("musteri_id", musteriData.id)
      .order("created_at", { ascending: false });
    setPlanlar(planData || []);

    // 4. Ölçümleri getir
    const { data: olcumData } = await supabase
      .from("olcumler")
      .select("*")
      .eq("musteri_id", musteriData.id)
      .order("tarih", { ascending: true });
    setOlcumler(olcumData || []);

    // 5. Mesajları getir
    const { data: mesajData } = await supabase
      .from("portal_mesajlar")
      .select("*")
      .eq("musteri_id", musteriData.id)
      .order("created_at", { ascending: true });
    setMesajlar(mesajData || []);

    setYukleniyor(false);
  };

  const handleOlcumKaydet = async () => {
    if (!olcum.kilo) return;
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

  const handleMesajGonder = async () => {
    if (!mesaj.trim()) return;
    const yeniMesaj = {
      musteri_id: musteri.id,
      koc_id: musteri.koc_id,
      gonderen: "musteri",
      icerik: mesaj.trim(),
    };
    const { error } = await supabase.from("portal_mesajlar").insert([yeniMesaj]);
    if (!error) {
      setMesajlar(prev => [...prev, { ...yeniMesaj, created_at: new Date().toISOString() }]);
      setMesaj("");
    }
  };

  // Hesaplamalar
  const ilkKilo = olcumler[0]?.kilo;
  const sonKilo = olcumler[olcumler.length - 1]?.kilo;
  const fark = ilkKilo && sonKilo ? (sonKilo - ilkKilo).toFixed(1) : null;
  const maxKilo = Math.max(...olcumler.map(o => o.kilo || 0), 1);
  const ilerlemeYuzde = olcumler.length > 0 ? Math.min(olcumler.length * 10, 100) : 0;

  // Loading
  if (yukleniyor) {
    return (
      <>
        <style>{styles}</style>
        <div className="portal-loading">Portalınız yükleniyor...</div>
      </>
    );
  }

  // Error
  if (hata) {
    return (
      <>
        <style>{styles}</style>
        <div className="portal-error-wrap">
          <div className="portal-error-box">
            <div className="portal-error-icon">🔗</div>
            <div className="portal-error-title">Portal Bulunamadı</div>
            <div className="portal-error-text">{hata}<br/>Lütfen diyetisyeninizden yeni bir portal linki isteyin.</div>
          </div>
        </div>
      </>
    );
  }

  const sonPlan = planlar[0];
  const tabs = [
    { id: "plan", icon: "📋", label: "Planım" },
    { id: "olcum", icon: "📏", label: "Ölçüm" },
    { id: "ilerleme", icon: "📈", label: "İlerleme" },
    { id: "mesaj", icon: "💬", label: "Mesaj" },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="portal-wrap">

        {/* TOPBAR */}
        <div className="portal-topbar">
          <div className="portal-topbar-row">
            <div className="portal-greeting">Merhaba, <span>{musteri.ad}</span> 👋</div>
          </div>
          <div className="portal-hedef-pill">
            <div className="portal-hedef-dot"></div>
            <span className="portal-hedef-text">{musteri.hedef || "Diyet Planı"}</span>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="portal-progress">
          <div className="portal-ring-wrap">
            <svg className="portal-ring-svg" width="80" height="80" viewBox="0 0 80 80">
              <circle className="portal-ring-bg" cx="40" cy="40" r="35" />
              <circle className="portal-ring-fill" cx="40" cy="40" r="35"
                strokeDashoffset={220 - (220 * ilerlemeYuzde / 100)} />
            </svg>
            <div className="portal-ring-label">
              <div className="portal-ring-pct">%{ilerlemeYuzde}</div>
              <div className="portal-ring-sub">ilerleme</div>
            </div>
          </div>
          <div className="portal-progress-info">
            <div className="portal-prog-title">{musteri.hedef || "Hedef"}</div>
            <div className="portal-prog-detail">
              {ilkKilo && <span>Başlangıç: <span className="portal-prog-stat">{ilkKilo} kg</span><br/></span>}
              {sonKilo && <span>Şu an: <span className="portal-prog-stat">{sonKilo} kg</span><br/></span>}
              {fark && <span>Fark: <span className="portal-prog-stat">{fark > 0 ? "+" : ""}{fark} kg</span></span>}
              {!ilkKilo && <span>Henüz ölçüm girilmedi</span>}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="portal-tabs">
          {tabs.map(t => (
            <button key={t.id} className={`portal-tab ${tab === t.id ? "active" : ""}`}
              onClick={() => setTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="portal-content">

          {/* ─── PLAN ─── */}
          {tab === "plan" && (
            <>
              <div className="portal-card">
                <div className="portal-card-head">
                  <div className="portal-card-title">📋 Diyet Planım</div>
                  {sonPlan && <span style={{ fontSize: 11, color: '#8a8378' }}>
                    {new Date(sonPlan.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}
                  </span>}
                </div>
                {sonPlan ? (
                  <div className="portal-plan-text">{sonPlan.icerik}</div>
                ) : (
                  <div className="portal-empty">
                    Henüz diyet planı oluşturulmadı.<br/>
                    Diyetisyeniniz yakında planınızı hazırlayacak.
                  </div>
                )}
              </div>

              {/* Su Takibi */}
              <div className="portal-card">
                <div className="portal-water-row">
                  <div className="portal-water-left">
                    <div className="portal-water-icon">💧</div>
                    <div>
                      <div className="portal-water-label">Su Takibi</div>
                      <div className="portal-water-sub">{water}/8 bardak</div>
                    </div>
                  </div>
                  <div className="portal-glasses">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className={`portal-glass ${i < water ? "filled" : ""}`}
                        onClick={() => setWater(i + 1)} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Tüm planlar */}
              {planlar.length > 1 && (
                <div className="portal-card">
                  <div className="portal-card-head">
                    <div className="portal-card-title">📁 Geçmiş Planlar</div>
                  </div>
                  {planlar.slice(1).map((p, i) => (
                    <div key={i} style={{ padding: '12px 1.25rem', borderBottom: '0.5px solid #f5f2ec', cursor: 'pointer' }}
                      onClick={() => {
                        const el = document.getElementById(`plan-${i}`);
                        if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
                      }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#1c3829' }}>
                        {new Date(p.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                      </div>
                      <div id={`plan-${i}`} className="portal-plan-text" style={{ display: 'none', padding: '8px 0 0' }}>{p.icerik}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ─── ÖLÇÜM ─── */}
          {tab === "olcum" && (
            <div className="portal-card">
              <div className="portal-card-head">
                <div className="portal-card-title">📏 Ölçüm Gir</div>
              </div>
              <div className="portal-olcum-form">
                {saved && <div className="portal-saved-msg">✓ Ölçüm kaydedildi!</div>}
                <div className="portal-olcum-grid">
                  <div className="portal-olcum-field">
                    <label>Kilo (kg)</label>
                    <input type="number" placeholder="70.3" value={olcum.kilo}
                      onChange={e => setOlcum({ ...olcum, kilo: e.target.value })} step="0.1" />
                  </div>
                  <div className="portal-olcum-field">
                    <label>Bel (cm)</label>
                    <input type="number" placeholder="76" value={olcum.bel}
                      onChange={e => setOlcum({ ...olcum, bel: e.target.value })} />
                  </div>
                  <div className="portal-olcum-field">
                    <label>Kalça (cm)</label>
                    <input type="number" placeholder="96" value={olcum.kalca}
                      onChange={e => setOlcum({ ...olcum, kalca: e.target.value })} />
                  </div>
                  <div className="portal-olcum-field">
                    <label>Tarih</label>
                    <input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                  </div>
                </div>
                {!saved && (
                  <button className="portal-btn-save" onClick={handleOlcumKaydet} disabled={!olcum.kilo}>
                    Ölçümü Kaydet
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ─── İLERLEME ─── */}
          {tab === "ilerleme" && (
            <div className="portal-card">
              <div className="portal-card-head">
                <div className="portal-card-title">📈 Kilo İlerleme</div>
              </div>
              {olcumler.length === 0 ? (
                <div className="portal-empty">
                  Henüz ölçüm yok.<br/>Ölçüm sekmesinden ilk kilonuzu girin!
                </div>
              ) : (
                <div className="portal-progress-list">
                  {olcumler.map((o, i) => (
                    <div key={i} className="portal-pw">
                      <span className="portal-pw-label">
                        {new Date(o.tarih).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}
                      </span>
                      <div className="portal-pw-bar-wrap">
                        <div className="portal-pw-bar" style={{ width: `${(o.kilo / maxKilo) * 100}%` }}></div>
                      </div>
                      <span className="portal-pw-val">{o.kilo} kg</span>
                    </div>
                  ))}
                  {olcumler.length >= 2 && (
                    <div style={{ padding: '12px 0 4px', borderTop: '0.5px solid #e8e4dc', marginTop: 4 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                        <span style={{ color: '#8a8378' }}>Toplam Değişim</span>
                        <span style={{ fontWeight: 600, color: fark < 0 ? '#3B6D11' : fark > 0 ? '#DC2626' : '#1c3829' }}>
                          {fark > 0 ? "+" : ""}{fark} kg
                        </span>
                      </div>
                      {olcumler[0]?.bel && olcumler[olcumler.length - 1]?.bel && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 6 }}>
                          <span style={{ color: '#8a8378' }}>Bel Değişimi</span>
                          <span style={{ fontWeight: 600, color: '#1c3829' }}>
                            {(olcumler[olcumler.length - 1].bel - olcumler[0].bel).toFixed(1)} cm
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ─── MESAJ ─── */}
          {tab === "mesaj" && (
            <div className="portal-card">
              <div className="portal-card-head">
                <div className="portal-card-title">💬 Diyetisyenime Mesaj</div>
              </div>
              <div className="portal-mesaj-wrap">
                {mesajlar.length === 0 ? (
                  <div className="portal-empty" style={{ padding: '1rem 0' }}>
                    Henüz mesaj yok. Diyetisyeninize buradan mesaj gönderebilirsiniz.
                  </div>
                ) : (
                  <div className="portal-mesaj-list">
                    {mesajlar.map((m, i) => (
                      <div key={i} className={`portal-mesaj-item ${m.gonderen === "musteri" ? "musteri" : "koc"}`}>
                        <div>{m.icerik}</div>
                        <div className="mesaj-zaman">
                          {new Date(m.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="portal-mesaj-input-row">
                  <input className="portal-mesaj-input"
                    placeholder="Mesajınızı yazın..."
                    value={mesaj}
                    onChange={e => setMesaj(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleMesajGonder()} />
                  <button className="portal-btn-send" onClick={handleMesajGonder}>Gönder</button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM NAV */}
        <div className="portal-bottom-nav">
          {tabs.map(n => (
            <button key={n.id} className={`portal-nav-btn ${tab === n.id ? "active" : ""}`}
              onClick={() => setTab(n.id)}>
              <div className="portal-nav-icon">{n.icon}</div>
              <div className="portal-nav-label">{n.label}</div>
            </button>
          ))}
        </div>

      </div>
    </>
  );
}
