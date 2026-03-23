'use client'; // Next.js App Router için şarttır

import React, { useState } from 'react';

export default function AIPlanUretici() {
  // State tanımlamaları
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Erkek',
    weight: '',
    height: '',
    goal: 'kilo-verme',
    activity: 'orta',
    calorie: '',
    duration: '30',
    allergies: '',
    restrictions: '',
    notes: ''
  });

  // Input değişimlerini yakalayan fonksiyon
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // PLAN ÜRETME FONKSİYONU
  const handleGenerate = async (e) => {
    // ÖNEMLİ: Sayfanın yenilenmesini durdurur
    if (e) e.preventDefault();
    
    setLoading(true);
    setPlan('Plan hazırlanıyor, lütfen bekleyin...');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('API yanıt vermedi.');

      const data = await response.json();
      setPlan(data.output || 'Plan oluşturulamadı.');
    } catch (error) {
      console.error("Hata:", error);
      setPlan('Bir hata oluştu. Lütfen API anahtarını ve internet bağlantınızı kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  // YAZDIRMA / PLAN AL FONKSİYONU
  const handlePrint = (e) => {
    if (e) e.preventDefault();
    if (!plan) return alert("Önce bir plan üretmelisiniz!");
    window.print();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>AI Diyet ve Plan Oluşturucu</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* SOL TARAF: FORM */}
        <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
          <h3>Kullanıcı Bilgileri</h3>
          <form onSubmit={handleGenerate}>
            <div style={{ marginBottom: '10px' }}>
              <label>İsim:</label>
              <input style={{ width: '100%' }} name="name" onChange={handleChange} />
            </div>
            {/* Diğer inputları buraya ekleyebilirsin */}
            
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button 
                type="button" 
                onClick={handleGenerate} 
                disabled={loading}
                style={{ 
                  padding: '10px 20px', 
                  background: loading ? '#ccc' : '#0070f3', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px',
                  cursor: 'pointer' 
                }}
              >
                {loading ? 'Hazırlanıyor...' : 'Plan Üret'}
              </button>

              <button 
                type="button" 
                onClick={handlePrint}
                style={{ 
                  padding: '10px 20px', 
                  background: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px',
                  cursor: 'pointer' 
                }}
              >
                Planı Al (Yazdır)
              </button>
            </div>
          </form>
        </div>

        {/* SAĞ TARAF: SONUÇ */}
        <div style={{ background: 'white', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', minHeight: '400px' }}>
          <h3>Oluşturulan Plan</h3>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {plan || "Bilgileri girip 'Plan Üret' butonuna basın."}
          </div>
        </div>

      </div>
    </div>
  );
}