import { Metadata } from 'next';

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: `En İyi: ${params.slug}`,
        description: `${params.slug} konulu yapay zeka destekli karşılaştırma ve inceleme listemiz.`,
    };
}

export default function RoundupPage({ params }: Props) {
    // Mock JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `En İyi ${params.slug} Listesi`,
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                item: {
                    '@type': 'Product',
                    name: 'Örnek Ürün 1',
                },
            },
        ],
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 className="text-4xl font-extrabold text-gray-900">{params.slug} Karşılaştırması</h1>
            <div className="mt-8 prose prose-emerald prose-lg text-gray-500">
                <p>Burada Strapi'den gelen ve AI ile oluşturulmuş makale içeriği (richtext) gösterilecektir.</p>
                <p>Ayrıca bu listeye ilişkin ilişkili (many-to-many) ürünlerin kartları sergilenecektir.</p>
            </div>
        </div>
    );
}
