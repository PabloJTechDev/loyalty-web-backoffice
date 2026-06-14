import { NextResponse } from 'next/server';
import { metricsRegistry } from '@pablojtech/loyalty-shared-web/metrics';

export async function GET() {
  return new NextResponse(await metricsRegistry.metrics(), {
    headers: {
      'Content-Type': metricsRegistry.contentType,
    },
  });
}
