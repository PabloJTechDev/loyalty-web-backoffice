import { describe, expect, it } from 'vitest';
import { getBackofficeCustomer, getBackofficeOrder } from './backoffice';

describe('backoffice api fallbacks', () => {
  it('returns fallback customer when fetch is unavailable', async () => {
    const response = await getBackofficeCustomer('cust_001');
    expect(response.item.customerId).toBe('cust_001');
  });

  it('returns fallback order when fetch is unavailable', async () => {
    const response = await getBackofficeOrder('ord_mock_002');
    expect(response.item.orderId).toBe('ord_mock_002');
  });
});
