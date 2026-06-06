import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BackofficeCard } from '@/features/backoffice/components/BackofficeCard';
import { BackofficePageHeader } from '@/features/backoffice/components/BackofficePageHeader';
import { getBackofficeDashboard } from '@/lib/api/backoffice';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale } from '@/lib/i18n/config';

export default async function BackofficeHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [dashboard, dictionary] = await Promise.all([
    getBackofficeDashboard(),
    Promise.resolve(getDictionary(locale)),
  ]);

  return (
    <>
      <BackofficePageHeader
        title={locale === 'es' ? 'Dashboard operativo backoffice' : 'Backoffice operational dashboard'}
        description={locale === 'es' ? 'Vista inicial para soporte, auditoría y seguimiento transversal.' : 'Initial view for support, audit, and cross-functional operational tracking.'}
        aside={<span className={`badge${dashboard.source === 'live' ? ' badge-live' : ''}`}>{dashboard.source}</span>}
      />

      <section className="grid grid-3">
        {dashboard.kpis.map((kpi) => (
          <BackofficeCard key={kpi.label}>
            <div className="muted">{kpi.label}</div>
            <div className="kpi-value">{kpi.value}</div>
            <div className="muted">{kpi.trend}</div>
          </BackofficeCard>
        ))}
      </section>

      <section className="grid grid-2" style={{ marginTop: 24 }}>
        <BackofficeCard>
          <h2>{locale === 'es' ? 'Colas operativas' : 'Operational queues'}</h2>
          <div className="list">
            {dashboard.queues.map((queue) => (
              <div key={queue.id} className="list-item">
                <div>
                  <strong>{queue.title}</strong>
                  <div className="muted">SLA {queue.sla}</div>
                </div>
                <div><span className="badge">{queue.pending}</span></div>
              </div>
            ))}
          </div>
        </BackofficeCard>

        <BackofficeCard>
          <h2>{dictionary.common.customers}</h2>
          <div className="list">
            {dashboard.customerSnapshots.map((customer) => (
              <div key={customer.customerId} className="list-item">
                <div>
                  <strong>{customer.fullName}</strong>
                  <div className="muted">{customer.tier} · {customer.status}</div>
                </div>
                <div>
                  <Link href={`/${locale}/customers/${customer.customerId}`}>{customer.customerId}</Link>
                </div>
              </div>
            ))}
          </div>
        </BackofficeCard>
      </section>

      {dashboard.recentPointFlows?.length ? (
        <section style={{ marginTop: 24 }}>
          <BackofficeCard>
            <h2>{locale === 'es' ? 'Flujos recientes de points' : 'Recent points flows'}</h2>
            <div className="list">
              {dashboard.recentPointFlows.map((flow) => (
                <div key={`${flow.type}-${flow.referenceId}`} className="list-item">
                  <div>
                    <strong>{flow.type}</strong>
                    <div className="muted">{flow.stage} · {flow.source}</div>
                  </div>
                  <div className="muted">{flow.referenceId}</div>
                </div>
              ))}
            </div>
          </BackofficeCard>
        </section>
      ) : null}

    </>
  );
}
