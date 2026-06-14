'use client';

import { ErrorState } from '@pablojtech/loyalty-shared-web/ui/state';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorState title="No pudimos cargar el backoffice" description="Intenta nuevamente." action={<button onClick={() => reset()}>Reintentar</button>} />;
}
