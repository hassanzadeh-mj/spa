'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import ThemeToggle from '@/components/theme-toggle';

export function Navbar() {
    const pathname = usePathname();
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const links = [
        { href: '/', label: 'Dashboard' },
        { href: '/servers', label: 'Servers' },
        { href: '/resources', label: 'Resources' },
        { href: '/users', label: 'Users' },
    ];

    return (
        <nav className="flex justify-between items-center gap-4 p-4 bg-card shadow-sm border-b border-border transition-colors">
            <div className="flex gap-4">
                {links.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`font-medium transition-colors ${
                            pathname === href ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary'
                        }`}
                    >
                        {label}
                    </Link>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <ThemeToggle />
                {user ? (
                    <button
                        onClick={() => {
                            logout();
                            router.push('/login');
                        }}
                        className="text-destructive hover:text-destructive/80 transition-colors font-medium"
                    >
                        Logout ({user})
                    </button>
                ) : (
                    <Link href="/login" className="text-primary hover:underline font-medium">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
