import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		return { status: 401, redirect: '/login' };
	}
	return {
		user: locals.user
	};
}) satisfies LayoutServerLoad;
