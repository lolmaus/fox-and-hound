import { expect, test } from '@playwright/test';
import mock from './helpers/mock';

test.describe('Page Insights', () => {
	test('Should show page views', async ({ page }) => {
		await mock({
			purge: true,
			pageInsights: {
				views: 544,
			},
		});

		await page.goto('/');
		await expect(page.getByRole('heading', { name: 'Welcome to SvelteKit' })).toBeVisible();
		await expect(page.getByTestId('page-view-count-value')).toContainText('545');
	});
});
