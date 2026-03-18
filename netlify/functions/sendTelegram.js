// netlify/functions/sendTelegram.js
import fetch from "node-fetch";

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, phone, device, problem } = JSON.parse(event.body || "{}");

  if (!name || !phone) {
    return { statusCode: 400, body: JSON.stringify({ error: "Имя и телефон обязательны" }) };
  }

  // Токен и chat_id мы будем хранить в переменных окружения
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const text = `📱 Новая заявка iFiX Service\n\nИмя: ${name}\nТелефон: ${phone}\nУстройство: ${device}\nПроблема: ${problem}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });

    if (!response.ok) throw new Error("Ошибка отправки");

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
