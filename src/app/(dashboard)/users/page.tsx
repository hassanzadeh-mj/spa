'use client';

import { useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    role: string;
    email: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleRoleChange = (id: string, newRole: string) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id ? { ...user, role: newRole } : user
            )
        );
    };

    const filteredUsers =
        filter === 'all' ? users : users.filter((u) => u.role === filter);

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-foreground font-sans">Users</h1>

            <div className="flex space-x-4 mb-4">
                {['all', 'admin', 'manager', 'user'].map((role) => (
                    <button
                        key={role}
                        className={`px-3 py-1 rounded transition-colors font-medium ${
                            filter === role ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                        onClick={() => setFilter(role)}
                    >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                ))}
            </div>

            <div className="bg-card border border-border shadow-sm rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-foreground font-semibold font-sans">Name</th>
                            <th className="px-4 py-3 text-left text-foreground font-semibold font-sans">Email</th>
                            <th className="px-4 py-3 text-left text-foreground font-semibold font-sans">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user.id} className={`border-t border-border ${index % 2 === 0 ? 'bg-card' : 'bg-muted/30'}`}>
                                <td className="px-4 py-3 text-foreground font-sans">{user.name}</td>
                                <td className="px-4 py-3 text-foreground font-sans">{user.email}</td>
                                <td className="px-4 py-3">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="bg-background border border-input rounded px-2 py-1 text-primary capitalize transition-colors font-medium focus:ring-2 focus:ring-ring focus:border-transparent"
                                    >
                                        {['admin', 'manager', 'user'].map((roleOption) => (
                                            <option key={roleOption} value={roleOption}>
                                                {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 