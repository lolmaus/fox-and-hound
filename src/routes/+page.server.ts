import { isDbMock } from '$lib/db/mock';
import { PageInsights } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load = async () => {
	return {
		streamed: {
			views: fetchViews(),
		},
	};
};

const fetchViews = async (): Promise<number> => {
	if (isDbMock) {
		const { PageInsightMock: PageInsightsMock } = await import('$lib/db/schema');

		return ++PageInsightsMock.views;
	} else {
		const { conn } = await import('$lib/db/conn.server');
		const insights = await conn.select().from(PageInsights).where(eq(PageInsights.id, 1));

		const views = ++insights[0].views;

		await conn.update(PageInsights).set({ views }).where(eq(PageInsights.id, 1)).returning();

		return views;
	}
};
