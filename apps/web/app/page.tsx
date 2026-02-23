import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import { Roundup, Product } from '@/types/strapi';

async function getLatestRoundups() {
    try {
        const res = await fetchAPI('/roundups', {
            populate: ['featured_image'],
            sort: ['createdAt:desc'],
            pagination: { limit: 6 },
        });
        return res.data as Roundup[];
    } catch (error) {
        console.error('Failed to fetch roundups', error);
        return [];
    }
}

export default async function Home() {
    const roundups = await getLatestRoundups();

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                        Hoş Geldiniz!
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl">
                        Yapay zeka analizli ürün karşılaştırmaları, detaylı incelemeler ve en güncel alışveriş rehberleri burada.
                    </p>
                    <div className="mt-8">
                        <Link
                            href="/liste"
                            className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-50 transition duration-300"
                        >
                            İncelemeleri Keşfet
                        </Link>
                    </div>
                </div>
            </div>

            {/* Latest Roundups */}
            <div className="container mx-auto px-4 max-w-6xl py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-indigo-100 pb-2 inline-block">
                    En Yeni Karşılaştırmalar
                </h2>

                {roundups.length === 0 ? (
                    <p className="text-gray-500 italic">Henüz içerik eklenmemiş.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {roundups.map((roundup) => (
                            <Link key={roundup.id} href={`/liste/${roundup.attributes.slug}`} className="group">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                                    {roundup.attributes.featured_image?.data ? (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${roundup.attributes.featured_image.data.attributes.url}`}
                                                alt={roundup.attributes.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                            <span className="text-gray-400">Görsel Yok</span>
                                        </div>
                                    )}
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                            {roundup.attributes.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
                                            {roundup.attributes.intro}
                                        </p>
                                        <div className="text-blue-600 font-medium text-sm flex items-center mt-auto">
                                            İncelemeyi Oku
                                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
