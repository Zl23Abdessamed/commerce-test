// components/ProductDetails.js
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { useCart } from "@/app/components/ShoppingCartContext";
import Image from "next/image";
import { Product } from "@/app/types/types";

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();

  if (!product) {
    return <div>Error: Product data is missing</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
              className="rounded-lg shadow-lg"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={500}
                    height={500}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-green-900">{product.name}</h1>
            <p className="text-lg text-green-700">{product.description}</p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-green-900">How to Use</h2>
              <p className="text-green-700">{product.dailyUse}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-green-900">Ingredients</h2>
              <ul className="list-disc list-inside text-green-700">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <p className="text-3xl font-bold text-gold-500">${product.price.toFixed(2)}</p>
            <button
              className="bg-gold-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-gold-600 transition-colors shadow-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}