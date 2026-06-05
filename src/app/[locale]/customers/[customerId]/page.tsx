import { notFound } from 'next/navigation';
import { BackofficeCard } from '@/features/backoffice/components/BackofficeCard';
import { BackofficePageHeader } from '@/features/backoffice/components/BackofficePageHeader';
import { getBackofficeCustomer } from '@/lib/api/backoffice';
import { isLocale } from '@/lib/i18n/config';

export default async function CustomerDetailPage({ params }: { params: Promise<{ locale: string; customerId: string }> }) {
  const { locale, customerId } = await params;
  if (!isLocale(locale)) notFound();
  const response = await getBackofficeCustomer(customerId);
  const customer = response.item;

  return (
    <>
      <BackofficePageHeader title={customer.fullName} description={`${customer.customerId} · ${customer.tier}`} aside={<span className="badge">{customer.status}</span>} />
      <BackofficeCard>
        <div className="list">
          <div className="list-item"><span>Customer ID</span><strong>{customer.customerId}</strong></div>
          <div className="list-item"><span>Tier</span><strong>{customer.tier}</strong></div>
          <div className="list-item"><span>Available points</span><strong>{customer.availablePoints}</strong></div>
          <div className="list-item"><span>Last order</span><strong>{customer.lastOrderId}</strong></div>
        </div>
      </BackofficeCard>
    </>
  );
}
