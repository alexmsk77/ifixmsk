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
        const { name, phone, device, problem } = JSON.parse(event.body);

        // ВАЖНО: Здесь ваш токен и chat_id
        const BOT_TOKEN = "8564153026:AAEix9DsdpzyjxU8Y3n9c-Loy8tSkzYJ88I";
        const CHAT_ID = "773320599";

        const text = `📱 Новая заявка iFiX Service\n\nИмя: ${name}\nТелефон: ${phone}\nУстройство: ${device}\nПроблема: ${problem}`;

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text
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
