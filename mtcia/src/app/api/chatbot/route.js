import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { message, name, context } = await req.json();

    const systemPrompt = `Eres un asistente llamado ${name},
                          Contexto: ${context} y temas relacionados al contexto.,
                          
                          
                          REGLAS:
                          -Si el usuraio te pregunta algo que no sabes, responde "No tengo información sobre eso."
                          -Solo dices tu nombre una vez, al inicio de la conversación no lo vuelves a repetir JAMAS.
                          -Solo respondes a preguntas relacionadas con el contexto proporcionado.
                          -Si la pregunta es en español, responde en español.
                          -Si la pregunta es en inglés, responde en inglés.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',    
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.2,
      max_tokens: 300
    });

    const reply = completion.choices[0]?.message?.content || 'No hay respuesta.';

    return Response.json({ reply });
  } catch (err) {
    console.error('❌ Error con OpenAI:', err);
    return new Response(JSON.stringify({ reply: 'Error del servidor o API' }), { status: 500 });
  }
}
