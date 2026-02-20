import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        template: "%s | Affiliate Platform",
        default: "Affiliate Platform - En İyi Ürün İncelemeleri",
    },
    description: "Yapay zeka destekli en güncel ürün inceleme ve karşılaştırma platformu.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <body className="min-h-screen bg-gray-50 text-gray-900 font-sans">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">Affiliate Platform</h1>
                    </div>
                </header>
                <main>{children}</main>
                <footer className="bg-gray-800 text-white mt-12 py-8">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <p>&copy; {new Date().getFullYear()} Affiliate Platform. Tüm hakları saklıdır.</p>
                    </div>
                </footer>
            </body>
        </html>
    );
}
