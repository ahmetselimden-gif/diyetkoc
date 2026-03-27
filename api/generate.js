module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
  if (req.method !== 'POST') return res.status(405).end();

  const { ad, yas, cinsiyet, kilo, boy, hedef, aktivite, kalori, sure, notlar, allergies, restrictions } = req.body;

  const prompt = `
Sen profesyonel bir diyetisyensin. Asagidaki hastaya ozel Turkce diyet plani hazirla.

HASTA:
${ad || 'Belirtilmedi'}, ${yas} yas, ${cinsiyet}, ${kilo} kg, ${boy} cm
HEDEF: ${hedef}
Aktivite: ${aktivite}
Kalori: ${kalori} kcal/gun
Sure: ${sure} gun

ALERJILER: ${allergies?.join(', ') || 'Yok'}
KISITLAMALAR: ${restrictions?.join(', ') || 'Yok'}
NOTLAR: ${notlar || 'Yok'}


COK ONEMLI KURALLAR:

- Sadece ogun listesi yaz
- Asla uzun aciklama yazma
- Paragraf yazma
- "Hasta degerlendirmesi" gibi bolumler ekleme
- Gereksiz bilgi verme

FORMAT:

Her gun icin su sekilde yaz:

PAZARTESI

Kahvalti
- 2 yumurta
- 1 dilim ekmek
- domates salatalik

Ara Ogun
- 1 meyve

Ogle
- 150g tavuk
- pilav
- salata

Ara Ogun
- yogurt

Aksam
- sebze yemegi
- yogurt


EK KURALLAR:

- Her ogun maksimum 4 madde olsun
- Maddeler tek satir olsun
- Alternatif varsa sadece 1 tane yaz
- Gunluk toplam kalori en sona yaz

EN ONEMLI:

- Kisa yaz
- Sade yaz
- Profesyonel gorunsun
- Turkiye'de kolay bulunabilen besinler kullan (yumurta, tavuk, pilav, yogurt vs)
- Asla gereksiz detay verme

`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
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