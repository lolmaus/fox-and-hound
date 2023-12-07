import { sequence } from '@sveltejs/kit/hooks';
import handleAllowAnyOriginOnApi from '$lib/hooks/allow-any-origin-on-api';
import handleAuth from '$lib/hooks/auth';

export const handle = sequence(
	handleAuth,
	handleAllowAnyOriginOnApi
);
