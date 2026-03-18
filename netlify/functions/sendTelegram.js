exports.handler = async (event) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: "Method not allowed" })
        };
    }

    try {
        // Принимаем все поля из вашей формы
        const { name, phone, device, problem } = JSON.parse(event.body);

        // ВАШ ТОКЕН И CHAT_ID
        const BOT_TOKEN = "8564153026:AAEix9DsdpzyjxU8Y3n9c-Loy8tSkzYJ88I";
        const CHAT_ID = "773320599";

        // Формируем сообщение
        const text = `📱 Новая заявка iFiX Service\n\n👤 Имя: ${name}\n📱 Телефон: ${phone}\n📱 Устройство: ${device}\n📝 Проблема: ${problem || "Не указана"}`;

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();

        if (!data.ok) {
            throw new Error(data.description);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true })
        };

    } catch (error) {
        console.error("Function error:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
