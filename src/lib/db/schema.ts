import type { AdapterAccount } from '@auth/core/adapters';
import { integer, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const PageInsights = pgTable('page_insights', {
	id: serial('id').notNull(),
	views: integer('views').notNull(),
});

export type PageInsight = typeof PageInsights.$inferSelect;

export const PageInsightMock: PageInsight = {
	id: 1,
	views: 0,
};

export const Users = pgTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
});

export type User = typeof Users.$inferSelect;

export const Accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => Users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state'),
	},
	(account) => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId),
	})
);

export type Account = typeof Accounts.$inferSelect;

export const Sessions = pgTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => Users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export type Session = typeof Sessions.$inferSelect;

export const VerificationTokens = pgTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey(vt.identifier, vt.token),
	})
);

export type VerificationToken = typeof VerificationTokens.$inferSelect;
