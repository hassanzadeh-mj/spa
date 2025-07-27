export interface ServerMetrics {
    cpu: number;
    memory: number;
    storage: number;
}

export interface ServerDetail {
    id: string;
    name: string;
    status: string;
    ip: string;
    metrics: ServerMetrics;
}

export interface ServerDetailClientProps {
    id: string;
}
