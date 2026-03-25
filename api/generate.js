module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
  if (req.method !== 'POST') return res.status(405).end();

  const { ad, yas, cinsiyet, kilo, boy, hedef, aktivite, kalori, sure, notlar, allergies, restrictions } = req.body;

  const prompt = `Sen profesyonel bir diyetisyensin. Aşağıdaki hastaya özel diyet planı hazırla.

HASTA: ${ad || 'Belirtilmedi'}, ${yas} yaş, ${cinsiyet}, ${kilo}kg, ${boy}cm
HEDEF: ${hedef} | Aktivite: ${aktivite} | Kalori: ${kalori}kcal/gün | Süre: ${sure} gün
ALERJILER: ${allergies?.join(', ') || 'Yok'}
KISITLAMALAR: ${restrictions?.join(', ') || 'Yok'}
NOTLAR: ${notlar || 'Yok'}

CIKTI FORMATI: Sadece asagidaki HTML yapisini kullan. Markdown kullanma. Emoji kullanma. # ## ** gibi isaretler kullanma. Sadece HTML tagleri kullan.

<h2>Hasta Degerlendirmesi</h2>
<p>BMI hesapla, hedef analizi yap, kisa oneriler sun. Duz metin.</p>

<h2>Gunluk Ogun Plani</h2>

<h3>Pazartesi</h3>

<h4>Kahvalti (300 kcal)</h4>
<ul>
<li>2 adet haslanmis yumurta</li>
<li>1 dilim tam bugday ekmek</li>
<li>Domates, salatalik</li>
<li>Seksersiz cay</li>
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
<li>1 kase yogurt</li>
</ul>

<h4>Aksam Yemegi (500 kcal)</h4>
<ul>
<li>200g firin somon</li>
<li>Haslanmis sebze</li>
</ul>

<p class="total">Gunluk Toplam: ${kalori} kcal</p>

(${sure} gune kadar devam et, her gun icin ayni format)

<h2>Kacинилacak Yiyecekler</h2>
<ul>
<li>...</li>
</ul>

<h2>Tavsiyeler</h2>
<ul>
<li>...</li>
</ul>

<h2>Su ve Egzersiz</h2>
<p>Gunluk su tuketimi ve hafif egzersiz onerisi.</p>

ONEMLI KURALLAR:
- Sadece HTML tagleri kullan: h2, h3, h4, p, ul, li, small
- Kesinlikle emoji kullanma
- Kesinlikle markdown kullanma
- kcal bilgisini sadece h4 basliginda goster
- Alternatif onerileri <small> tagiyle ver
- Tum Turkce karakterleri dogru yaz (a, i, u, o, s, g, c ve uzantilari)`;

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