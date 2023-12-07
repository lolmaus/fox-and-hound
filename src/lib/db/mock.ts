import { env } from '$env/dynamic/private';
import type { Session } from '@auth/core/types';
import type { PageInsight, Scribble, User } from '$lib/db/schema';

export const isDbMock = env.DB_MOCK === 'true';

export const SessionMock: { session: Session | null } = {
	session: null,
};

export const PageInsightMock: PageInsight = {
	id: 1,
	views: 0,
};

export const UsersMock: User[] = [
	{
		id: 'alice',
		name: 'Alice',
		email: 'alice@example.com',
		emailVerified: new Date('2020-20-20'),
		image: '',
	},
];

export const ScribblesMock: Scribble[] = [
	{
		id: 1,
		body: 'Hello, world!',
		userId: 'alice',
		createdAt: new Date('2023-01-01'),
	},
];
