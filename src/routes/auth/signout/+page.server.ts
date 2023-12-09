import { MockState, isDbMock } from '$lib/db/mock';
import { redirect } from '@sveltejs/kit';

export function load() {
	if (!isDbMock) {
		return new Error('This should never happen.');
	}

	MockState.session = null;

	// ToDo: this should refresh the client tab!
	throw redirect(302, '/?reload');
}
