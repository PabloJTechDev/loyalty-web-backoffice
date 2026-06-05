import type { Locale } from './config';

export interface Dictionary {
  common: {
    brand: string;
    dashboard: string;
    customers: string;
    orders: string;
  };
}

const dictionaries: Record<Locale, Dictionary> = {
  es: {
    common: {
      brand: 'Loyalty Backoffice',
      dashboard: 'Dashboard',
      customers: 'Clientes',
      orders: 'Órdenes',
    },
  },
  en: {
    common: {
      brand: 'Loyalty Backoffice',
      dashboard: 'Dashboard',
      customers: 'Customers',
      orders: 'Orders',
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
