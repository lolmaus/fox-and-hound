import { isDbMock, nextAvailableId } from '$lib/db/mock';
import { Scribbles, type Scribble, Users, type User } from '$lib/db/schema';
import { maybeTrimString } from '$lib/utils/validation.js';
import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { ZodError, z } from 'zod';

const bodySchema = z.preprocess(maybeTrimString, z.string().min(1).max(1000));
// type BodySchema = z.infer<typeof bodySchema>;

export const load = async () => {
	return {
		streamed: fetchScribbles(),
	};
};

export const actions = {
	default: async ({ locals, request }) => {
		const session = await locals.getSession();

		if (!session?.user) {
			throw error(401);
		}

		const requestData = await request.formData();
		const bodyRaw = requestData.get('body');
		let body: string;

		try {
			body = bodySchema.parse(bodyRaw);
		} catch (e) {
			if (e instanceof ZodError) {
				return fail(400, { error: true, errors: e.errors });
			} else {
				throw e;
			}
		}

		const scribble: Omit<Scribble, 'id'> = {
			body,
			userId: session.user.id,
			createdAt: new Date(),
		};

		if (isDbMock) {
			const { MockState } = await import('$lib/db/mock');

			const id = nextAvailableId(MockState.scribbles);

			const newScribble = {
				...scribble,
				id,
			};

			MockState.scribbles.push(newScribble);

			return newScribble;
		} else {
			const { conn } = await import('$lib/db/conn.server');
			return conn.insert(Scribbles).values(scribble).returning();
		}
	},
};

const fetchScribbles = async (): Promise<{ scribble: Scribble; user: User | null }[]> => {
	if (isDbMock) {
		const { MockState } = await import('$lib/db/mock');

		return MockState.scribbles.map((scribble) => {
			const user = MockState.users.find((user) => user.id === scribble.userId) ?? null;

			return { scribble, user };
		});
	} else {
		const { conn } = await import('$lib/db/conn.server');
		return await conn.select().from(Scribbles).leftJoin(Users, eq(Users.id, Scribbles.userId));
	}
};
