import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { conn } from '../db/conn.server';
import { MockState, isDbMock } from '../db/mock';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import GoogleProvider from '@auth/core/providers/google';
import { GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';

const handleAuth = ((): Handle => {
	if (isDbMock) {
		return ({ event, resolve }) => {
			event.locals.getSession = () => Promise.resolve(MockState.session);

			return resolve(event);
		};
	} else {
		return SvelteKitAuth({
			adapter: DrizzleAdapter(conn),
			providers: [
				GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
				GoogleProvider({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET }),
			],
			callbacks: {
				async session({ session, user }) {
					if (!session.user) {
						throw new Error('Expected `session.user` to exist at this point.');
					}

					session.user.id = user.id;

					return session;
				},
			},
		});
	}
})();

export default handleAuth;
