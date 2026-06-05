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
          <div className="list-item"><span>Email hash</span><strong>{customer.customerEmailHash ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Enrollment status</span><strong>{customer.enrollmentStatus ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Enrollment transaction</span><strong>{customer.enrollmentTransactionId ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Password change</span><strong>{customer.passwordChangeStatus ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Password request</span><strong>{customer.passwordChangeRequestId ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Last login</span><strong>{customer.lastLoginId ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Last login at</span><strong>{customer.lastLoginAt ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Profile stage</span><strong>{customer.stage ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Updated at</span><strong>{customer.updatedAt ?? 'n/a'}</strong></div>
        </div>
      </BackofficeCard>
    </>
  );
}
