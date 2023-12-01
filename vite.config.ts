import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import dotenvExpand from 'dotenv-expand';

export default defineConfig(({ mode }) => {
	// https://github.com/vercel/storage/tree/main/packages/postgres#a-note-for-vite-users
	if (mode === 'development') {
		const env = loadEnv(mode, process.cwd(), '');
		dotenvExpand.expand({ parsed: env });
	}

	return {
		plugins: [sveltekit()],
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}'],
		},
	};
});
