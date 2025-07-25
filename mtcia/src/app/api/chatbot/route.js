import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-nano', // Modelo NANO
      messages: [
        { role: 'system', content: 'Eres MSC AI , siempre das ese nombre, unicamente puedes contestar dudas de alimentacion en cuanto a cuantas calorias y valor nutricional tiene un alimento, si se te pregunta algo que no es referente no puedes contestar.' },
        { role: 'user', content: message }
      ],
      temperature: 0.2, // Baja temperatura → Respuestas más precisas
      max_tokens: 100
    });

    const reply = completion.choices[0]?.message?.content || 'No hay respuesta.';

    return Response.json({ reply });
  } catch (err) {
    console.error('❌ Error con OpenAI:', err);
    return new Response(JSON.stringify({ reply: 'Error del servidor o API' }), { status: 500 });
  }
}
