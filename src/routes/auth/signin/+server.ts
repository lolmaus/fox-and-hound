import { MockState, isDbMock } from '$lib/db/mock';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import z from 'zod';

const requestSchema = z.object({
	userId: z.string(),
});

// type ReqeustSchema = z.infer<typeof requestSchema>;

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

	const requestData = requestSchema.parse(requestDataRaw);

	const user = MockState.users.find((user) => user.id === requestData.userId);

	if (!user) {
		throw error(404, { message: `User with id "${requestData.userId}" not found` });
	}

	MockState.session = {
		user: {
			id: user.id,
			name: user.name,
		},
		expires: '2345-01-23',
	};

	return new Response(null);
}
