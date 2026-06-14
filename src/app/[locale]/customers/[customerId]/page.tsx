import { notFound } from 'next/navigation';
import { BackofficeCard } from '@/shared/ui/BackofficeCard';
import { BackofficePageHeader } from '@/shared/ui/BackofficePageHeader';
import { getBackofficeCustomer, getBackofficeCustomerPoints } from '@/shared/api/backoffice';
import { isLocale } from '@/shared/i18n/config';

export default async function CustomerDetailPage({ params }: { params: Promise<{ locale: string; customerId: string }> }) {
  const { locale, customerId } = await params;
  if (!isLocale(locale)) notFound();

  const [response, pointsDetail] = await Promise.all([
    getBackofficeCustomer(customerId),
    getBackofficeCustomerPoints(customerId),
  ]);
  const customer = response.item;
  const { balance, transactions } = pointsDetail;

  return (
    <>
      <BackofficePageHeader title={customer.fullName} description={`${customer.customerId} · ${customer.tier}`} aside={<span className="badge">{customer.status}</span>} />

      <BackofficeCard>
        <div className="list">
          <div className="list-item"><span>Customer ID</span><strong>{customer.customerId}</strong></div>
          <div className="list-item"><span>Tier</span><strong>{customer.tier}</strong></div>
          <div className="list-item"><span>Email hash</span><strong>{customer.customerEmailHash ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Enrollment status</span><strong>{customer.enrollmentStatus ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Enrollment transaction</span><strong>{customer.enrollmentTransactionId ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Password change</span><strong>{customer.passwordChangeStatus ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Last login</span><strong>{customer.lastLoginId ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Last login at</span><strong>{customer.lastLoginAt ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Profile stage</span><strong>{customer.stage ?? 'n/a'}</strong></div>
          <div className="list-item"><span>Updated at</span><strong>{customer.updatedAt ?? 'n/a'}</strong></div>
        </div>
      </BackofficeCard>

      <BackofficeCard>
        <div className="list">
          <div className="list-item"><span>Balance points</span><strong className="points-value">{balance.balancePoints.toLocaleString()} pts</strong></div>
          <div className="list-item"><span>Lifetime accrued</span><strong>{balance.lifetimeAccrued.toLocaleString()} pts</strong></div>
          <div className="list-item"><span>Lifetime redeemed</span><strong>{balance.lifetimeRedeemed.toLocaleString()} pts</strong></div>
          <div className="list-item"><span>Last updated</span><strong>{balance.updatedAt}</strong></div>
          <div className="list-item"><span>Source</span><strong>{pointsDetail.source}</strong></div>
        </div>
      </BackofficeCard>

      <BackofficeCard>
        <h3 className="section-title">Points transaction history</h3>
        {transactions.length > 0 ? (
          <div className="activity-list">
            {transactions.map((tx: { transactionId: string; type: string; points: number; referenceId: string; source: string; description: string; createdAt: string }) => (
              <div key={tx.transactionId} className="activity-item">
                <div className="activity-item__meta">
                  <strong>{tx.description}</strong>
                  <p className="muted">{tx.type} · {tx.referenceId} · {tx.source}</p>
                  <p className="muted">{tx.createdAt}</p>
                </div>
                <strong className={tx.type === 'accrue' ? 'points-positive' : 'points-negative'}>
                  {tx.type === 'accrue' ? '+' : '-'}{tx.points.toLocaleString()} pts
                </strong>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">No transactions found for this customer.</p>
        )}
      </BackofficeCard>
    </>
  );
}
