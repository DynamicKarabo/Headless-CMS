import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

// export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { modelId, secret } = await request.json();

    // Verify webhook secret - in production this would be an env var
    if (secret !== process.env.WEBHOOK_SECRET && secret !== 'dev-secret') {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    if (!modelId) {
      return NextResponse.json({ message: 'Missing modelId' }, { status: 400 });
    }

    // Revalidate the Edge API route for this specific model
    revalidatePath(`/api/content/${modelId}`);

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
