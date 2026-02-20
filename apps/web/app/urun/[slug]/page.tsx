import { Metadata } from 'next';

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // In a real app, fetch from Strapi:
    // const product = await fetchProduct(params.slug);
    return {
        title: `Ürün: ${params.slug}`,
        description: `${params.slug} hakkında detaylı inceleme, artı ve eksi yönleri.`,
    };
}

export default function ProductPage({ params }: Props) {
    // Mock JSON-LD Structured Data for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: params.slug,
        description: `${params.slug} ürün incelemesi ve özellikleri.`,
        offers: {
            '@type': 'Offer',
            priceCurrency: 'TRY',
            price: '1500.00',
        },
    };

    return (
        <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 className="text-4xl font-extrabold text-gray-900">{params.slug} Detaylı İnceleme</h1>
            <p className="mt-4 text-xl text-gray-500">
                Bu sayfada {params.slug} ürünü için Strapi'den gelen teknik özellikler, artılar, eksiler ve zengin metin yer alacaktır.
            </p>
        </article>
    );
}
