export function maybeTrimString(u: string): string;
export function maybeTrimString<T>(u: T): T;
export function maybeTrimString(u: unknown) {
	if (typeof u === 'string') {
		return u.trim();
	}

	return u;
}
