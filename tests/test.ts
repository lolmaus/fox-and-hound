import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.evaluate(async () => {
		await fetch('http://localhost:4173/api/db-mock', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				purge: true,
				pageInsights: {
					views: 544,
				},
			}),
		});
	});
	await new Promise((r) => setTimeout(r, 100))

	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Welcome to SvelteKit' })).toBeVisible();
	await expect(page.getByTestId('page-view-count-value')).toContainText('545');
});
