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
        model: "claude-3-haiku-20240307",
        max_tokens: 1000,
        messages: messages.map(m => ({
          role: m.role,
          content: [{ type: "text", text: m.content }]
        })),
      }),
    });

    const data = await response.json();

    let text = "Plan oluşturulamadı";

    if (
      data &&
      data.content &&
      Array.isArray(data.content) &&
      data.content.length > 0 &&
      data.content[0].text
    ) {
      text = data.content[0].text;
    } else {
      console.log("API FULL RESPONSE:", JSON.stringify(data, null, 2));
    }

    return res.status(200).json({ text });

  } catch (err) {
    console.error("SERVER HATA:", err);
    return res.status(500).json({ error: err.message });
  }
};