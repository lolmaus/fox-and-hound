import { env } from '$env/dynamic/private';

export const isDbMock = env.DB_MOCK === 'true';
