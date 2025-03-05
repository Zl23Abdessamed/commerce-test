import { Product } from '@/app/types/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <motion.div
            className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
            whileHover={{ scale: 1.05 }}
        >
            <Link href={`/products/${product.id}`}>
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-xl font-bold text-green-900">{product.name}</h3>
                    <p className="text-green-700 mt-2">{product.description}</p>
                    <p className="text-gold-500 font-semibold mt-2">${product.price.toFixed(2)}</p>
                </div>
            </Link>
        </motion.div>
    );
}
