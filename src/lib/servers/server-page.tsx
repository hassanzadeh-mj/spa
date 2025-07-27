'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { Virtuoso } from 'react-virtuoso';

interface Server {
    id: string;
    name: string;
    status: string;
    ip: string;
}

export function ServersPage() {
    const [servers, setServers] = useState<Server[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [newServerName, setNewServerName] = useState('');
    const [newServerIP, setNewServerIP] = useState('');

    useEffect(() => {
        const fetchServers = async () => {
            const res = await fetch('/api/servers');
            const data = await res.json();
            setServers(data);
        };
        fetchServers();
    }, []);

    const filteredServers =
        filter === 'all' ? servers : servers.filter((s) => s.status === filter);

    const handleAction = (id: string, action: string) => {
        setServers((prev) =>
            prev.map((s) =>
                s.id === id ? { ...s, status: action === 'restart' ? 'restarting' : action } : s
            )
        );
    };

    const handleAddServer = () => {
        if (!newServerName || !newServerIP) return;
        const newServer: Server = {
            id: uuidv4(),
            name: newServerName,
            ip: newServerIP,
            status: 'stopped',
        };
        setServers((prev) => [...prev, newServer]);
        setNewServerName('');
        setNewServerIP('');
    };

    return (
        <div className="p-6 space-y-6 h-fitt">
            <h1 className="text-2xl font-bold">Servers</h1>

            {/* Filter */}
            <div className="flex space-x-4 mb-4">
                {['all', 'active', 'stopped', 'restarting'].map((status) => (
                    <button
                        key={status}
                        className={`px-3 py-1 rounded ${
                            filter === status ? 'bg-blue-600 text-white' : 'bg-gray-200'
                        }`}
                        onClick={() => setFilter(status)}
                    >
                        {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {/* Add Server */}
            <div className="space-y-2">
                <h2 className="text-lg font-medium">Add New Server</h2>
                <input
                    value={newServerName}
                    onChange={(e) => setNewServerName(e.target.value)}
                    placeholder="Server Name"
                    className="border rounded px-3 py-1 mr-2"
                />
                <input
                    value={newServerIP}
                    onChange={(e) => setNewServerIP(e.target.value)}
                    placeholder="IP Address"
                    className="border rounded px-3 py-1 mr-2"
                />
                <button onClick={handleAddServer} className="bg-green-600 text-white px-4 py-1 rounded">
                    Add
                </button>
            </div>

            {/* Virtualized Server List */}
            <div style={{ height: '600px' }}>
                <Virtuoso
                    data={filteredServers}
                    itemContent={(index : number, server) => (
                        <li key={server.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2 m-2">
                            <Link href={`/servers/${server.id}`}>
                                <div>
                                    <h2 className="font-bold text-lg">{server.name}</h2>
                                    <p className="text-sm text-gray-600">IP: {server.ip}</p>
                                    <p className="capitalize">Status: {server.status}</p>
                                </div>
                            </Link>
                            <div className="space-x-2">
                                <button onClick={() => handleAction(server.id, 'active')} className="bg-blue-500 text-white px-2 py-1 rounded">
                                    Start
                                </button>
                                <button onClick={() => handleAction(server.id, 'stopped')} className="bg-yellow-500 text-white px-2 py-1 rounded">
                                    Stop
                                </button>
                                <button onClick={() => handleAction(server.id, 'restarting')} className="bg-purple-600 text-white px-2 py-1 rounded">
                                    Restart
                                </button>
                            </div>
                        </li>
                    )}
                />
            </div>
        </div>
    );
}