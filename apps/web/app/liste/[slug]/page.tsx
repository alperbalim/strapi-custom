import { fetchAPI } from '@/lib/api';
import { Roundup } from '@/types/strapi';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getRoundup(slug: string) {
    try {
        const res = await fetchAPI('/roundups', {
            filters: { slug: { $eq: slug } },
            populate: [
                'featured_image',
                'products',
                'products.image',
                'products.brand'
            ],
        });
        return res.data[0] as Roundup | undefined;
    } catch (error) {
        console.error(`Failed to fetch roundup with slug ${slug}`, error);
        return undefined;
    }
}

export default async function RoundupPage({ params }: { params: { slug: string } }) {
    const roundup = await getRoundup(params.slug);

    if (!roundup) {
        notFound();
    }

    const { attributes } = roundup;
    const products = attributes.products?.data || [];

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-4xl py-12">
                    <Link href="/" className="text-blue-600 text-sm font-semibold mb-6 inline-flex items-center hover:text-blue-800">
                        &larr; Ana Sayfaya Dön
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
                        {attributes.title}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {attributes.intro}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl py-12">
                {/* Main Content */}
                {attributes.content && (
                    <div
                        className="prose prose-lg prose-blue max-w-none mb-16"
                        dangerouslySetInnerHTML={{ __html: attributes.content }}
                    />
                )}

                {/* Products List */}
                <div className="space-y-12">
                    {products.map((product, index) => {
                        const p = product.attributes;
                        return (
                            <div key={product.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-lg">

                                {/* Product Image */}
                                <div className="md:w-1/3 bg-gray-50 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100">
                                    {p.image?.data ? (
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${p.image.data.attributes.url}`}
                                            alt={p.name}
                                            className="max-h-64 object-contain mix-blend-multiply"
                                        />
                                    ) : (
                                        <span className="text-gray-400 font-medium">Görsel Yok</span>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-8 md:w-2/3 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            {p.brand?.data && (
                                                <span className="text-sm font-bold tracking-wider uppercase text-gray-500 mb-1 block">
                                                    {p.brand.data.attributes.name}
                                                </span>
                                            )}
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                <Link href={`/urun/${p.slug}`} className="hover:text-blue-600">
                                                    {index + 1}. {p.name}
                                                </Link>
                                            </h3>
                                        </div>
                                        {p.rating && (
                                            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                                                <span className="text-yellow-400 mr-1">★</span>
                                                <span className="font-bold text-blue-900">{p.rating}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div
                                        className="text-gray-600 mb-6 prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: p.description }}
                                    />

                                    {/* Pros & Cons */}
                                    <div className="grid md:grid-cols-2 gap-4 mb-8 text-sm">
                                        {p.pros && p.pros.length > 0 && (
                                            <div className="bg-green-50 rounded-xl p-4">
                                                <h4 className="font-bold text-green-900 mb-3 flex items-center">
                                                    <span className="text-green-500 mr-2">✓</span> Artıları
                                                </h4>
                                                <ul className="space-y-2 text-green-800">
                                                    {p.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                                                </ul>
                                            </div>
                                        )}
                                        {p.cons && p.cons.length > 0 && (
                                            <div className="bg-red-50 rounded-xl p-4">
                                                <h4 className="font-bold text-red-900 mb-3 flex items-center">
                                                    <span className="text-red-500 mr-2">✕</span> Eksileri
                                                </h4>
                                                <ul className="space-y-2 text-red-800">
                                                    {p.cons.map((con, i) => <li key={i}>{con}</li>)}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action */}
                                    <div className="mt-auto flex justify-between items-center border-t border-gray-100 pt-6">
                                        <span className="text-2xl font-extrabold text-gray-900">
                                            {p.price_min && p.price_max
                                                ? `${p.price_min}₺ - ${p.price_max}₺`
                                                : p.price_min ? `${p.price_min}₺` : 'Fiyat Belirtilmedi'}
                                        </span>
                                        <Link
                                            href={`/urun/${p.slug}`}
                                            className="bg-gray-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transition-colors"
                                        >
                                            Detayları Gör
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
