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

SADECE HTML uret.

AMAC:
Nutrium tarzinda, profesyonel, sade ve premium gorunumlu bir diyet plani olustur.

GENEL KURALLAR:
- Markdown kullanma (#, ##, -, |, ** kesinlikle yasak)
- Emoji kullanma
- Sadece HTML tagleri kullan: div, h2, h3, h4, p, ul, li, small, span
- Turkce karakterleri duzgun yaz (c, g, i, o, s, u ve uzantilari)
- Alt cizgi (_) kullanma
- Tabloyu | ile olusturma
- Duz metin uretme
- Kod blogu kullanma
- Eger HTML disinda bir sey uretirsen cevap gecersiz sayilir

BESIN KURALLARI:
- Gunluk hayatta kolay bulunabilen besinler kullan
- Turkiye'de yaygin gidalar tercih et (yumurta, tavuk, yogurt, peynir, sebzeler, elma, muz, portakal, bulgur, pilav, makarna)
- Sofistike ve pahali urunlerden kacin (chia, quinoa, badem sutu, ithal urunler yasak)
- Kahvaltida alisilagelmus seyler yaz
- Ogunler mantikli ve uygulanabilir olsun

DENGE:
- Protein + karbonhidrat + sebze dengesi olsun
- Tek tip beslenme olusturma
- Pratik yemekler yaz
- Calisan insanin uygulayabilecegi plan olustur

FORMAT (ZORUNLU) - AYNEN BU YAPIDA URET:

<div class="header">
<span class="logo">DiyetPro</span>
<span class="date">${new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
</div>

<div class="patient-box">
<div class="patient-name">${ad || 'Hasta'}</div>
<div class="patient-meta">${[yas ? yas + ' yas' : null, cinsiyet, kilo ? kilo + ' kg' : null, boy ? boy + ' cm' : null, hedef, kalori + ' kcal/gun'].filter(Boolean).join(' • ')}</div>
</div>

<h2>Hasta Degerlendirmesi</h2>
<p>BMI: [hesapla]. [Kisa hedef analizi. 2-3 cumle maksimum.]</p>

<h2>Gunluk Ogun Plani</h2>

<div class="days">

<div class="day">
<h3>Pazartesi</h3>

<h4>Kahvalti (300 kcal)</h4>
<ul>
<li>2 adet haslanmis yumurta</li>
<li>1 dilim tam bugday ekmek</li>
<li>Domates, salatalik</li>
<li>Seksersiz cay</li>
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
<li>200g firin tavuk</li>
<li>Haslanmis sebze</li>
<li>1 dilim ekmek</li>
</ul>

<p class="total">Toplam: ${kalori} kcal</p>
</div>

(Sali, Carsamba, Persembe, Cuma, Cumartesi, Pazar icin ayni formatta div class="day" blogu olustur - ${sure} gune kadar)

</div>

<h2>Kacинилacak Yiyecekler</h2>

<h3>Kesinlikle Yasakli</h3>
<ul>
<li>Sekerli icecekler (kola, meyve suyu)</li>
<li>Fast food ve hazir yemekler</li>
<li>Cips, biskuvi, seker</li>
</ul>

<h3>Sinirli Tuketim</h3>
<ul>
<li>Beyaz ekmek (haftada 2-3 dilim)</li>
<li>Pirinc (azaltilmis miktar)</li>
</ul>

<h2>Tavsiyeler</h2>
<ul>
<li>Ogun atlamayin</li>
<li>Porsiyon kontrolune dikkat edin</li>
<li>Her gun duzenli yuruyus yapin</li>
</ul>

<h2>Su ve Egzersiz</h2>
<p>Gunluk en az 2.5 litre su icin. Haftada 3-4 gun 30 dakika yuruyus onerilir.</p>

<div class="footer">
<p>DiyetPro — diyetpro.net — Bu plan bilgilendirme amaclidir. Uygulamadan once diyetisyeninize danismaniz onerilir.</p>
</div>

SON: Cikti HER ZAMAN bu formatta olsun. Tasarim sade, modern ve profesyonel olsun.`;

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