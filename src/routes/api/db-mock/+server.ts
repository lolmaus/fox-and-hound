import { isDbMock } from '$lib/db/mock';
import { PageInsightsMock } from '$lib/db/schema';
import type { RequestEvent } from './$types';

export async function POST({ request }: RequestEvent) {
	if (!isDbMock) {
		return new Response(null, { status: 418 });
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let requestData: any;

	try {
		requestData = await request.json();
	} catch (e) {
		if (e instanceof SyntaxError) {
			return new Response(JSON.stringify({ message: 'JSON expoected' }, null, 2), { status: 400 });
		}
	}

	if (typeof requestData !== 'object') {
		return new Response(JSON.stringify({ message: 'Object expected' }, null, 2), { status: 400 });
	}

	if (requestData.purge === true) {
		PageInsightsMock.id = 1;
		PageInsightsMock.views = 0;
	}

	if (typeof requestData.pageInsights === 'object') {
		if (requestData.pageInsights.id === 'number') {
			PageInsightsMock.id = requestData.pageInsights.id;
		}

		if (typeof requestData.pageInsights.views === 'number') {
			PageInsightsMock.views = requestData.pageInsights.views;
		}
	}

	return new Response(
		JSON.stringify(
			{
				pageInsights: PageInsightsMock
			},
			null,
			2
		)
	);
}
