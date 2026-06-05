import { notFound } from 'next/navigation';
import { BackofficeCard } from '@/features/backoffice/components/BackofficeCard';
import { BackofficePageHeader } from '@/features/backoffice/components/BackofficePageHeader';
import { getBackofficeOrder } from '@/lib/api/backoffice';
import { isLocale } from '@/lib/i18n/config';

export default async function OrderDetailPage({ params }: { params: Promise<{ locale: string; orderId: string }> }) {
  const { locale, orderId } = await params;
  if (!isLocale(locale)) notFound();
  const response = await getBackofficeOrder(orderId);
  const order = response.item;

  return (
    <>
      <BackofficePageHeader title={order.orderId} description={`${order.customerId} · ${order.status}`} aside={<span className="badge">USD {order.payableUsd}</span>} />
      <BackofficeCard>
        <div className="list">
          <div className="list-item"><span>Order ID</span><strong>{order.orderId}</strong></div>
          <div className="list-item"><span>Customer ID</span><strong>{order.customerId}</strong></div>
          <div className="list-item"><span>Status</span><strong>{order.status}</strong></div>
          <div className="list-item"><span>Reserved points</span><strong>{order.reservedPoints}</strong></div>
          <div className="list-item"><span>Created at</span><strong>{order.createdAt}</strong></div>
        </div>
      </BackofficeCard>
    </>
  );
}
