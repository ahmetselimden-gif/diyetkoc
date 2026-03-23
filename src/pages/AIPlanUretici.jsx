import { useState } from "react";

export default function AIPlanUretici() {
  const [form, setForm] = useState({
    ad: "",
    yas: "",
    kilo: "",
  });

  const [status, setStatus] = useState("idle");
  const [streamText, setStreamText] = useState("");

  const handleGenerate = async () => {
    try {
      setStatus("loading");

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Ad: ${form.ad}, Yaş: ${form.yas}, Kilo: ${form.kilo}. 7 günlük diyet planı hazırla.`
            }
          ]
        })
      });

      const data = await response.json();

      setStreamText(data.text);
      setStatus("done");

    } catch (err) {
      setStreamText("Hata: " + err.message);
      setStatus("done");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* SOL PANEL */}
      <div style={{
        width: "300px",
        background: "#1c3829",
        color: "white",
        padding: "20px"
      }}>
        <h2>DiyetKoç</h2>
        <p>AI Plan Üretici</p>
      </div>

      {/* SAĞ PANEL */}
      <div style={{ flex: 1, padding: "40px" }}>
        <h2>Hasta Bilgileri</h2>

        <input placeholder="Ad"
          onChange={e => setForm({ ...form, ad: e.target.value })} />

        <input placeholder="Yaş"
          onChange={e => setForm({ ...form, yas: e.target.value })} />

        <input placeholder="Kilo"
          onChange={e => setForm({ ...form, kilo: e.target.value })} />

        <br /><br />

        <button onClick={handleGenerate}>
          AI ile Plan Üret
        </button>

        <div style={{ marginTop: 30 }}>

          {status === "idle" && <div>Plan burada görünecek</div>}
          {status === "loading" && <div>Yükleniyor...</div>}

          {status === "done" && (
            <div style={{
              whiteSpace: "pre-wrap",
              border: "1px solid #ccc",
              padding: 20
            }}>
              {streamText}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}