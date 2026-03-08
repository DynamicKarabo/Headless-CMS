import { NextResponse } from 'next/server';
import { db } from '@/db';
import { documents } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

// We map Next.js tags for standard on-demand revalidation.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ modelId: string }> }
) {
  try {
    const { modelId } = await params;
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    let results;

    if (slug) {
      results = await db
        .select()
        .from(documents)
        .where(
          and(
            eq(documents.modelId, modelId),
            eq(documents.slug, slug),
            eq(documents.status, 'published')
          )
        );
    } else {
      results = await db
        .select()
        .from(documents)
        .where(
          and(
            eq(documents.modelId, modelId),
            eq(documents.status, 'published')
          )
        );
    }

    if (!results || results.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Format output just to the user's content JSON footprint and metadata
    const responseData = results.map(doc => ({
      id: doc.id,
      slug: doc.slug,
      publishedAt: doc.publishedAt,
      ...JSON.parse(doc.contentJson)
    }));

    const response = NextResponse.json(slug ? responseData[0] : responseData);

    // Strict Cache-Control headers for Edge Caching / CDN
    response.headers.set('Cache-Control', 'public, s-maxage=31536000, stale-while-revalidate=59');
    
    return response;
  } catch (error) {
    console.error('Edge API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
