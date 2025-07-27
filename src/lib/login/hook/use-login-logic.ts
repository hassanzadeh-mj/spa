'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

export function useLoginLogic() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, login } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            login(stored);
        }
        if (user) {
            router.push('/');
        }
    }, [user, login, router]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password.trim()) {
            setError('لطفاً نام کاربری و رمز عبور را وارد کنید');
            return;
        }

        if (username === 'admin' && password === 'admin') {
            login(username.trim());
            router.push('/');
        } else {
            setError('نام کاربری یا رمز عبور اشتباه است');
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        error,
        handleLogin
    };
}