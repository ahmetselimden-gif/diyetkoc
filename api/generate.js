module.exports = async function handler(req, res) {
  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Mesaj yok" });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1000,
        messages: messages,
      }),
    });

    const data = await response.json();

    const text = data?.content?.[0]?.text || "Plan oluşturulamadı";

    return res.status(200).json({ text });

  } catch (err) {
    console.error("HATA:", err);
    return res.status(500).json({ error: err.message });
  }
};