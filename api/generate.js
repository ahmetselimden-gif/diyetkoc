module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
  if (req.method !== 'POST') return res.status(405).end();

  const { ad, yas, cinsiyet, kilo, boy, hedef, aktivite, kalori, sure, notlar, allergies, restrictions } = req.body;

  const prompt = `Sen profesyonel bir diyetisyen yazilimi icin PDF tasarim ureten uzmansin.

Asagidaki hasta bilgilerine gore SADECE HTML uret. CSS dahil olacak.

HASTA: ${ad || 'Belirtilmedi'}, ${yas} yas, ${cinsiyet}, ${kilo}kg, ${boy}cm
HEDEF: ${hedef} | Aktivite: ${aktivite} | Kalori: ${kalori}kcal/gun | Sure: ${sure} gun
ALERJILER: ${allergies?.join(', ') || 'Yok'}
KISITLAMALAR: ${restrictions?.join(', ') || 'Yok'}
NOTLAR: ${notlar || 'Yok'}

AMAC: Nutrium ve profesyonel diyetisyen ciktilari gibi modern, sade ve premium gorunumlu bir diyet plani uret.

KURALLAR:
- SADECE HTML + CSS uret
- Markdown, emoji, yildiz, # vs kullanma
- Turkce karakterleri duzgun kullan
- Responsive degil, A4 PDF icin optimize et
- Temiz ve okunakli tipografi kullan
- Arial veya sans-serif kullan

TASARIM SARTLARI:

1. UST BASLIK (HEADER):
- Sol: buyuk baslik "KISIYE OZEL DIYET LISTESI"
- Sag: diyetisyen adi "Diyetisyen: DiyetPro"
- Altina ince gri cizgi

2. GENEL STIL:
- Acik gri arka plan (#f5f5f5)
- Kartlar beyaz
- Baslik barlari acik yesil (#cfe8c9)
- Border radius: 6px
- Padding duzenli ve ferah

3. HER OGUN BLOGU:
- Ustte yesil bar (baslik): KAHVALTI / OGLE / ARA OGUN / AKSAM
- Altinda beyaz kart: liste seklinde yemekler, sade, kisa, uygulanabilir

4. NOTLAR BOLUMU:
- En altta ayri kart
- Baslik: NOTLAR
- Aciklama paragraf

5. YEMEK KURALLARI:
- Turkiye'de kolay bulunur besinler
- Abarti yok
- Avokado olabilir ama sinirli
- Sogan gibi anlamsiz kahvalti onerileri verme
- Dengelive mantikli ogunler

6. YAPI:
- div class="section"
- div class="section-title"
- div class="card"

7. FONT:
- Basliklar bold
- Metin sade
- Cok kucuk font kullanma

8. CIKTI:
- Tam, calisan HTML ver
- Eksik birakma
- Gorsel olarak duzenli olsun

SONUC: PDF'e cevrildiginde profesyonel diyetisyen ciktisi gibi gorunmeli.

ZORUNLU FORMAT - AYNEN BU YAPIYI KULLAN:

<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 32px; font-size: 11px; color: #1a1a1a; }
.header { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 10px; margin-bottom: 20px; border-bottom: 1.5px solid #ddd; }
.header-title { font-size: 16px; font-weight: 700; color: #1a1a1a; letter-spacing: -0.3px; }
.header-sub { font-size: 10px; color: #888; margin-top: 3px; }
.header-right { text-align: right; font-size: 10px; color: #888; }
.patient-box { background: #fff; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px; border: 1px solid #e8e8e8; }
.patient-name { font-size: 14px; font-weight: 700; margin-bottom: 4px; }
.patient-meta { font-size: 10px; color: #666; }
.section { margin-bottom: 16px; }
.section-title { background: #cfe8c9; color: #1a4a1a; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 7px 12px; border-radius: 6px 6px 0 0; }
.card { background: #fff; border: 1px solid #e8e8e8; border-top: none; border-radius: 0 0 6px 6px; padding: 12px 16px; }
.day-title { font-size: 11px; font-weight: 700; color: #2d6a2d; margin: 10px 0 6px 0; text-transform: uppercase; letter-spacing: 0.04em; }
.day-title:first-child { margin-top: 0; }
.meal-title { font-size: 10px; font-weight: 700; color: #444; margin: 8px 0 3px 0; }
ul { padding-left: 14px; }
li { font-size: 11px; color: #333; margin-bottom: 2px; line-height: 1.5; }
small { font-size: 9px; color: #aaa; display: block; margin-top: 2px; font-style: italic; padding-left: 14px; }
.total { font-size: 10px; font-weight: 600; color: #666; margin-top: 8px; padding-top: 6px; border-top: 1px solid #eee; }
.notes-card { background: #fff; border: 1px solid #e8e8e8; border-radius: 6px; padding: 12px 16px; margin-top: 16px; }
.notes-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #555; margin-bottom: 8px; }
.footer { margin-top: 24px; padding-top: 10px; border-top: 1px solid #e0e0e0; font-size: 9px; color: #bbb; display: flex; justify-content: space-between; }
@media print { body { padding: 20px; } @page { margin: 1cm; size: A4; } }
</style>
</head>
<body>

<div class="header">
<div>
<div class="header-title">KISIYE OZEL DIYET LISTESI</div>
<div class="header-sub">${new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
</div>
<div class="header-right">Diyetisyen: DiyetPro<br>diyetpro.net</div>
</div>

<div class="patient-box">
<div class="patient-name">${ad || 'Hasta'}</div>
<div class="patient-meta">${[yas ? yas + ' yas' : null, cinsiyet, kilo ? kilo + ' kg' : null, boy ? boy + ' cm' : null, hedef, kalori + ' kcal/gun'].filter(Boolean).join('  •  ')}</div>
</div>

<div class="section">
<div class="section-title">Hasta Degerlendirmesi</div>
<div class="card">
<p>[BMI hesapla. Kisa hedef analizi. 2-3 cumle.]</p>
</div>
</div>

<div class="section">
<div class="section-title">Gunluk Ogun Plani — ${sure} Gun</div>
<div class="card">

<div class="day-title">Pazartesi</div>

<div class="meal-title">Kahvalti (300 kcal)</div>
<ul>
<li>2 adet haslanmis yumurta</li>
<li>1 dilim tam bugday ekmek</li>
<li>Domates, salatalik, zeytinyagi</li>
<li>Sade cay</li>
<small>Alternatif: Beyaz peynir eklenebilir</small>
</ul>

<div class="meal-title">Ara Ogun (150 kcal)</div>
<ul>
<li>1 elma</li>
<li>10 adet badem</li>
</ul>

<div class="meal-title">Ogle Yemegi (450 kcal)</div>
<ul>
<li>150g izgara tavuk</li>
<li>1 porsiyon bulgur pilavi</li>
<li>Mevsim salatasi, zeytinyagi</li>
</ul>

<div class="meal-title">Ara Ogun (100 kcal)</div>
<ul>
<li>1 kase sade yogurt</li>
</ul>

<div class="meal-title">Aksam Yemegi (500 kcal)</div>
<ul>
<li>200g firin tavuk but</li>
<li>Haslanmis brokoli, havuc</li>
<li>1 dilim ekmek</li>
</ul>

<p class="total">Gunluk Toplam: ${kalori} kcal</p>

(Sali, Carsamba, Persembe, Cuma, Cumartesi, Pazar icin ayni formatta day-title ve meal-title bloklari olustur — ${sure} gune kadar)

</div>
</div>

<div class="section">
<div class="section-title">Kacınılacak Yiyecekler</div>
<div class="card">
<div class="meal-title">Kesinlikle Yasakli</div>
<ul>
<li>Sekerli icecekler (kola, meyve suyu, ice tea)</li>
<li>Fast food, hazir yemekler</li>
<li>Cips, biskuvi, cikolata, pasta</li>
</ul>
<div class="meal-title">Sinirli Tuketim</div>
<ul>
<li>Beyaz ekmek (gunluk 1 dilim)</li>
<li>Pirinc (azaltilmis miktar)</li>
<li>Meyve (gunluk 2 porsiyon)</li>
</ul>
</div>
</div>

<div class="section">
<div class="section-title">Su ve Egzersiz</div>
<div class="card">
<p>Gunluk en az 2.5 litre su icin. Haftada 3-4 gun 30-45 dakika tempolu yuruyus onerilir.</p>
</div>
</div>

<div class="notes-card">
<div class="notes-title">Notlar</div>
<p>Bu plan bilgilendirme amaclidir. Uygulamadan once diyetisyeninize danismaniz onerilir. Kronik hastaligi olanlarin doktor onaylamasini tavsiye ederiz.</p>
</div>

<div class="footer">
<span>DiyetPro — diyetpro.net</span>
<span>${new Date().toLocaleDateString('tr-TR')}</span>
</div>

</body>
</html>

ONEMLI: Yukaridaki HTML yapısını kullanarak tam ve eksiksiz HTML uret. Sadece body icindeki icerik degisecek, CSS ve yapi ayni kalacak.`;

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