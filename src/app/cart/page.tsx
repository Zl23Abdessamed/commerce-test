"use client";

import React, { useState, useEffect, JSX } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaArrowRight, FaTimes } from 'react-icons/fa';
import { useCart } from '../components/ShoppingCartContext';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Image from 'next/image';
import { CartItem } from '../types/types';
import Link from 'next/link';

interface FormData {
    firstName: string;
    lastName: string;
    age: string;
    address: string;
    phone: string;
    email: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    age?: string;
    address?: string;
    phone?: string;
    email?: string;
}

interface CartItemProps {
    item: CartItem;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
}

interface CheckoutModalProps {
    onClose: () => void;
    total: number;
}

export default function CartPage(): JSX.Element {
    const [mounted, setMounted] = useState<boolean>(false);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 5.99 : 0;
    const total = subtotal + shipping;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="bg-white text-center py-20">
                <div className="animate-pulse text-green-700 text-2xl font-bold">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-screen overflow-x-hidden flex flex-col">
            <div className="bg-green-900 py-12">
                <div className="container mx-auto px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-white text-center"
                    >
                        Your Shopping Cart
                    </motion.h1>
                </div>
            </div>

            <main className="flex-grow container mx-auto px-6 py-12">
                {cartItems.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mb-8"
                            >
                                <h2 className="text-2xl font-bold text-green-900 mb-6">Cart Items ({cartItems.reduce((total, item) => total + item.quantity, 0)})</h2>

                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <CartItemCmp
                                            key={item.id}
                                            item={item}
                                            removeFromCart={removeFromCart}
                                            updateQuantity={updateQuantity}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-white p-6 rounded-lg shadow-lg sticky top-6"
                            >
                                <h2 className="text-2xl font-bold text-green-900 mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between pb-4 border-b border-gray-200">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between pb-4 border-b border-gray-200">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-semibold">${shipping.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between text-lg font-bold text-green-900">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsCheckoutModalOpen(true)}
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl"
                                >
                                    Proceed to Checkout
                                </button>

                                <div className="mt-6 text-center text-sm text-gray-500">
                                    <p>Secure payment processing</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </main>

            {isCheckoutModalOpen && (
                <CheckoutModal
                    onClose={() => setIsCheckoutModalOpen(false)}
                    total={total}
                />
            )}
        </div>
    );
}

function CartItemCmp({ item, removeFromCart, updateQuantity }: CartItemProps): JSX.Element {
    return (
        <div className="flex flex-col sm:flex-row border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="sm:w-1/4 mb-4 sm:mb-0">
                <Image
                    src={item.images?.[0] || "/api/placeholder/200/200"}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-md"
                />
            </div>

            <div className="sm:w-3/4 sm:pl-6 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between">
                        <h3 className="text-xl font-bold text-green-900">{item.name}</h3>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                        >
                            <FaTrash size={16} />
                        </button>
                    </div>

                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
                    <p className="font-semibold text-green-800 mt-2">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-md w-8 h-8 flex items-center justify-center"
                            aria-label="Decrease quantity"
                        >
                            <FaMinus size={12} />
                        </button>

                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-12 h-8 border-t border-b text-center text-gray-700"
                        />

                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-md w-8 h-8 flex items-center justify-center"
                            aria-label="Increase quantity"
                        >
                            <FaPlus size={12} />
                        </button>
                    </div>

                    <div className="font-bold text-green-900">
                        ${(item.price * item.quantity).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmptyCart(): JSX.Element {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
        >
            <div className="mb-8">
                <FaShoppingCart className="w-24 h-24 mx-auto text-green-200" />
            </div>
            <h2 className="text-3xl font-bold text-green-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Looks like you haven&apos;t added any products to your cart yet. Explore our collection and find the perfect products for your hair.</p>
            <Link href="/" className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center">
                Browse Products
                <FaArrowRight className="w-4 h-4 ml-2" />
            </Link>
        </motion.div>
    );
}

function CheckoutModal({ onClose, total }: CheckoutModalProps): JSX.Element {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        age: '',
        address: '',
        phone: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const { cartItems, clearCart } = useCart();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (formData.age && (isNaN(Number(formData.age)) || parseInt(formData.age) < 18)) {
            newErrors.age = 'Age must be at least 18';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (validate()) {
            setIsSubmitting(true);

            try {
                // Prepare purchase data
                const purchaseData = {
                    customerInfo: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,
                        address: formData.address,
                        age: formData.age
                    },
                    items: cartItems.map(item => ({
                        id: item.id,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    total: total,
                    timestamp: serverTimestamp(),
                    status: 'pending'
                };

                await addDoc(collection(db, 'purchases'), purchaseData);

                clearCart();

                alert('Order placed successfully!');
                onClose();
            } catch (error) {
                console.error('Error saving purchase:', error);
                alert('Failed to place order. Please try again.');
                setIsSubmitting(false);
            }
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
                <div className="sticky top-0 bg-green-900 text-white py-4 px-6 rounded-t-xl flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Complete Your Purchase</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition-colors"
                        aria-label="Close"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="bg-green-50 p-4 rounded-lg mb-6">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-green-900">Order Total:</span>
                            <span className="text-xl font-bold text-green-900">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${errors.age ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address*</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Street address, city, state/province, postal code"
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${errors.address ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-green-900 rounded-lg font-bold transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-green-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    'Complete Purchase'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}