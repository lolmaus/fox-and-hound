import { env } from '$env/dynamic/private';
import type { Session } from '@auth/core/types';

export const isDbMock = env.DB_MOCK === 'true';

export const SessionMock: { session: Session | null } = {
	session: null,
};
