import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	// Eat cookies
	cookies.set('token', '', {
		path: '/',
		expires: new Date(0)
	});

	cookies.set('refreshToken', '', {
		path: '/',
		expires: new Date(0)
	});

	redirect(302, '/home/login');
}) satisfies PageServerLoad;
