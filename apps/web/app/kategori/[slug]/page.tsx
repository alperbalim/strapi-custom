import { fetchAPI } from '@/lib/api';
import { Category, Product } from '@/types/strapi';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    let category: Category | undefined;
    let products: Product[] = [];

    try {
        const catRes = await fetchAPI('/categories', {
            filters: { slug: { $eq: params.slug } },
        });

        if (catRes.data.length > 0) {
            category = catRes.data[0];

            const prodRes = await fetchAPI('/products', {
                filters: { category: { id: { $eq: category?.id } } },
                populate: ['image', 'brand'],
            });
            products = prodRes.data;
        }
    } catch (error) {
        console.error(error);
    }

    if (!category) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <Link href="/" className="text-gray-500 hover:text-blue-600 mb-6 inline-block font-medium">
                    &larr; Ana Sayfaya Dön
                </Link>
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{category.attributes.name}</h1>
                    <p className="text-xl text-gray-600 max-w-3xl">{category.attributes.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => {
                        const p = product.attributes;
                        return (
                            <Link href={`/urun/${p.slug}`} key={product.id} className="group">
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col h-full">
                                    <div className="h-40 flex items-center justify-center mb-6">
                                        {p.image?.data ? (
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${p.image.data.attributes.url}`}
                                                alt={p.name}
                                                className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="text-gray-300">Görsel Yok</div>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        {p.brand?.data && (
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                                                {p.brand.data.attributes.name}
                                            </span>
                                        )}
                                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 mb-2 line-clamp-2">
                                            {p.name}
                                        </h3>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="font-extrabold text-gray-900">
                                            {p.price_min ? `${p.price_min}₺` : ''}
                                        </div>
                                        {p.rating && (
                                            <div className="text-sm font-bold text-yellow-500 bg-yellow-50 px-2 py-1 rounded">
                                                ★ {p.rating}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </main>
    );
}
