import { escapeHTML } from '@/utils/helpers';

export async function POST(req: Request) {
  console.clear();
  const { TELEGRAM_BOT_TOKEN: token = '', TELEGRAM_CHAT_ID: chatId = '' } = process.env;
  const data = await req.json();

  const { name, email, phone, description } = data;

  const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);
  const safePhone = escapeHTML(phone);
  const safeDescription = escapeHTML(description);

  const TelegramURL = `https://api.telegram.org/bot${token}/sendMessage`;

  const text = `
  <b><i>-------Новая заявка с сайта KiWiCode-------</i></b>\n\n<b>Ім’я:</b> ${safeName}\n<b>Електронна пошта:</b> ${safeEmail}\n<b>Телефон:</b> ${safePhone}\n<b>Опис проєкту:</b>  ${safeDescription}\n`;

  try {
    const res = await fetch(TelegramURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });

    const data = await res.json();

    if (!data.ok) {
      return Response.json({ success: false, message: data.description }, { status: 500 });
    }

    return Response.json({ succes: true }, { status: 200 });
  } catch {
    return Response.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
