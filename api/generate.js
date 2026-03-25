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

CIKTI KURALLARI - KESINLIKLE UY:
1. Sadece HTML tagleri kullan: h2, h3, h4, p, ul, li, small
2. Kesinlikle emoji kullanma
3. Kesinlikle markdown kullanma (# ## ** - vb. yasak)
4. kcal bilgisini SADECE h4 basliginda goster, yemek satirlarinda kcal yazma
5. Alternatif onerileri sadece small tagiyle ver
6. Tum Turkce karakterleri dogru yaz

CIKTI YAPISI AYNEN BOYLE OLMALI:

<h2>Hasta Degerlendirmesi</h2>
<p>BMI: [hesapla]. [Kisa hedef analizi ve oneriler. 2-3 cumle.]</p>

<h2>Gunluk Ogun Plani</h2>

<h3>Pazartesi</h3>
<h4>Kahvalti (300 kcal)</h4>
<ul>
<li>2 adet haslanmis yumurta</li>
<li>1 dilim tam bugday ekmek</li>
<li>Domates, salatalik</li>
<small>Alternatif: Beyaz peynir eklenebilir</small>
</ul>

<h4>Ara Ogun (150 kcal)</h4>
<ul>
<li>1 elma</li>
<li>30g ceviz</li>
</ul>

<h4>Ogle Yemegi (450 kcal)</h4>
<ul>
<li>150g izgara tavuk</li>
<li>1 porsiyon bulgur pilavi</li>
<li>Yesil salata</li>
</ul>

<h4>Ara Ogun (100 kcal)</h4>
<ul>
<li>200ml sade yogurt</li>
</ul>

<h4>Aksam Yemegi (500 kcal)</h4>
<ul>
<li>200g firin somon</li>
<li>Haslanmis brokoli</li>
<li>1 dilim ekmek</li>
</ul>

<p class="total">Gunluk Toplam: ${kalori} kcal</p>

(Sali, Carsamba, Persembe, Cuma, Cumartesi, Pazar icin ayni format - ${sure} gune kadar)

<h2>Kacинилacak Yiyecekler</h2>
<ul>
<li>Seker ve sekerli icecekler</li>
<li>Hazir ve paketli gidalar</li>
</ul>

<h2>Tavsiyeler</h2>
<ul>
<li>Ogun atlamayin</li>
<li>Porsiyon kontrolune dikkat edin</li>
</ul>

<h2>Su ve Egzersiz</h2>
<p>Gunluk en az 2-2.5 litre su icin. Haftada 3-4 gun 30 dakika yuruyus onerilir.</p>`;

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