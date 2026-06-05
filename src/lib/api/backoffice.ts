import { cache } from 'react';

const backofficeBaseUrl = process.env.BFF_BACKOFFICE_BASE_URL ?? 'http://localhost:3003';

export interface BackofficeDashboardResponse {
  source: 'mock';
  generatedAt: string;
  kpis: Array<{ label: string; value: string; trend: string }>;
  queues: Array<{ id: string; title: string; pending: number; sla: string }>;
  customerSnapshots: Array<{ customerId: string; fullName: string; tier: string; status: string; availablePoints: number; lastOrderId: string }>;
  recentOrders: Array<{ orderId: string; customerId: string; status: string; payableUsd: number; reservedPoints: number; createdAt: string }>;
}

async function safeFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${backofficeBaseUrl}${path}`, { cache: 'no-store' });
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

const dashboardFallback: BackofficeDashboardResponse = {
  source: 'mock',
  generatedAt: new Date('2026-06-05T15:00:00.000Z').toISOString(),
  kpis: [
    { label: 'Open cases', value: '18', trend: '-2 vs yesterday' },
    { label: 'Orders flagged', value: '5', trend: '+1 last hour' },
    { label: 'Customers monitored', value: '42', trend: '+6 this week' },
  ],
  queues: [
    { id: 'support', title: 'Support queue', pending: 9, sla: '< 30 min' },
    { id: 'risk', title: 'Risk review', pending: 3, sla: '< 15 min' },
    { id: 'ops', title: 'Operations follow-up', pending: 6, sla: '< 60 min' },
  ],
  customerSnapshots: [
    { customerId: 'cust_001', fullName: 'María Pérez', tier: 'Gold', status: 'active', availablePoints: 18200, lastOrderId: 'ord_mock_002' },
    { customerId: 'cust_002', fullName: 'Juan Soto', tier: 'Silver', status: 'password-reset-pending', availablePoints: 6400, lastOrderId: 'ord_mock_001' },
  ],
  recentOrders: [
    { orderId: 'ord_mock_002', customerId: 'cust_001', status: 'placed', payableUsd: 109, reservedPoints: 2000, createdAt: '2026-06-05T10:30:00.000Z' },
    { orderId: 'ord_mock_001', customerId: 'cust_002', status: 'placed', payableUsd: 44, reservedPoints: 1500, createdAt: '2026-06-04T18:00:00.000Z' },
  ],
};

export const getBackofficeDashboard = cache(async () => {
  return safeFetch('/api/v1/backoffice/dashboard', dashboardFallback);
});

export async function getBackofficeCustomer(customerId: string) {
  return safeFetch(`/api/v1/backoffice/customers/${encodeURIComponent(customerId)}`, {
    source: 'mock' as const,
    item: dashboardFallback.customerSnapshots.find((item) => item.customerId === customerId) ?? dashboardFallback.customerSnapshots[0],
  });
}

export async function getBackofficeOrder(orderId: string) {
  return safeFetch(`/api/v1/backoffice/orders/${encodeURIComponent(orderId)}`, {
    source: 'mock' as const,
    item: dashboardFallback.recentOrders.find((item) => item.orderId === orderId) ?? dashboardFallback.recentOrders[0],
  });
}
