import { env } from '$env/dynamic/private';
import type { Session } from '@auth/core/types';
import type { PageInsight, Scribble, User } from '$lib/db/schema';

export const isDbMock = env.DB_MOCK === 'true';

export function nextAvailableId(arr: { id: number }[]): number {
	return (
		(arr
			.map((item) => item.id)
			.sort()
			.pop() ?? 0) + 1
	);
}

export const MockState: {
	session: Session | null;
	pageInsight: PageInsight;
	users: User[];
	scribbles: Scribble[];
} = {
	session: null,
	pageInsight: {
		id: 1,
		views: 0,
	},
	users: [
		{
			id: 'alice',
			name: 'Alice',
			email: 'alice@example.com',
			emailVerified: new Date('2020-02-20'),
			image: '',
		},
	],
	scribbles: [
		{
			id: 1,
			body: 'Hello, world!',
			userId: 'alice',
			createdAt: new Date('2023-01-01'),
		},
	]
}