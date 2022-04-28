export interface ProductSchema {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    point: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}
