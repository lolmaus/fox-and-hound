import { isDbMock } from '$lib/db/mock';
import { Scribbles, type Scribble, Users, type User } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load = async () => {
	return {
		streamed: fetchScribbles(),
	};
};

const fetchScribbles = async (): Promise<{ scribble: Scribble; user: User | null }[]> => {
	if (isDbMock) {
		const { ScribblesMock, UsersMock } = await import('$lib/db/mock');

		return ScribblesMock.map((scribble) => {
			const user = UsersMock.find((user) => user.id === scribble.userId) ?? null;

			return { scribble, user };
		});
	} else {
		const { conn } = await import('$lib/db/conn.server');
		return await conn.select().from(Scribbles).leftJoin(Users, eq(Users.id, Scribbles.userId));
	}
};
