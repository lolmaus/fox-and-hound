import { isDbMock } from '$lib/db/mock';
import { PageInsightMock } from '$lib/db/mock';
import type { RequestEvent } from './$types';
import z from 'zod';

const schema = z.object({
	purge: z.boolean().optional(),

	pageInsights: z
		.object({
			views: z.number().optional(),
		})
		.optional(),
});

type Schema = z.infer<typeof schema>;

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

	const requestData = schema.parse(requestDataRaw);

	if (requestData.purge === true) {
		PageInsightMock.id = 1;
		PageInsightMock.views = 0;
	}

	if (requestData.pageInsights?.views !== undefined) {
		PageInsightMock.views = requestData.pageInsights.views;
	}

	const response: Schema = {
		pageInsights: PageInsightMock,
	};

	return new Response(JSON.stringify(response, null, 2));
}
