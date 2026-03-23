module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { ad, yas, cinsiyet, kilo, boy, hedef, aktivite, kalori, sure, notlar, allergies, restrictions } = req.body;

    const prompt = `Sen profesyonel bir diyetisyensin. Türkçe detaylı diyet planı oluştur.

HASTA: ${ad}, ${yas} yaş, ${cinsiyet}, ${kilo}kg, ${boy}cm
HEDEF: ${hedef}, Aktivite: ${aktivite}, Kalori: ${kalori}kcal, Süre: ${sure} gün
ALERJİLER: ${allergies?.join(', ') || 'Yok'}
KISITLAMALAR: ${restrictions?.join(', ') || 'Yok'}
NOTLAR: ${notlar || 'Yok'}

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
    if (data.error) return res.status(500).json({ error: data.error.messa