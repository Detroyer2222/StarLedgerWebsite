import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	redirect(302, '/');
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ cookies }) => {
		// Eat cookies
		cookies.set('token', '', {
			path: '/',
			expires: new Date(0)
		});

		cookies.set('refreshToken', '', {
			path: '/',
			expires: new Date(0)
		});

		redirect(302, '/login');
	}
};
