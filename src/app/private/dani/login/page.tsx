"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface LoginCredentials {
    username: string;
    password: string;
};

export default function AdminLogin() {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        username: '',
        password: ''
    });
    const [error, setError] = useState<string>('');
    const router = useRouter();

    // Predefined admin credentials (in a real app, these would be more securely managed)
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
        setError(''); // Clear error when user starts typing
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Basic validation
        if (!credentials.username || !credentials.password) {
            setError('Please enter both username and password');
            return;
        }

        // Check credentials
        if (
            credentials.username === ADMIN_USERNAME &&
            credentials.password === ADMIN_PASSWORD
        ) {
            // Set authentication in local storage
            localStorage.setItem('isAdminAuthenticated', 'true');
            localStorage.setItem('adminLoginTimestamp', Date.now().toString());

            // Redirect to admin dashboard
            router.push('/private/dani/admin');
        } else {
            setError('Invalid username or password');
            // Clear password field on failed login
            setCredentials(prev => ({
                ...prev,
                password: ''
            }));
        };
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-green-900 text-center mb-6">
                    Admin Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            {error}
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter admin username"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter admin password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

