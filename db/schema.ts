import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const contentModels = sqliteTable('content_models', {
  id: text('id').primaryKey(), // We'll use short UUIDs or slugs
  name: text('name').notNull(),
  description: text('description'),
  schemaJson: text('schema_json').notNull(), // JSON representing fields layout
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const documents = sqliteTable('documents', {
  id: text('id').primaryKey(),
  modelId: text('model_id')
    .notNull()
    .references(() => contentModels.id),
  slug: text('slug').notNull().unique(),
  contentJson: text('content_json').notNull(), // JSON capturing the actual data
  publishedAt: integer('published_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});
