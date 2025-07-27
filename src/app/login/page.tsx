'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
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

        // اینجا می‌توانید منطق احراز هویت واقعی را اضافه کنید
        // برای مثال، بررسی با API
        if (username === 'admin' && password === 'admin') {
            login(username.trim());
            router.push('/');
        } else {
            setError('نام کاربری یا رمز عبور اشتباه است');
        }
    };

    return (
        <div className="max-w-md w-full p-6 bg-card rounded-lg shadow-lg border border-border transition-colors">
            <h1 className="text-2xl font-bold mb-6 text-center text-foreground transition-colors font-sans">ورود به سیستم</h1>
            
            <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                    <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded transition-colors font-medium">
                        {error}
                    </div>
                )}
                
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2 transition-colors">
                        نام کاربری
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="نام کاربری را وارد کنید"
                        className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground transition-colors font-medium"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2 transition-colors">
                        رمز عبور
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="رمز عبور را وارد کنید"
                        className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground transition-colors font-medium"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors font-medium"
                >
                    ورود
                </button>
            </form>
            
            <div className="mt-6 text-center text-sm text-muted-foreground transition-colors font-medium">
                <p>برای تست: نام کاربری: admin، رمز عبور: admin</p>
            </div>
        </div>
    );
}