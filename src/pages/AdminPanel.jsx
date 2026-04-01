/* eslint-disable */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, signOut } from "../lib/supabase";

const ADMIN_EMAIL = "ahmetselimden@gmail.com";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { min-height: 100vh; font-family: 'DM Sans', sans-serif; background: #f5f2ec; }

  /* Layout */
  .adm-layout { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; }

  /* Sidebar */
  .adm-sidebar { background: #1a2e23; padding: 1.5rem 1rem; display: flex; flex-direction: column; gap: 1.5rem; position: fixed; top: 0; left: 0; bottom: 0; width: 240px; overflow-y: auto; }
  .adm-logo { display: flex; align-items: center; gap: 10px; padding: 0.25rem 0.5rem; cursor: pointer; }
  .adm-logo-mark { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, #f59e0b, #d97706); display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 17px; font-weight: 600; color: #fff; }
  .adm-logo-text { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 400; color: #f5f2ec; letter-spacing: -0.01em; }
  .adm-badge-admin { font-size: 9px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(245,158,11,0.2); color: #f59e0b; padding: 3px 8px; border-radius: 100px; border: 1px solid rgba(245,158,11,0.3); margin-left: 2px; }
  .adm-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }
  .adm-nav-section { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,242,236,0.28); padding: 1rem 0.75rem 0.5rem; font-weight: 500; }
  .adm-nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; font-size: 13.5px; color: rgba(245,242,236,0.55); cursor: pointer; transition: all 0.2s; border: 1px solid transparent; }
  .adm-nav-item:hover { background: rgba(255,255,255,0.06); color: rgba(245,242,236,0.85); }
  .adm-nav-item.active { background: rgba(245,158,11,0.12); color: #f59e0b; border-color: rgba(245,158,11,0.2); }
  .adm-nav-item .icon { font-size: 16px; width: 22px; text-align: center; }
  .adm-sidebar-user { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem; display: flex; align-items: center; gap: 10px; }
  .adm-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #d97706); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; }
  .adm-user-name { font-size: 13px; font-weight: 500; color: #f5f2ec; }
  .adm-user-role { font-size: 11px; color: rgba(245,242,236,0.35); }

  /* Main */
  .adm-main { margin-left: 240px; padding: 2rem 2.5rem; max-width: 1200px; }

  /* Topbar */
  .adm-topbar { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 2rem; gap: 16px; flex-wrap: wrap; }
  .adm-topbar h1 { font-family: 'Fraunces', serif; font-size: 1.6rem; font-weight: 400; color: #1a2e23; letter-spacing: -0.02em; }
  .adm-topbar p { font-size: 13px; color: #8a8378; margin-top: 4px; }
  .adm-topbar-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; padding-top: 4px; }

  /* Tabs */
  .adm-tabs { display: flex; gap: 4px; background: #fff; border: 1px solid #eae6de; border-radius: 12px; padding: 4px; margin-bottom: 1.75rem; width: fit-content; }
  .adm-tab { padding: 8px 18px; border-radius: 8px; font-size: 13.5px; font-weight: 500; cursor: pointer; transition: all 0.15s; color: #8a8378; border: none; background: none; font-family: 'DM Sans', sans-serif; }
  .adm-tab:hover { color: #1a2e23; background: #f5f2ec; }
  .adm-tab.active { background: #1a2e23; color: #f5f2ec; }

  /* Metrics */
  .adm-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 2rem; }
  .adm-metric { background: #fff; border: 1px solid #eae6de; border-radius: 16px; padding: 1.25rem 1.4rem; transition: all 0.2s; }
  .adm-metric:hover { border-color: #d8d3ca; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
  .adm-metric-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .adm-metric-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
  .adm-metric-icon.amber { background: #FEF3C7; }
  .adm-metric-icon.green { background: #EAF3DE; }
  .adm-metric-icon.blue { background: #E3EEF9; }
  .adm-metric-icon.purple { background: #F0E8F8; }
  .adm-metric-label { font-size: 12.5px; color: #8a8378; }
  .adm-metric-val { font-family: 'Fraunces', serif; font-size: 1.85rem; font-weight: 400; color: #1a2e23; line-height: 1; }
  .adm-metric-sub { font-size: 12px; margin-top: 6px; color: #b0aa9f; }

  /* Cards */
  .adm-card { background: #fff; border: 1px solid #eae6de; border-radius: 16px; overflow: hidden; margin-bottom: 1rem; }
  .adm-card-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid #f0ece4; display: flex; align-items: center; justify-content: space-between; }
  .adm-card-title { font-size: 15px; font-weight: 500; color: #1a2e23; }
  .adm-card-sub { font-size: 12px; color: #8a8378; margin-top: 2px; }

  /* Table */
  table.adm-table { width: 100%; border-collapse: collapse; }
  .adm-table thead th { padding: 12px 1.5rem; text-align: left; font-size: 11px; font-weight: 500; color: #b5b0a7; letter-spacing: 0.06em; text-transform: uppercase; border-bottom: 1px solid #f0ece4; }
  .adm-table tbody tr { border-bottom: 1px solid #f7f4ef; transition: background 0.15s; }
  .adm-table tbody tr:hover { background: #faf9f6; }
  .adm-table tbody tr:last-child { border-bottom: none; }
  .adm-table tbody td { padding: 13px 1.5rem; font-size: 13.5px; color: #3a3732; }

  /* Badge */
  .adm-badge { display: inline-block; padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 500; }
  .adm-badge.aktif { background: #EAF3DE; color: #3B6D11; }
  .adm-badge.pasif { background: #FEE2E2; color: #B91C1C; }
  .adm-badge.amber { background: #FEF3C7; color: #92400E; }

  /* Action buttons */
  .adm-action-btn { background: none; border: none; font-size: 13px; cursor: pointer; padding: 5px 10px; border-radius: 7px; transition: all 0.15s; font-family: 'DM Sans', sans-serif; font-weight: 500; }
  .adm-action-btn.danger { color: #B91C1C; }
  .adm-action-btn.danger:hover { background: #FEE2E2; }
  .adm-action-btn.primary { color: #1a2e23; }
  .adm-action-btn.primary:hover { background: #f0ece4; }
  .adm-action-row { display: flex; gap: 4px; align-items: center; }

  /* Buttons */
  .adm-btn { padding: 9px 18px; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer; font-weight: 500; transition: all 0.15s; border: none; }
  .adm-btn-outline { background: #fff; color: #1a2e23; border: 1.5px solid #ddd9d0; }
  .adm-btn-outline:hover { border-color: #c5c0b7; background: #faf9f6; }
  .adm-btn-primary { background: #1a2e23; color: #f5f2ec; }
  .adm-btn-primary:hover { background: #243d2f; }
  .adm-btn-amber { background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; font-weight: 600; }
  .adm-btn-amber:hover { opacity: 0.9; }
  .adm-btn-danger { background: #DC2626; color: #fff; }
  .adm-btn-danger:hover { background: #B91C1C; }

  /* Form */
  .adm-form-field { margin-bottom: 12px; }
  .adm-form-field label { display: block; font-size: 11px; font-weight: 500; color: #5a5650; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 5px; }
  .adm-form-field input, .adm-form-field select, .adm-form-field textarea { width: 100%; padding: 10px 12px; border: 1.5px solid #e4dfd5; border-radius: 10px; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1a2e23; outline: none; transition: border-color 0.15s; resize: vertical; }
  .adm-form-field input:focus, .adm-form-field select:focus, .adm-form-field textarea:focus { border-color: #f59e0b; }

  /* Modal */
  .adm-modal-overlay { position: fixed; inset: 0; background: rgba(26,46,35,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 1rem; }
  .adm-modal { background: #f5f2ec; border-radius: 20px; padding: 2rem; width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 48px rgba(0,0,0,0.15); }
  .adm-modal-title { font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 400; color: #1a2e23; margin-bottom: 0.4rem; }
  .adm-modal-sub { font-size: 13px; color: #8a8378; margin-bottom: 1.5rem; }
  .adm-modal-actions { display: flex; gap: 10px; margin-top: 6px; }

  /* Empty */
  .adm-empty { padding: 3rem; text-align: center; color: #8a8378; font-size: 14px; }
  .adm-loading { padding: 2rem; text-align: center; color: #8a8378; font-size: 13px; }

  /* Info boxes */
  .adm-success { background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #166534; margin-bottom: 12px; }
  .adm-error { background: #FEF2F2; border: 1px solid #FECACA; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #B91C1C; margin-bottom: 12px; }

  /* Coming soon */
  .adm-coming { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 2rem; text-align: center; }
  .adm-coming-icon { width: 64px; height: 64px; border-radius: 20px; background: linear-gradient(135deg, #FEF3C7, #FDE68A); display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 1.25rem; }
  .adm-coming-title { font-family: 'Fraunces', serif; font-size: 1.25rem; font-weight: 400; color: #1a2e23; margin-bottom: 0.5rem; }
  .adm-coming-sub { font-size: 13.5px; color: #8a8378; max-width: 320px; line-height: 1.6; }

  /* Abonelik form */
  .adm-ab-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

  /* Search */
  .adm-search-bar { display: flex; align-items: center; gap: 10px; margin-bottom: 1rem; flex-wrap: wrap; }
  .adm-search-input { flex: 1; min-width: 180px; padding: 9px 14px 9px 34px; border: 1.5px solid #e4dfd5; border-radius: 10px; background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z' stroke='%23b5b0a7' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") 12px center no-repeat; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: #1a2e23; outline: none; transition: border-color 0.15s; }
  .adm-search-input:focus { border-color: #f59e0b; }
  .adm-search-input::placeholder { color: #b5b0a7; }

  /* Responsive */
  @media (max-width: 1100px) { .adm-metrics { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 768px) { .adm-layout { grid-template-columns: 1fr; } .adm-sidebar { display: none; } .adm-main { margin-left: 0; padding: 1.5rem; } .adm-metrics { grid-template-columns: 1fr 1fr; } }
`;

const formatTarih = (iso) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
};

const kisalt = (str, len = 18) => str?.length > len ? str.slice(0, len) + "…" : str || "-";

// ─── Modal: Abonelik Düzenle ─────────────────────────────
function AbonelikModal({ kayit, onKapat, onKaydet }) {
  const [form, setForm] = useState({
    paket: kayit?.paket || "Temel",
    durum: kayit?.durum || "aktif",
    baslangic: kayit?.baslangic || "",
    bitis: kayit?.bitis || "",
    not: kayit?.not || "",
  });

  return (
    <div className="adm-modal-overlay" onClick={onKapat}>
      <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="adm-modal-title">Abonelik Düzenle</div>
        <div className="adm-modal-sub">Diyetisyenin paket ve durum bilgilerini güncelleyin</div>

        <div className="adm-form-field">
          <label>Paket</label>
          <select value={form.paket} onChange={(e) => setForm({ ...form, paket: e.target.value })}>
            <option value="Temel">Temel</option>
            <option value="Pro">Pro</option>
            <option value="Kurumsal">Kurumsal</option>
          </select>
        </div>
        <div className="adm-form-field">
          <label>Durum</label>
          <select value={form.durum} onChange={(e) => setForm({ ...form, durum: e.target.value })}>
            <option value="aktif">Aktif</option>
            <option value="deneme">Deneme</option>
            <option value="pasif">Pasif</option>
            <option value="iptal">İptal</option>
          </select>
        </div>
        <div className="adm-ab-row">
          <div className="adm-form-field">
            <label>Başlangıç</label>
            <input type="date" value={form.baslangic} onChange={(e) => setForm({ ...form, baslangic: e.target.value })} />
          </div>
          <div className="adm-form-field">
            <label>Bitiş</label>
            <input type="date" value={form.bitis} onChange={(e) => setForm({ ...form, bitis: e.target.value })} />
          </div>
        </div>
        <div className="adm-form-field">
          <label>Not</label>
          <textarea rows={2} value={form.not} onChange={(e) => setForm({ ...form, not: e.target.value })} placeholder="İsteğe bağlı not..." />
        </div>

        <div className="adm-modal-actions">
          <button className="adm-btn adm-btn-outline" style={{ flex: 1 }} onClick={onKapat}>İptal</button>
          <button className="adm-btn adm-btn-amber" style={{ flex: 1 }} onClick={() => onKaydet(form)}>Kaydet</button>
        </div>
      </div>
    </div>
  );
}

// ─── Ana Component ────────────────────────────────────────
export default function AdminPanel({ user }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("genel");
  const [yukleniyor, setYukleniyor] = useState(true);
  const [mesaj, setMesaj] = useState({ tip: "", metin: "" });

  // Stats
  const [stats, setStats] = useState({ diyetisyen: 0, musteri: 0, plan: 0, buAy: 0 });

  // Diyetisyenler
  const [koclar, setKoclar] = useState([]);
  const [tumMusteriler, setTumMusteriler] = useState([]);
  const [aramaMusteri, setAramaMusteri] = useState("");
  const [aramaKoc, setAramaKoc] = useState("");

  // Abonelikler
  const [abonelikler, setAbonelikler] = useState([]);
  const [abonelikModal, setAbonelikModal] = useState(null); // { koc_id, ... }

  useEffect(() => {
    if (user?.email !== ADMIN_EMAIL) {
      navigate("/dashboard");
      return;
    }
    veriYukle();
  }, [user]);

  const veriYukle = async () => {
    setYukleniyor(true);

    // Tüm müşteriler
    const { data: musteriler } = await supabase
      .from("musteriler")
      .select("*")
      .order("created_at", { ascending: false });

    const liste = musteriler || [];

    // Koç bazlı gruplama
    const kocMap = {};
    liste.forEach((m) => {
      const kid = m.koc_id;
      if (!kocMap[kid]) {
        kocMap[kid] = { koc_id: kid, musteriSayisi: 0, aktifSayisi: 0, ilkEkleme: m.created_at, sonEkleme: m.created_at };
      }
      kocMap[kid].musteriSayisi++;
      if (m.aktif) kocMap[kid].aktifSayisi++;
      if (new Date(m.created_at) < new Date(kocMap[kid].ilkEkleme)) kocMap[kid].ilkEkleme = m.created_at;
      if (new Date(m.created_at) > new Date(kocMap[kid].sonEkleme)) kocMap[kid].sonEkleme = m.created_at;
    });

    const kocListesi = Object.values(kocMap);

    // Plan sayısı
    const { count: planSayisi } = await supabase
      .from("planlar")
      .select("*", { count: "exact", head: true });

    // Bu ay eklenen müşteriler
    const simdi = new Date();
    const buAy = liste.filter((m) => {
      const d = new Date(m.created_at);
      return d.getMonth() === simdi.getMonth() && d.getFullYear() === simdi.getFullYear();
    }).length;

    // Abonelikler tablosunu dene
    const { data: abData } = await supabase.from("abonelikler").select("*");

    setStats({
      diyetisyen: kocListesi.length,
      musteri: liste.length,
      plan: planSayisi || 0,
      buAy,
    });
    setTumMusteriler(liste);
    setKoclar(kocListesi);
    setAbonelikler(abData || []);
    setYukleniyor(false);
  };

  const musteriSil = async (id) => {
    if (!window.confirm("Bu müşteriyi kalıcı olarak silmek istediğinize emin misiniz?")) return;
    const { error } = await supabase.from("musteriler").delete().eq("id", id);
    if (error) { setMesaj({ tip: "error", metin: "Silinemedi: " + error.message }); return; }
    setMesaj({ tip: "success", metin: "Müşteri silindi." });
    setTimeout(() => setMesaj({ tip: "", metin: "" }), 2500);
    veriYukle();
  };

  const kocaMusteriSil = async (kocId) => {
    if (!window.confirm("Bu diyetisyene ait TÜM müşterileri silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) return;
    const { error } = await supabase.from("musteriler").delete().eq("koc_id", kocId);
    if (error) { setMesaj({ tip: "error", metin: "Hata: " + error.message }); return; }
    setMesaj({ tip: "success", metin: "Diyetisyenin tüm müşterileri silindi." });
    setTimeout(() => setMesaj({ tip: "", metin: "" }), 2500);
    veriYukle();
  };

  const abonelikKaydet = async (form) => {
    if (!abonelikModal) return;
    const mevcut = abonelikler.find((a) => a.koc_id === abonelikModal.koc_id);
    if (mevcut) {
      await supabase.from("abonelikler").update(form).eq("koc_id", abonelikModal.koc_id);
    } else {
      await supabase.from("abonelikler").insert([{ ...form, koc_id: abonelikModal.koc_id }]);
    }
    setAbonelikModal(null);
    setMesaj({ tip: "success", metin: "Abonelik güncellendi." });
    setTimeout(() => setMesaj({ tip: "", metin: "" }), 2500);
    veriYukle();
  };

  const abonelikSil = async (kocId) => {
    if (!window.confirm("Bu diyetisyenin aboneliğini silmek istediğinize emin misiniz?")) return;
    await supabase.from("abonelikler").delete().eq("koc_id", kocId);
    setMesaj({ tip: "success", metin: "Abonelik silindi." });
    setTimeout(() => setMesaj({ tip: "", metin: "" }), 2500);
    veriYukle();
  };

  const filtreliMusteriler = tumMusteriler.filter((m) =>
    aramaMusteri === "" || `${m.ad} ${m.soyad} ${m.email || ""}`.toLowerCase().includes(aramaMusteri.toLowerCase())
  );

  const filtreliKoclar = koclar.filter((k) =>
    aramaKoc === "" || k.koc_id.toLowerCase().includes(aramaKoc.toLowerCase())
  );

  // ─── Sidebar ────────────────────────────────────────────
  const Sidebar = () => (
    <div className="adm-sidebar">
      <div className="adm-logo" onClick={() => navigate("/dashboard")}>
        <div className="adm-logo-mark">A</div>
        <div>
          <div className="adm-logo-text">diyetkoc</div>
        </div>
      </div>

      <div className="adm-nav">
        <div className="adm-nav-section">Admin Panel</div>
        {[
          { key: "genel", icon: "📊", label: "Genel Bakış" },
          { key: "diyetisyenler", icon: "👤", label: "Diyetisyenler" },
          { key: "musteriler", icon: "👥", label: "Tüm Müşteriler" },
          { key: "abonelikler", icon: "💳", label: "Abonelikler" },
        ].map((item) => (
          <div
            key={item.key}
            className={`adm-nav-item ${activeTab === item.key ? "active" : ""}`}
            onClick={() => setActiveTab(item.key)}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </div>
        ))}

        <div className="adm-nav-section" style={{ marginTop: "1rem" }}>Navigasyon</div>
        <div className="adm-nav-item" onClick={() => navigate("/dashboard")}>
          <span className="icon">⬅️</span>
          Dashboard'a Dön
        </div>
      </div>

      <div className="adm-sidebar-user">
        <div className="adm-avatar">AS</div>
        <div>
          <div className="adm-user-name">Admin</div>
          <div className="adm-user-role">{user?.email}</div>
        </div>
      </div>
    </div>
  );

  // ─── Genel Bakış ────────────────────────────────────────
  const GenelBakis = () => {
    const sonKayitlar = tumMusteriler.slice(0, 8);
    return (
      <>
        <div className="adm-metrics">
          {[
            { icon: "👤", cls: "amber", val: stats.diyetisyen, label: "Diyetisyen", sub: "Kayıtlı koç" },
            { icon: "👥", cls: "green", val: stats.musteri, label: "Toplam Müşteri", sub: "Tüm platformda" },
            { icon: "📋", cls: "blue", val: stats.plan, label: "Toplam Plan", sub: "Oluşturulan plan" },
            { icon: "✨", cls: "purple", val: stats.buAy, label: "Bu Ay Yeni", sub: "Yeni müşteri" },
          ].map((m, i) => (
            <div className="adm-metric" key={i}>
              <div className="adm-metric-top">
                <div className={`adm-metric-icon ${m.cls}`}>{m.icon}</div>
                <div className="adm-metric-label">{m.label}</div>
              </div>
              <div className="adm-metric-val">{yukleniyor ? "—" : m.val}</div>
              <div className="adm-metric-sub">{m.sub}</div>
            </div>
          ))}
        </div>

        <div className="adm-card">
          <div className="adm-card-header">
            <div>
              <div className="adm-card-title">Son Kayıtlar</div>
              <div className="adm-card-sub">En son eklenen müşteriler</div>
            </div>
          </div>
          {yukleniyor ? <div className="adm-loading">Yükleniyor...</div> : sonKayitlar.length === 0 ? (
            <div className="adm-empty">Henüz müşteri yok.</div>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Müşteri</th>
                  <th>Hedef</th>
                  <th>Koç ID</th>
                  <th>Kayıt Tarihi</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {sonKayitlar.map((m) => (
                  <tr key={m.id}>
                    <td><strong>{m.ad} {m.soyad}</strong><br /><span style={{ fontSize: 12, color: "#8a8378" }}>{m.email || "—"}</span></td>
                    <td>{m.hedef || "—"}</td>
                    <td style={{ fontFamily: "monospace", fontSize: 12, color: "#8a8378" }}>{m.koc_id?.slice(0, 8)}…</td>
                    <td>{formatTarih(m.created_at)}</td>
                    <td><span className={`adm-badge ${m.aktif ? "aktif" : "pasif"}`}>{m.aktif ? "Aktif" : "Pasif"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </>
    );
  };

  // ─── Diyetisyenler ─────────────────────────────────────
  const Diyetisyenler = () => (
    <>
      <div className="adm-card">
        <div className="adm-card-header">
          <div>
            <div className="adm-card-title">Diyetisyenler</div>
            <div className="adm-card-sub">{koclar.length} kayıtlı koç</div>
          </div>
        </div>
        <div style={{ padding: "1rem 1.5rem 0" }}>
          <div className="adm-search-bar">
            <input
              className="adm-search-input"
              placeholder="Koç ID ile ara..."
              value={aramaKoc}
              onChange={(e) => setAramaKoc(e.target.value)}
            />
          </div>
        </div>
        {yukleniyor ? <div className="adm-loading">Yükleniyor...</div> : filtreliKoclar.length === 0 ? (
          <div className="adm-empty">Diyetisyen bulunamadı.</div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Koç ID</th>
                <th>Müşteri Sayısı</th>
                <th>Aktif Müşteri</th>
                <th>İlk Kayıt</th>
                <th>Son Aktivite</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filtreliKoclar.map((k) => (
                <tr key={k.koc_id}>
                  <td style={{ fontFamily: "monospace", fontSize: 12, color: "#5a5650" }}>{k.koc_id}</td>
                  <td><strong>{k.musteriSayisi}</strong></td>
                  <td><span className="adm-badge aktif">{k.aktifSayisi} aktif</span></td>
                  <td>{formatTarih(k.ilkEkleme)}</td>
                  <td>{formatTarih(k.sonEkleme)}</td>
                  <td>
                    <div className="adm-action-row">
                      <button
                        className="adm-action-btn danger"
                        onClick={() => kocaMusteriSil(k.koc_id)}
                        title="Tüm müşterileri sil"
                      >
                        🗑 Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );

  // ─── Tüm Müşteriler ────────────────────────────────────
  const TumMusteriler = () => (
    <div className="adm-card">
      <div className="adm-card-header">
        <div>
          <div className="adm-card-title">Tüm Müşteriler</div>
          <div className="adm-card-sub">{tumMusteriler.length} kayıt</div>
        </div>
      </div>
      <div style={{ padding: "1rem 1.5rem 0" }}>
        <div className="adm-search-bar">
          <input
            className="adm-search-input"
            placeholder="Ad, soyad veya e-posta..."
            value={aramaMusteri}
            onChange={(e) => setAramaMusteri(e.target.value)}
          />
        </div>
      </div>
      {yukleniyor ? <div className="adm-loading">Yükleniyor...</div> : filtreliMusteriler.length === 0 ? (
        <div className="adm-empty">Müşteri bulunamadı.</div>
      ) : (
        <table className="adm-table">
          <thead>
            <tr>
              <th>Müşteri</th>
              <th>Hedef</th>
              <th>Kilo / Boy</th>
              <th>Koç</th>
              <th>Kayıt</th>
              <th>Durum</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filtreliMusteriler.map((m) => (
              <tr key={m.id}>
                <td>
                  <strong>{m.ad} {m.soyad}</strong>
                  <br />
                  <span style={{ fontSize: 12, color: "#8a8378" }}>{m.email || "—"}</span>
                </td>
                <td>{m.hedef || "—"}</td>
                <td style={{ fontSize: 12, color: "#5a5650" }}>
                  {m.kilo ? `${m.kilo} kg` : "—"} / {m.boy ? `${m.boy} cm` : "—"}
                </td>
                <td style={{ fontFamily: "monospace", fontSize: 11, color: "#8a8378" }}>
                  {m.koc_id?.slice(0, 8)}…
                </td>
                <td style={{ fontSize: 12 }}>{formatTarih(m.created_at)}</td>
                <td><span className={`adm-badge ${m.aktif ? "aktif" : "pasif"}`}>{m.aktif ? "Aktif" : "Pasif"}</span></td>
                <td>
                  <button className="adm-action-btn danger" onClick={() => musteriSil(m.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  // ─── Abonelikler ────────────────────────────────────────
  const Abonelikler = () => {
    const abMap = {};
    abonelikler.forEach((a) => { abMap[a.koc_id] = a; });

    return (
      <div className="adm-card">
        <div className="adm-card-header">
          <div>
            <div className="adm-card-title">Abonelikler</div>
            <div className="adm-card-sub">Diyetisyen paket ve durum yönetimi</div>
          </div>
        </div>
        {koclar.length === 0 ? (
          <div className="adm-empty">Henüz diyetisyen yok.</div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Koç ID</th>
                <th>Müşteri</th>
                <th>Paket</th>
                <th>Durum</th>
                <th>Bitiş</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {koclar.map((k) => {
                const ab = abMap[k.koc_id];
                return (
                  <tr key={k.koc_id}>
                    <td style={{ fontFamily: "monospace", fontSize: 11, color: "#5a5650" }}>{k.koc_id?.slice(0, 12)}…</td>
                    <td>{k.musteriSayisi}</td>
                    <td>{ab?.paket || <span style={{ color: "#b5b0a7" }}>—</span>}</td>
                    <td>
                      {ab ? (
                        <span className={`adm-badge ${ab.durum === "aktif" ? "aktif" : ab.durum === "deneme" ? "amber" : "pasif"}`}>
                          {ab.durum}
                        </span>
                      ) : (
                        <span className="adm-badge pasif">tanımsız</span>
                      )}
                    </td>
                    <td style={{ fontSize: 12 }}>{ab?.bitis ? formatTarih(ab.bitis) : "—"}</td>
                    <td>
                      <div className="adm-action-row">
                        <button
                          className="adm-action-btn primary"
                          onClick={() => setAbonelikModal({ ...k, ...(ab || {}) })}
                        >
                          ✏️ Düzenle
                        </button>
                        {ab && (
                          <button className="adm-action-btn danger" onClick={() => abonelikSil(k.koc_id)}>
                            🗑
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  // ─── Render ─────────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>
      <div className="adm-layout">
        <Sidebar />
        <div className="adm-main">
          <div className="adm-topbar">
            <div className="adm-topbar-left">
              <h1>
                Admin Paneli{" "}
                <span className="adm-badge-admin">ADMIN</span>
              </h1>
              <p>Platform yönetimi ve istatistikler</p>
            </div>
            <div className="adm-topbar-right">
              <button className="adm-btn adm-btn-outline" onClick={veriYukle}>
                🔄 Yenile
              </button>
              <button
                className="adm-btn adm-btn-outline"
                onClick={async () => { await signOut(); navigate("/giris"); }}
              >
                Çıkış
              </button>
            </div>
          </div>

          {mesaj.metin && (
            <div className={mesaj.tip === "success" ? "adm-success" : "adm-error"}>
              {mesaj.metin}
            </div>
          )}

          <div className="adm-tabs">
            {[
              { key: "genel", label: "📊 Genel Bakış" },
              { key: "diyetisyenler", label: "👤 Diyetisyenler" },
              { key: "musteriler", label: "👥 Müşteriler" },
              { key: "abonelikler", label: "💳 Abonelikler" },
            ].map((t) => (
              <button
                key={t.key}
                className={`adm-tab ${activeTab === t.key ? "active" : ""}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === "genel" && <GenelBakis />}
          {activeTab === "diyetisyenler" && <Diyetisyenler />}
          {activeTab === "musteriler" && <TumMusteriler />}
          {activeTab === "abonelikler" && <Abonelikler />}
        </div>
      </div>

      {abonelikModal && (
        <AbonelikModal
          kayit={abonelikModal}
          onKapat={() => setAbonelikModal(null)}
          onKaydet={abonelikKaydet}
        />
      )}
    </>
  );
}
