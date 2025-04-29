// /products

"use client"

import { initialProducts } from "../utils/utils";
import ProductCard from "./components/ProductCard";



export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-bold text-green-900 mb-8">Our Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {initialProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}