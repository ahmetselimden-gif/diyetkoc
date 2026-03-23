export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { ad, yas, cinsiyet, kilo, boy, hedef, aktivite, kalori, sure, notlar, allergies, restrictions } = req.body;

    const prompt = `Sen profesyonel bir diyetisyensin. Aşağıdaki hasta bilgilerine göre detaylı bir diyet planı oluştur.

HASTA BİLGİLERİ:
- Ad Soyad: ${ad || 'Belirtilmedi'}
- Yaş: ${yas || 'Belirtilmedi'}
- Cinsiyet: ${cinsiyet}
- Kilo: ${kilo} kg
- Boy: ${boy} cm
- Hedef: ${hedef}
- Aktivite Seviyesi: ${aktivite}
- Günlük Kalori Hedefi: ${kalori} kcal
- Plan Süresi: ${sure} gün
- Alerjiler: ${allergies.length > 0 ? allergies.join(', ') : 'Yok'}
- Kısıtlamalar: ${restrictions.length > 0 ? restrictions.join(', ') : 'Yok'}
- Ek Notlar: ${notlar || 'Yok'}

Lütfen şunları içeren detaylı bir plan yaz:
1. Genel değerlendirme ve öneriler
2. Günlük öğün planı (kahvaltı, ara öğün, öğle, ara öğün, akşam)
3. Kaçınılması gereken yiyecekler
4. Tavsiyeler ve motivasyon notu`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.status(200).json({ output: data.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
```

**`AIPlanUretici.jsx`'de sadece şu satır değişiyor** (zaten `data.output` kullanıyorsun, generate.js'de artık biz `output` döndürüyoruz — bu tamam ✓):

Şimdi **Vercel'de env variable'ı kontrol et:**

Vercel → Project → Settings → Environment Variables'a gir ve şunun var olduğundan emin ol:
```
ANTHROPIC_API_KEY = sk-ant-...