import { MockState, isDbMock } from '$lib/db/mock';
import type { RequestEvent } from './$types';
import z from 'zod';

const mockSchema = z.object({
	purge: z.boolean().optional(),

	pageInsights: z
		.object({
			views: z.number().optional(),
		})
		.optional(),

	users: z
		.array(
			z.object({
				id: z.string(),
				name: z.string().nullable(),
				email: z.string(),
				emailVerified: z.coerce.date().nullable(),
				image: z.string().nullable(),
			})
		)
		.optional(),

	scribbles: z
		.array(
			z.object({
				id: z.number(),
				body: z.string().nullable(),
				userId: z.string(),
				createdAt: z.coerce.date().nullable(),
			})
		)
		.optional(),
});

export type MockSchema = z.infer<typeof mockSchema>;

export async function POST({ request }: RequestEvent) {
	if (!isDbMock) {
		return new Response(null, { status: 418 });
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let requestDataRaw: any;

	try {
		requestDataRaw = await request.json();
	} catch (e) {
		if (e instanceof SyntaxError) {
			return new Response(JSON.stringify({ message: 'JSON expoected' }, null, 2), { status: 400 });
		}
	}

	const requestData = mockSchema.parse(requestDataRaw);

	if (requestData.purge === true) {
		MockState.pageInsight = { id: 1, views: 0 };

		MockState.users = [];
		MockState.scribbles = [];
	}

	if (requestData.pageInsights?.views !== undefined) {
		MockState.pageInsight.views = requestData.pageInsights.views;
	}

	if (requestData.users) {
		MockState.users.push(...requestData.users);
	}

	if (requestData.scribbles) {
		MockState.scribbles.push(...requestData.scribbles);
	}

	return new Response(JSON.stringify(MockState, null, 2));
}
