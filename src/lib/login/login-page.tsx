
'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

export function LoginPage() {
    const [username, setUsername] = useState('');
    const { user, login } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) login(stored);
        if (user) router.push('/');
    }, [user]);

    const handleLogin = () => {
        if (username.trim()) {
            login(username.trim());
        }
    };

    return (
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
            <input
                type="text"
                placeholder="Username"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Login
            </button>
        </div>
    );
}