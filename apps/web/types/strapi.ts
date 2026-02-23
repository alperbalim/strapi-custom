export interface StrapiResponse<T> {
    data: T | T[];
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface StrapiImage {
    id: number;
    attributes: {
        url: string;
        alternativeText: string | null;
        width: number;
        height: number;
        formats: any;
    };
}

export interface Category {
    id: number;
    attributes: {
        name: string;
        slug: string;
        description: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface Brand {
    id: number;
    attributes: {
        name: string;
        slug: string;
        website: string | null;
        logo?: { data: StrapiImage };
    };
}

export interface Product {
    id: number;
    attributes: {
        name: string;
        slug: string;
        description: string;
        price_min: number;
        price_max: number;
        rating: number;
        pros: string[];
        cons: string[];
        specs: Record<string, any>;
        category?: { data: Category };
        brand?: { data: Brand };
        image?: { data: StrapiImage };
        affiliate_links: Array<{ url: string; store: string }>;
    };
}

export interface Roundup {
    id: number;
    attributes: {
        title: string;
        slug: string;
        intro: string;
        content: string; // rich text HTML
        seo_title: string;
        seo_description: string;
        featured_image?: { data: StrapiImage };
        products?: { data: Product[] };
        createdAt: string;
        updatedAt: string;
    };
}
