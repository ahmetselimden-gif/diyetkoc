module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
  if (req.method !== 'POST') return res.status(405).end();

  const { ad, yas, cinsiyet, kilo, boy, hedef, aktivite, kalori, sure, notlar, allergies, restrictions } = req.body;

  const prompt = `Sen profesyonel bir diyetisyensin. Asagidaki hastaya ozel Turkce diyet plani hazirla.

HASTA: ${ad || 'Belirtilmedi'}, ${yas} yas, ${cinsiyet}, ${kilo}kg, ${boy}cm
HEDEF: ${hedef} | Aktivite: ${aktivite} | Kalori: ${kalori}kcal/gun | Sure: ${sure} gun
ALERJILER: ${allergies?.join(', ') || 'Yok'}
KISITLAMALAR: ${restrictions?.join(', ') || 'Yok'}
NOTLAR: ${notlar || 'Yok'}

KESIN KURALLAR - UYMAYAN CEVAP GECERSIZDIR:
- Sadece duz metin yaz
- HTML, markdown, emoji, #, **, -, | kullanma
- Kod blogu kullanma
- Turkce karakterleri dogru yaz

FORMAT (AYNEN BU SEKILDE YAZ):

HASTA DEGERLENDIRMESI
BMI hesapla. 2-3 cumle hedef analizi.

GUNLUK OGUN PLANI

PAZARTESİ

Kahvalti (300 kcal)
- 2 adet haslanmis yumurta
- 1 dilim tam bugday ekmek
- Domates, salatalik
- Sade cay
Alternatif: Beyaz peynir eklenebilir

Ara Ogun (150 kcal)
- 1 elma
- 10 adet badem

Ogle Yemegi (450 kcal)
- 150g izgara tavuk
- 1 porsiyon bulgur pilavi
- Mevsim salatasi

Ara Ogun (100 kcal)
- 1 kase sade yogurt

Aksam Yemegi (500 kcal)
- 200g firin tavuk but
- Haslanmis brokoli yada karnabahar
- 1 dilim ekmek

Gunluk Toplam: ${kalori} kcal

(SALI, CARSAMBA, PERSEMBE, CUMA, CUMARTESI, PAZAR icin ayni format - toplamda ${sure} gun)

KACINILACAK YIYECEKLER
- Sekerli icecekler
- Fast food ve hazir yemekler

TAVSIYELER
- Ogun atlamayin
- Bol su icin

SU VE EGZERSIZ
Gunluk 2.5 litre su icin. Haftada 3 gun 30 dk yuruyus onerilir.

YEMEK KURALLARI:
- Turkiye'de kolay bulunur yiyecekler sec
- Pratik ve uygulanabilir ogunler olustur
- Dengelive mantikli beslenme sagla`;

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