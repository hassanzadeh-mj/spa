'use client';

import { useState, useEffect } from 'react';
import {User} from "@/lib/users/type";

export function useUsersLogic() {
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

    const roleFilters = [
        { value: 'all', label: 'همه' },
        { value: 'admin', label: 'مدیر' },
        { value: 'manager', label: 'سرپرست' },
        { value: 'user', label: 'کاربر' }
    ];

    const roleOptions = [
        { value: 'admin', label: 'مدیر' },
        { value: 'manager', label: 'سرپرست' },
        { value: 'user', label: 'کاربر' }
    ];

    return {
        users,
        filteredUsers,
        filter,
        setFilter,
        handleRoleChange,
        roleFilters,
        roleOptions
    };
}