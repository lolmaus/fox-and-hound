// http://web.archive.org/web/20230327032830/https://snippets.khromov.se/configure-cors-in-sveltekit-to-access-your-api-routes-from-a-different-host/

import { isDbMock } from '$lib/db/mock';
import type { Handle } from '@sveltejs/kit';

const handleAllowAnyOriginOnApi: Handle = async function handleAllowAnyOriginOnApi({ resolve, event }) {
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
          'Access-Control-Allow-Headers': '*',
        },
      });
    }
  }

  const response = await resolve(event);

  if (event.url.pathname.startsWith('/api')) {
    response.headers.append('Access-Control-Allow-Origin', `*`);
  }

  return response;
};

export default handleAllowAnyOriginOnApi;