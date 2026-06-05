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
      <BackofficePageHeader
        title={order.orderId}
        description={`${order.customerId} · ${order.status}`}
        aside={<span className="badge">{order.currency ?? 'USD'} {order.payableUsd}</span>}
      />
      <BackofficeCard>
        <div className="list">
          <div className="list-item"><span>Order ID</span><strong>{order.orderId}</strong></div>
          <div className="list-item"><span>Customer ID</span><strong>{order.customerId}</strong></div>
          <div className="list-item"><span>Reservation ID</span><strong>{order.reservationId ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Status</span><strong>{order.status}</strong></div>
          <div className="list-item"><span>Reserved points</span><strong>{order.reservedPoints}</strong></div>
          <div className="list-item"><span>Created at</span><strong>{order.createdAt}</strong></div>
        </div>
      </BackofficeCard>
      {order.summary ? (
        <BackofficeCard>
          <div className="list">
            <div className="list-item"><span>Items</span><strong>{order.summary.itemCount}</strong></div>
            <div className="list-item"><span>Subtotal</span><strong>{order.currency ?? 'USD'} {order.summary.subtotalUsd}</strong></div>
            <div className="list-item"><span>Requested points</span><strong>{order.summary.requestedPoints}</strong></div>
            <div className="list-item"><span>Reserved points</span><strong>{order.summary.reservedPoints}</strong></div>
            <div className="list-item"><span>Covered USD</span><strong>{order.currency ?? 'USD'} {order.summary.coveredUsd}</strong></div>
            <div className="list-item"><span>Payable USD</span><strong>{order.currency ?? 'USD'} {order.summary.payableUsd}</strong></div>
          </div>
        </BackofficeCard>
      ) : null}
      {order.lines?.length ? (
        <BackofficeCard>
          <div className="list">
            {order.lines.map((line) => (
              <div className="list-item" key={`${line.productId}-${line.sku}`}>
                <span>{line.name} · {line.quantity}x</span>
                <strong>{order.currency ?? 'USD'} {line.lineSubtotalUsd}</strong>
              </div>
            ))}
          </div>
        </BackofficeCard>
      ) : null}
    </>
  );
}
