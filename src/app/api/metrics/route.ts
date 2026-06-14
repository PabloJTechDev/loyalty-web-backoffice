import { NextResponse } from 'next/server';
import { registry } from '@/shared/metrics';

export async function GET() {
  return new NextResponse(await registry.metrics(), {
    headers: {
      'Content-Type': registry.contentType,
    },
  });
}
