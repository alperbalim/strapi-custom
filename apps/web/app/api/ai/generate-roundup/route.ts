import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { topic, productCount = 10 } = body;

        if (!topic) {
            return NextResponse.json(
                { error: 'Topic is required' },
                { status: 400 }
            );
        }

        const prompt = `
      Sen profesyonel bir içerik üreticisisin. Bana "${topic}" hakkında bir karşılaştırma makalesi (roundup) yaz.
      Lütfen ${productCount} adet ürün listele ve aşağıdaki JSON formatında bir veri döndür. Başka bir şey yazma, sadece JSON formatında döndür.

      {
        "title": "Makale başlığı (Örn: En İyi 10 Telefon)",
        "intro": "Makale için etkileyici bir giriş metni...",
        "products": [
          {
            "name": "Ürün Adı",
            "short_description": "Ürün hakkında kısa bilgi",
            "specs": { "ozellik": "deger", "ozellik2": "deger2" },
            "pros": ["artı 1", "artı 2"],
            "cons": ["eksi 1", "eksi 2"],
            "price_range": "1000 TL - 2000 TL"
          }
        ]
      }
    `;

        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-4o', // or gpt-3.5-turbo based on needs
            response_format: { type: 'json_object' },
        });

        const aiContent = completion.choices[0]?.message?.content;

        if (!aiContent) {
            throw new Error('No content generated from AI');
        }

        const parsedContent = JSON.parse(aiContent);

        return NextResponse.json(parsedContent);
    } catch (error) {
        console.error('AI Generation Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate content' },
            { status: 500 }
        );
    }
}
