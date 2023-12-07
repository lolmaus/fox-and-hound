import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { conn } from '../db/conn.server';
import { SessionMock, isDbMock } from '../db/mock';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import GoogleProvider from '@auth/core/providers/google';
import { GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';

const handleAuth = ((): Handle => {
	if (isDbMock) {
		return ({ event, resolve }) => {
			event.locals.getSession = () => Promise.resolve(SessionMock.session);

			return resolve(event);
		};
	} else {
		return SvelteKitAuth({
			adapter: DrizzleAdapter(conn),
			providers: [
				GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
				GoogleProvider({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET }),
			],
		});
	}
})();

export default handleAuth;
