import { fail, type Actions, type Action, type Cookies, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import StarLedgerApiService from '$lib/services/starLedgerApiService';
import { z } from 'zod';

const loginSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
	password: z.string({ required_error: 'Password is required' })
});

export const load = (async ({ url, cookies }) => {
	const email = url.searchParams.get('email');
	const password = url.searchParams.get('password');
	const fromRegister = url.searchParams.get('fromRegister');

	if (fromRegister === 'true' && email && password) {
		console.log('Logging in from register');
		loginAsync(email, password, cookies);
	}

	return {};
}) satisfies PageServerLoad;

const login: Action = async ({ request, cookies }) => {
	const formData = Object.fromEntries(await request.formData());

	const parseResult = loginSchema.safeParse(formData);
	if (!parseResult.success) {
		const { fieldErrors: errors } = parseResult.error.flatten();
		const { password, ...rest } = formData;
		return fail(422, { data: rest, errors });
	}

	const email = parseResult.data.email;
	const password = parseResult.data.password;

	await loginAsync(email, password, cookies);
};

async function loginAsync(email: string, password: string, cookies: Cookies) {
	const loginResult = await StarLedgerApiService.loginAsync(email, password, cookies);

	if (!(await loginResult).valueOf) {
		return fail(400, { failed: true });
	}

	throw redirect(302, '/home');
}

export const actions: Actions = { login };
