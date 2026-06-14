import { describe, expect, it } from 'vitest';
import { getBackofficeCustomer } from './backoffice';

describe('backoffice api fallbacks', () => {
  it('returns fallback customer when fetch is unavailable', async () => {
    const response = await getBackofficeCustomer('cust_001');
    expect(response.item.customerId).toBe('cust_001');
  });

});
