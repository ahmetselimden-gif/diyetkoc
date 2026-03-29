/* eslint-disable */
import { useState } from "react";

const mpStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { min-height: 100vh; font-family: 'DM Sans', sans-serif; background: #f5f2ec; }

  .mp-wrapper { max-width: 720px; margin: 0 auto; padding: 1.5rem 1rem 3rem; }

  /* Header */
  .mp-header { background: #1a2e23; border-radius: 20px; padding: 1.75rem 2rem; margin-bottom: 1.25rem; color: #f5f2ec; }
  .mp-header-top { display: flex; align-items: center; gap: 14px; margin-bottom: 1.25rem; }
  .mp-avatar { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, #a8d5a2, #7ec477); display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; color: #1a2e23; flex-shrink: 0; }
  .mp-user-name { font-family: 'Fraunces', serif; font-size: 1.35rem; font-weight: 400; }
  .mp-user-sub { font-size: 12.5px; color: rgba(245,242,236,0.5); margin-top: 2px; }
  .mp-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .mp-stat { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 12px 14px; text-align: center; }
  .mp-stat-val { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 400; color: #a8d5a2; }
  .mp-stat-label { font-size: 11px; color: rgba(245,242,236,0.4); margin-top: 2px; letter-spacing: 0.04em; }

  /* Cards */
  .mp-card { background: #fff; border: 1px solid #eae6de; border-radius: 16px; padding: 1.25rem 1.5rem; margin-bottom: 1rem; }
  .mp-card-title { font-family: 'Fraunces', serif; font-size: 1.1rem; font-weight: 400; color: #1a2e23; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px; }
  .mp-card-icon { width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
  .mp-card-icon.green { background: #EAF3DE; }
  .mp-card-icon.blue { background: #E3EEF9; }
  .mp-card-icon.orange { background: #FDF1E1; }
  .mp-card-icon.purple { background: #F0E8F8; }

  /* Meal section */
  .mp-meal-section { margin-bottom: 14px; }
  .mp-meal-section:last-child { margin-bottom: 0; }
  .mp-meal-header { font-size: 13px; font-weight: 600; color: #1a2e23; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
  .mp-meal-tag { font-size: 10px; font-weight: 500; padding: 3px 8px; border-radius: 100px; }
  .mp-meal-tag.kahvalti { background: #FDF1E1; color: #854F0B; }
  .mp-meal-tag.ogle { background: #EAF3DE; color: #3B6D11; }
  .mp-meal-tag.aksam { background: #E3EEF9; color: #1D4ED8; }
  .mp-meal-tag.ara { background: #F0E8F8; color: #7C3AED; }

  .mp-meal-item { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid #f5f2ec; cursor: pointer; transition: background 0.15s; }
  .mp-meal-item:last-child { border-bottom: none; }
  .mp-meal-item:hover { background: #faf9f6; margin: 0 -8px; padding-left: 8px; padding-right: 8px; border-radius: 8px; }

  .mp-checkbox { width: 22px; height: 22px; border-radius: 6px; border: 2px solid #d8d3ca; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; flex-shrink: 0; font-size: 12px; color: #fff; }
  .mp-checkbox.checked { background: linear-gradient(135deg, #a8d5a2, #7ec477); border-color: #7ec477; }
  .mp-meal-text { font-size: 13.5px; color: #3a3732; flex: 1; }
  .mp-meal-text.done { text-decoration: line-through; color: #b5b0a7; }
  .mp-meal-cal { font-size: 11.5px; color: #8a8378; white-space: nowrap; }

  /* Progress bar */
  .mp-progress-wrap { margin-bottom: 0; }
  .mp-progress-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
  .mp-progress-label { font-size: 13px; color: #5a5650; font-weight: 500; }
  .mp-progress-pct { font-family: 'Fraunces', serif; font-size: 1.5rem; font-weight: 400; color: #1a2e23; }
  .mp-progress-bar { height: 12px; background: #f0ece4; border-radius: 100px; overflow: hidden; }
  .mp-progress-fill { height: 100%; border-radius: 100px; background: linear-gradient(90deg, #a8d5a2, #7ec477); transition: width 0.5s ease; }

  /* Form */
  .mp-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
  .mp-field { display: flex; flex-direction: column; gap: 5px; }
  .mp-field label { font-size: 11px; font-weight: 500; color: #5a5650; letter-spacing: 0.06em; text-transform: uppercase; }
  .mp-field input, .mp-field textarea { width: 100%; padding: 10px 12px; border: 1.5px solid #e4dfd5; border-radius: 10px; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1a2e23; outline: none; transition: border-color 0.15s; resize: vertical; }
  .mp-field input:focus, .mp-field textarea:focus { border-color: #a8d5a2; }

  /* Buttons */
  .mp-btn { padding: 11px 20px; border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; cursor: pointer; font-weight: 500; transition: all 0.15s; display: inline-flex; align-items: center; gap: 6px; }
  .mp-btn-primary { background: #1a2e23; color: #f5f2ec; }
  .mp-btn-primary:hover { background: #243d2f; }
  .mp-btn-green { background: linear-gradient(135deg, #a8d5a2, #7ec477); color: #1a2e23; font-weight: 600; }
  .mp-btn-green:hover { opacity: 0.9; }
  .mp-btn-outline { background: #fff; color: #1a2e23; border: 1.5px solid #ddd9d0; }
  .mp-btn-outline:hover { border-color: #c5c0b7; background: #faf9f6; }
  .mp-btn-row { display: flex; gap: 10px; flex-wrap: wrap; }

  /* Message */
  .mp-msg-row { display: flex; gap: 8px; }
  .mp-msg-input { flex: 1; padding: 10px 14px; border: 1.5px solid #e4dfd5; border-radius: 10px; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: #1a2e23; outline: none; transition: border-color 0.15s; }
  .mp-msg-input:focus { border-color: #a8d5a2; }

  /* Success box */
  .mp-success { background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #166534; margin-bottom: 12px; text-align: center; }

  /* Footer */
  .mp-footer { display: flex; gap: 10px; flex-wrap: wrap; }
  .mp-footer .mp-btn { flex: 1; justify-content: center; min-width: 160px; }

  /* Responsive */
  @media (max-width: 600px) {
    .mp-wrapper { padding: 1rem 0.75rem 2rem; }
    .mp-header { padding: 1.25rem 1.25rem; border-radius: 16px; }
    .mp-stats { grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
    .mp-stat { padding: 10px 8px; }
    .mp-stat-val { font-size: 1.1rem; }
    .mp-card { padding: 1rem 1.15rem; }
    .mp-form-row { grid-template-columns: 1fr; }
    .mp-footer { flex-direction: column; }
    .mp-footer .mp-btn { min-width: unset; }
  }
`;

// ─── Mock Data ────────────────────────────────
const mockUser = {
  ad: "Ahmet Selim",
  hedef: "Kilo verme",
  kalori: 1500,
  sure: 7,
};

const mockPlan = {
  kahvalti: [
    { id: 1, text: "2 haşlanmış yumurta", kcal: 155 },
    { id: 2, text: "1 dilim tam buğday ekmek", kcal: 80 },
    { id: 3, text: "Domates, salatalık, yeşillik", kcal: 35 },
    { id: 4, text: "1 bardak süt (yarım yağlı)", kcal: 90 },
  ],
  ogle: [
    { id: 5, text: "Izgara tavuk göğsü (150g)", kcal: 230 },
    { id: 6, text: "Bulgur pilavı (4 yemek kaşığı)", kcal: 180 },
    { id: 7, text: "Mevsim salatası (zeytinyağlı)", kcal: 120 },
  ],
  aksam: [
    { id: 8, text: "Fırında somon (150g)", kcal: 280 },
    { id: 9, text: "Buharda brokoli ve havuç", kcal: 65 },
    { id: 10, text: "2 yemek kaşığı yoğurt", kcal: 40 },
  ],
  ara: [
    { id: 11, text: "1 avuç badem (15 adet)", kcal: 105 },
    { id: 12, text: "1 adet yeşil elma", kcal: 80 },
  ],
};

const mealMeta = {
  kahvalti: { label: "Kahvaltı", icon: "🌅", tag: "kahvalti" },
  ogle: { label: "Öğle Yemeği", icon: "☀️", tag: "ogle" },
  aksam: { label: "Akşam Yemeği", icon: "🌙", tag: "aksam" },
  ara: { label: "Ara Öğün", icon: "🍎", tag: "ara" },
};

// ─── Component ──────────────────────────────────
export default function MusteriPanel() {
  const [checked, setChecked] = useState({});
  const [kilo, setKilo] = useState("");
  const [su, setSu] = useState("");
  const [not, setNot] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [kaydedildi, setKaydedildi] = useState(false);
  const [tamamlandi, setTamamlandi] = useState(false);

  // Tüm öğünlerin id listesi
  const allItems = Object.values(mockPlan).flat();
  const totalItems = allItems.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const uyumYuzdesi = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  const toggleItem = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleKaydet = () => {
    console.log("Günlük veri gönderildi:", { kilo, su, not, tarih: new Date().toISOString() });
    setKaydedildi(true);
    setTimeout(() => setKaydedildi(false), 3000);
  };

  const handleMesajGonder = () => {
    if (!mesaj.trim()) return;
    console.log("Mesaj gönderildi:", mesaj);
    setMesaj("");
  };

  const handleTamamla = () => {
    console.log("Gün tamamlandı!", { uyumYuzdesi, checked, kilo, su, not });
    setTamamlandi(true);
    setTimeout(() => setTamamlandi(false), 4000);
  };

  const handlePdfIndir = () => {
    console.log("PDF indirme — ileride bağlanacak");
    window.print();
  };

  return (
    <>
      <style>{mpStyles}</style>
      <div className="mp-wrapper">

        {/* ═══════════════ HEADER ═══════════════ */}
        <div className="mp-header">
          <div className="mp-header-top">
            <div className="mp-avatar">{mockUser.ad.split(" ").map((w) => w[0]).join("")}</div>
            <div>
              <div className="mp-user-name">{mockUser.ad}</div>
              <div className="mp-user-sub">Müşteri Paneli</div>
            </div>
          </div>
          <div className="mp-stats">
            <div className="mp-stat">
              <div className="mp-stat-val">{mockUser.hedef === "Kilo verme" ? "🔻" : "💪"}</div>
              <div className="mp-stat-label">{mockUser.hedef}</div>
            </div>
            <div className="mp-stat">
              <div className="mp-stat-val">{mockUser.kalori}</div>
              <div className="mp-stat-label">kcal / gün</div>
            </div>
            <div className="mp-stat">
              <div className="mp-stat-val">{mockUser.sure}</div>
              <div className="mp-stat-label">gün program</div>
            </div>
          </div>
        </div>

        {/* ═══════════════ İLERLEME ═══════════════ */}
        <div className="mp-card">
          <div className="mp-card-title">
            <div className="mp-card-icon green">📊</div>
            Günlük Uyum Skoru
          </div>
          <div className="mp-progress-wrap">
            <div className="mp-progress-top">
              <span className="mp-progress-label">{checkedCount} / {totalItems} öğün tamamlandı</span>
              <span className="mp-progress-pct">%{uyumYuzdesi}</span>
            </div>
            <div className="mp-progress-bar">
              <div className="mp-progress-fill" style={{ width: `${uyumYuzdesi}%` }} />
            </div>
          </div>
        </div>

        {/* ═══════════════ GÜNLÜK PLAN ═══════════════ */}
        <div className="mp-card">
          <div className="mp-card-title">
            <div className="mp-card-icon orange">🍽️</div>
            Bugünün Planı
          </div>

          {Object.entries(mockPlan).map(([key, items]) => {
            const meta = mealMeta[key];
            return (
              <div className="mp-meal-section" key={key}>
                <div className="mp-meal-header">
                  <span className={`mp-meal-tag ${meta.tag}`}>{meta.icon} {meta.label}</span>
                </div>
                {items.map((item) => (
                  <div className="mp-meal-item" key={item.id} onClick={() => toggleItem(item.id)}>
                    <div className={`mp-checkbox ${checked[item.id] ? "checked" : ""}`}>
                      {checked[item.id] && "✓"}
                    </div>
                    <span className={`mp-meal-text ${checked[item.id] ? "done" : ""}`}>{item.text}</span>
                    <span className="mp-meal-cal">{item.kcal} kcal</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* ═══════════════ VERİ GİRİŞİ ═══════════════ */}
        <div className="mp-card">
          <div className="mp-card-title">
            <div className="mp-card-icon blue">📝</div>
            Günlük Veri Girişi
          </div>

          {kaydedildi && <div className="mp-success">Veriler başarıyla kaydedildi ve diyetisyeninize gönderildi!</div>}

          <div className="mp-form-row">
            <div className="mp-field">
              <label>Kilo (kg)</label>
              <input type="number" placeholder="Örn: 72.5" value={kilo} onChange={(e) => setKilo(e.target.value)} step="0.1" />
            </div>
            <div className="mp-field">
              <label>Su Tüketimi (litre)</label>
              <input type="number" placeholder="Örn: 2.5" value={su} onChange={(e) => setSu(e.target.value)} step="0.1" />
            </div>
          </div>
          <div className="mp-field" style={{ marginBottom: 14 }}>
            <label>Not</label>
            <textarea rows={3} placeholder="Bugün nasıl hissettiniz? Eklemek istediğiniz bir not var mı?" value={not} onChange={(e) => setNot(e.target.value)} />
          </div>
          <button className="mp-btn mp-btn-primary" onClick={handleKaydet} style={{ width: "100%" }}>
            Kaydet ve Diyetisyene Gönder
          </button>
        </div>

        {/* ═══════════════ MESAJ ═══════════════ */}
        <div className="mp-card">
          <div className="mp-card-title">
            <div className="mp-card-icon purple">💬</div>
            Diyetisyenine Mesaj
          </div>
          <div className="mp-msg-row">
            <input
              className="mp-msg-input"
              placeholder="Mesajınızı yazın..."
              value={mesaj}
              onChange={(e) => setMesaj(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleMesajGonder()}
            />
            <button className="mp-btn mp-btn-green" onClick={handleMesajGonder}>Gönder</button>
          </div>
        </div>

        {/* ═══════════════ ALT BÖLÜM ═══════════════ */}
        {tamamlandi && <div className="mp-success">Tebrikler! Bugünü başarıyla tamamladınız. Uyum skorunuz: %{uyumYuzdesi}</div>}

        <div className="mp-footer">
          <button className="mp-btn mp-btn-outline" onClick={handlePdfIndir}>
            📄 PDF İndir
          </button>
          <button className="mp-btn mp-btn-green" onClick={handleTamamla}>
            ✅ Bugünü Tamamladım
          </button>
        </div>

      </div>
    </>
  );
}
