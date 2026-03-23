module.exports = async function handler(req, res) {
  try {
    console.log("ENV KEY:", process.env.ANTHROPIC_API_KEY);

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
        messages,
      }),
    });

    const data = await response.json();

    console.log("API RESPONSE:", data);

    return res.status(200).json({
      text: data?.content?.[0]?.text || JSON.stringify(data),
    });

  } catch (err) {
    console.error("SERVER HATA:", err);
    return res.status(500).json({
      error: err.message,
    });
  }
};