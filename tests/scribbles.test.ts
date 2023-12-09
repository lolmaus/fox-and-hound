import { expect, test } from '@playwright/test';
import mock from './helpers/mock';

test.describe('Scribbles', () => {
	test('Should display the default message when there are no scribbles', async ({ page }) => {
		await mock({
			purge: true,
		});

		await page.goto('/scribbles');
		await expect(page.getByText('There are no scribbles yet.')).toBeVisible();
	});

	test('Should display scribbles', async ({ page }) => {
		await mock({
			purge: true,
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
			],
		});

		await page.goto('/scribbles');
		await expect(page.getByText('There are no scribbles yet.')).toHaveCount(0);
	});
});
