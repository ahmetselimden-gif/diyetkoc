export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { ad, yas, cinsiyet, kilo, boy, hedef, aktivite, kalori, sure, notlar, allergies, restrictions } = req.body;

    const prompt = `Sen profesyonel bir diyetisyensin. Aşağıdaki hasta bilgilerine göre detaylı Türkçe diyet planı oluştur.

HASTA BİLGİLERİ:
- Ad Soyad: ${ad || 'Belirtilmedi'}
- Yaş: ${yas || 'Belirtilmedi'}
- Cinsiyet: ${cinsiyet}
- Kilo: ${kilo} kg / Boy: ${boy} cm
- Hedef: ${hedef}
- Aktivite: ${aktivite}
- Günlük Kalori: ${kalori} kcal
- Süre: ${sure} gün
- Alerjiler: ${allergies?.length > 0 ? allergies.join(', ') : 'Yok'}
- Kısıtlamalar: ${restrictions?.length > 0 ? restrictions.join(', ') : 'Yok'}
- Notlar: ${notlar || 'Yok'}

Şunları içeren detaylı plan yaz:
1. Genel değerlendirme
2. Günlük öğün planı (kahvaltı, ara öğün, öğle, ara öğün, akşam)
3. Kaçınılacak yiyecekler
4. Tavsiyeler`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.status