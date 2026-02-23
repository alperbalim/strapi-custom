import { fetchAPI } from '@/lib/api';
import { Product } from '@/types/strapi';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: { slug: string } }) {
    let product: Product | undefined;

    try {
        const res = await fetchAPI('/products', {
            filters: { slug: { $eq: params.slug } },
            populate: ['image', 'brand', 'category'],
        });
        product = res.data[0];
    } catch (error) {
        console.error(error);
    }

    if (!product) {
        notFound();
    }

    const p = product.attributes;

    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <Link href="/" className="text-gray-500 hover:text-blue-600 mb-8 inline-block font-medium">
                    &larr; Ana Sayfaya Dön
                </Link>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="md:flex">
                        {/* Image Gallery Area */}
                        <div className="md:w-1/2 bg-gray-50 p-12 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
                            {p.image?.data ? (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${p.image.data.attributes.url}`}
                                    alt={p.name}
                                    className="w-full mix-blend-multiply drop-shadow-lg"
                                />
                            ) : (
                                <div className="text-gray-400">Görsel Yok</div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="md:w-1/2 p-10 lg:p-14 flex flex-col">
                            <div className="mb-2 flex items-center gap-3">
                                {p.category?.data && (
                                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {p.category.data.attributes.name}
                                    </span>
                                )}
                                {p.brand?.data && (
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                        {p.brand.data.attributes.name}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{p.name}</h1>

                            <div className="flex items-center gap-4 mb-8">
                                {p.rating && (
                                    <div className="flex items-center">
                                        <span className="text-yellow-400 text-xl mr-1">★</span>
                                        <span className="font-bold text-gray-700 text-lg">{p.rating}/5.0</span>
                                    </div>
                                )}
                                <div className="text-3xl font-black text-blue-600">
                                    {p.price_min && p.price_max
                                        ? `${p.price_min}₺ - ${p.price_max}₺`
                                        : p.price_min ? `${p.price_min}₺` : ''}
                                </div>
                            </div>

                            <div
                                className="prose prose-gray max-w-none mb-10 text-gray-600 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: p.description }}
                            />

                            {/* Specs */}
                            {p.specs && Object.keys(p.specs).length > 0 && (
                                <div className="mb-10">
                                    <h3 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Teknik Özellikler</h3>
                                    <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                                        {Object.entries(p.specs).map(([key, value]) => (
                                            <div key={key} className="flex flex-col border-b border-gray-50 pb-2">
                                                <span className="text-gray-500 mb-1">{key}</span>
                                                <span className="font-semibold text-gray-900">{value as React.ReactNode}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Affiliate Links */}
                            {p.affiliate_links && p.affiliate_links.length > 0 && (
                                <div className="mt-auto pt-6 border-t border-gray-100">
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Satın Alma Seçenekleri</h4>
                                    <div className="space-y-3">
                                        {p.affiliate_links.map((link, idx) => (
                                            <a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="nofollow noopener noreferrer"
                                                className="flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 p-4 rounded-xl transition-all group"
                                            >
                                                <span className="font-bold text-gray-900 group-hover:text-blue-700">{link.store}</span>
                                                <span className="text-blue-600 bg-white font-semibold px-4 py-2 rounded-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    Fiyata Bak
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
