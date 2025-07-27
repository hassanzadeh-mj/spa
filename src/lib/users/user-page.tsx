'use client';


import {useUsersLogic} from "@/lib/users/hook";

export function UsersPage() {
    const {
        filteredUsers,
        filter,
        setFilter,
        handleRoleChange,
        roleFilters,
        roleOptions
    } = useUsersLogic();

    return (
        <div className="p-6 space-y-4 rtl">
            <h1 className="text-2xl font-bold text-foreground font-sans">کاربران</h1>

            <div className="flex gap-4 mb-4">
                {roleFilters.map((role) => (
                    <button
                        key={role.value}
                        className={`px-3 py-1 rounded transition-colors font-medium ${
                            filter === role.value ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                        onClick={() => setFilter(role.value)}
                    >
                        {role.label}
                    </button>
                ))}
            </div>

            <div className="bg-card border border-border shadow-sm rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-muted/50">
                    <tr>
                        <th className="px-4 py-3 text-right text-foreground font-semibold font-sans">نام</th>
                        <th className="px-4 py-3 text-right text-foreground font-semibold font-sans">ایمیل</th>
                        <th className="px-4 py-3 text-right text-foreground font-semibold font-sans">نقش</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user.id}
                            className={`border-t border-border ${index % 2 === 0 ? 'bg-card' : 'bg-muted/30'}`}>
                            <td className="px-4 py-3 text-foreground font-sans">{user.name}</td>
                            <td className="px-4 py-3 text-foreground font-sans">{user.email}</td>
                            <td className="px-4 py-3">
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    className="bg-background border border-input rounded px-2 py-1 text-primary transition-colors font-medium focus:ring-2 focus:ring-ring focus:border-transparent"
                                >
                                    {roleOptions.map((roleOption) => (
                                        <option key={roleOption.value} value={roleOption.value}>
                                            {roleOption.label}
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