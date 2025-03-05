"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { db } from '@/app/utils/firebase';
import { useRouter } from 'next/navigation';

interface Purchase {
    id: string;
    customerInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
    };
    items: {
        id: number;
        name: string;
        quantity: number;
        price: number;
    }[];
    total: number;
    timestamp: Date | string;
    status: string;
}

export default function AdminPurchasesPage() {

    function useAdminAuth() {
        const checkAdminAuth = () => {
            if (typeof window === "undefined") {
                return false; // Avoid accessing localStorage on the server
            }
    
            const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
            const loginTimestamp = localStorage.getItem('adminLoginTimestamp');
    
            // Optional: Add session timeout (e.g., 1 hour)
            if (isAuthenticated && loginTimestamp) {
                const currentTime = Date.now();
                const loginTime = parseInt(loginTimestamp, 10);
                const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hour in milliseconds
    
                if (currentTime - loginTime > SESSION_TIMEOUT) {
                    // Session expired, clear authentication
                    localStorage.removeItem('isAdminAuthenticated');
                    localStorage.removeItem('adminLoginTimestamp');
                    return false;
                }
            }
    
            return isAuthenticated;
        };
    
        const logout = () => {
            if (typeof window !== "undefined") {
                localStorage.removeItem('isAdminAuthenticated');
                localStorage.removeItem('adminLoginTimestamp');
                window.location.href = '/'; // Redirect to login page
            }
        };
    
        return {
            isAuthenticated: checkAdminAuth(),
            logout
        };
    };
    
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAdminAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/private/dani/login');
        }
    }, [isAuthenticated]);

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'purchases'));
            const fetchedPurchases = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Purchase));

            setPurchases(fetchedPurchases);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching purchases:', error);
            setIsLoading(false);
        }
    };

    const handleDeletePurchase = async (purchaseId: string) => {
        try {
            await deleteDoc(doc(db, 'purchases', purchaseId));
            setPurchases(purchases.filter(purchase => purchase.id !== purchaseId));
        } catch (error) {
            console.error('Error deleting purchase:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-pulse text-green-700 text-2xl font-bold">
                    Loading Purchases...
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto"
            >
                <h1 className="text-4xl font-bold text-green-900 mb-10 text-center">
                    Admin - All Purchases
                </h1>

                {purchases.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg shadow">
                        <p className="text-gray-600 text-xl">No purchases found.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {purchases.map((purchase) => (
                            <motion.div
                                key={purchase.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white shadow-md rounded-lg p-6"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>

                                        <p className="text-gray-600">
                                            {new Date(purchase.timestamp.toString()).toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDeletePurchase(purchase.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        aria-label="Delete Purchase"
                                    >
                                        <FaTrash size={20} />
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold text-green-800 mb-2">Customer Info</h3>
                                        <p>Name: {purchase.customerInfo.firstName} {purchase.customerInfo.lastName}</p>
                                        <p>Email: {purchase.customerInfo.email}</p>
                                        <p>Phone: {purchase.customerInfo.phone}</p>
                                        <p>Address: {purchase.customerInfo.address}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-green-800 mb-2">Order Details</h3>
                                        {purchase.items.map((item) => (
                                            <div key={item.id} className="flex justify-between">
                                                <span>{item.name}</span>
                                                <span>
                                                    {item.quantity} x ${item.price.toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="border-t mt-2 pt-2 font-bold">
                                            Total: ${purchase.total.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}