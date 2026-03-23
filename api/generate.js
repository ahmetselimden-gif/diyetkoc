module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
  if (req.method !== 'POST') return res.status(405).end();

  const { ad, yas, cinsiyet, kilo, boy, hedef, aktivite, kalori, sure, notlar, allergies, restrictions } = req.body;

  const prompt = `Sen uzman bir diyetisyensin. Aşağıdaki hastaya özel, detaylı ve uygulanabilir bir Türkçe diyet planı hazırla.

HASTA PROFİLİ:
- Ad Soyad: ${ad || 'Belirtilmedi'}
- Yaş: ${yas} | Cinsiyet: ${cinsiyet} | Kilo: ${kilo}kg | Boy: ${boy}cm
- Hedef: ${hedef} | Aktivite: ${aktivite}
- Günlük Kalori: ${kalori} kcal | Süre: ${sure} gün
- Alerjiler: ${allergies?.length ? allergies.join(', ') : 'Yok'}
- Kısıtlamalar: ${restrictions?.length ? restrictions.join(', ') : 'Yok'}
- Ek Notlar: ${notlar || 'Yok'}

Lütfen şu başlıkları içeren plan hazırla:

## 📊 Hasta Değerlendirmesi
BMI hesapla, hedef analizi yap, öneriler sun.

## 🍽️ Günlük Öğün Planı
Kahvaltı, Sabah Ara Öğün, Öğle, Öğleden Sonra Ara Öğün, Akşam yemeği için somut yiyecek önerileri ve kalori miktarlarını yaz.

## ❌ Kaçınılacak Yiyecekler
Hastanın durumuna özel kaçınılması gereken besinler.

## 💡 Haftalık Tavsiyeler
Pratik öneriler ve motivasyon.

## 💧 Günlük Su & Egzersiz Önerisi
Su tüketimi ve hafif egzersiz önerileri.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    return res.status(200).json({ output: data.content[0].text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};