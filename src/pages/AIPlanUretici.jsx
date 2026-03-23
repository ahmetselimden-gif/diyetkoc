import { useState } from "react";

export default function AIPlanUretici() {
  const [form, setForm] = useState({
    ad: "",
    yas: "",
    cinsiyet: "Kadın",
    kilo: "",
    boy: "",
    hedef: "kilo-verme",
    aktivite: "orta",
    kalori: "1500",
    sure: "7",
    notlar: ""
  });

  const [status, setStatus] = useState("idle");
  const [streamText, setStreamText] = useState("");

  const buildPrompt = () => {
    return `Sen bir uzman Türk diyetisyenisin.

Ad: ${form.ad}
Yaş: ${form.yas}
Cinsiyet: ${form.cinsiyet}
Kilo: ${form.kilo}
Boy: ${form.boy}
Hedef: ${form.hedef}
Kalori: ${form.kalori}

7 günlük diyet planı hazırla.`;
  };

  const handleGenerate = async () => {
    try {
      setStatus("loading");

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: buildPrompt() }]
        })
      });

      const data = await response.json();

      setStreamText(data.text);
      setStatus("done");

    } catch (err) {
      console.error(err);
      setStreamText("Hata: " + err.message);
      setStatus("done");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>AI Plan Üretici</h2>

      <input placeholder="Ad" onChange={e => setForm({ ...form, ad: e.target.value })} />
      <input placeholder="Yaş" onChange={e => setForm({ ...form, yas: e.target.value })} />
      <input placeholder="Kilo" onChange={e => setForm({ ...form, kilo: e.target.value })} />

      <br /><br />

      <button onClick={handleGenerate}>
        AI ile Plan Üret
      </button>

      <div style={{ marginTop: 30 }}>

        {status === "idle" && (
          <div>Plan burada görünecek</div>
        )}

        {status === "loading" && (
          <div>Yükleniyor...</div>
        )}

        {status === "done" && (
          <div style={{
            whiteSpace: "pre-wrap",
            border: "1px solid #ccc",
            padding: 20,
            marginTop: 10
          }}>
            {streamText}
          </div>
        )}

      </div>
    </div>
  );
}