'use client';

import React, { useState } from 'react';

export default function AIPlanUretici() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState('');
  const [formData, setFormData] = useState({
    name: '', age: '', gender: 'Erkek', weight: '', height: '',
    goal: 'kilo-verme', activity: 'orta', calorie: '', duration: '30',
    allergies: '', restrictions: '', notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setPlan('Plan hazırlanıyor, lütfen bekleyin...');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setPlan(data.output || 'Plan oluşturulamadı.');
    } catch (error) {
      setPlan('Bir hata oluştu. API bağlantısını kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>AI Diyet ve Plan Oluşturucu</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* SOL PANEL: FORM */}
        <div style={{ background: '#ffffff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Kullanıcı Bilgileri</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <div>
              <label>İsim:</label>
              <input style={inputStyle} name="name" onChange={handleChange} placeholder="Ahmet..." />
            </div>
            <div>
              <label>Yaş:</label>
              <input style={inputStyle} type="number" name="age" onChange={handleChange} />
            </div>
            <div>
              <label>Boy (cm):</label>
              <input style={inputStyle} type="number" name="height" onChange={handleChange} />
            </div>
            <div>
              <label>Kilo (kg):</label>
              <input style={inputStyle} type="number" name="weight" onChange={handleChange} />
            </div>
          </div>

          <div style={{ marginTop: '15px' }}>
            <label>Hedef:</label>
            <select style={inputStyle} name="goal" onChange={handleChange}>
              <option value="kilo-verme">Kilo Verme</option>
              <option value="kas-kutlesi">Kas Kütlesi Artışı</option>
              <option value="saglikli-yasam">Sağlıklı Yaşam</option>
            </select>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
            <button type="button" onClick={handleGenerate} disabled={loading} style={btnPrimary}>
              {loading ? 'Hazırlanıyor...' : 'Plan Üret'}
            </button>
            <button type="button" onClick={() => window.print()} style={btnSuccess}>
              Planı Al (Yazdır)
            </button>
          </div>
        </div>

        {/* SAĞ PANEL: SONUÇ */}
        <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', border: '1px solid #ddd', minHeight: '500px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Oluşturulan Plan</h3>
          <div style={{ whiteSpace: 'pre-wrap', color: '#555', lineHeight: '1.6', marginTop: '15px' }}>
            {plan || "Bilgileri girip 'Plan Üret' butonuna basın. Yapay zeka size özel planı burada hazırlayacaktır."}
          </div>
        </div>
      </div>
    </div>
  );
}

// Stil Nesneleri
const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' };
const btnPrimary = { flex: 1, padding: '12px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const btnSuccess = { flex: 1, padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };