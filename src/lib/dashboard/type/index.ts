
export interface Metric {
    label: string;
    value: number;
    unit: string;
}

export interface Server {
    id: string;
    name: string;
    status: string;
}

export interface ChartData {
    name: string;
    value: number;
    fill?: string;
}