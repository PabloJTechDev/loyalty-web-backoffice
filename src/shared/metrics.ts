import { Registry, Counter, collectDefaultMetrics } from 'prom-client';

export const registry = new Registry();
collectDefaultMetrics({ register: registry, prefix: 'loyalty_backoffice_web_' });

export const pageViewCounter = new Counter({
  name: 'loyalty_backoffice_web_page_views_total',
  help: 'Total page views rendered by the backoffice web',
  labelNames: ['page'] as const,
  registers: [registry],
});
