import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import GoogleProvider from '@auth/core/providers/google';
import { GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET } from '$env/static/private';
import { sequence } from '@sveltejs/kit/hooks';
import { isDbMock } from '$lib/db/mock';

export const handle = sequence(
	SvelteKitAuth({
		providers: [
			GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
			GoogleProvider({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })
		]
	}),

	// http://web.archive.org/web/20230327032830/https://snippets.khromov.se/configure-cors-in-sveltekit-to-access-your-api-routes-from-a-different-host/
	async function handleAllowAnyOriginOnApi({ resolve, event }) {
		if (!isDbMock) {
			return resolve(event);
		}

		// Apply CORS header for API routes
		if (event.url.pathname.startsWith('/api')) {
			// Required for CORS to work
			if (event.request.method === 'OPTIONS') {
				return new Response(null, {
					headers: {
						'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Headers': '*'
					}
				});
			}
		}

		const response = await resolve(event);

		if (event.url.pathname.startsWith('/api')) {
			response.headers.append('Access-Control-Allow-Origin', `*`);
		}

		return response;
	}
);
