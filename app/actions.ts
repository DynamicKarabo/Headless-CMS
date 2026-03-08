'use server';

import { db } from '@/db';
import { contentModels, documents } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createModel(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Minimal JSON schema for a model. In a real app this would be a dynamic form builder.
  // For now, we'll hardcode a title and body field.
  const schemaJson = JSON.stringify([
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'rich-text', required: false },
  ]);

  await db.insert(contentModels).values({
    id,
    name,
    description,
    schemaJson,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath('/models');
  return { success: true, id };
}

export async function getModels() {
  return await db.select().from(contentModels);
}

export async function createDocument(formData: FormData, modelId: string, contentData: Record<string, any>) {
  const title = contentData.title || 'Untitled';
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
  
  const status = formData.get('status') === 'published' ? 'published' : 'draft';
  
  await db.insert(documents).values({
    id: crypto.randomUUID(),
    modelId,
    slug,
    status,
    contentJson: JSON.stringify(contentData),
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: status === 'published' ? new Date() : null,
  });

  revalidatePath('/content');
  revalidatePath(`/api/content/${modelId}`);
  return { success: true };
}

export async function getDocuments(modelId?: string) {
  if (modelId) {
    return await db.select().from(documents).where(eq(documents.modelId, modelId));
  }
  return await db.select().from(documents);
}
