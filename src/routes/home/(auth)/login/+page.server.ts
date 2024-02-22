import { fail, type Actions, type Action, type Cookies, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { starLedgerLoginAsync } from '$lib/starLedgerApiService';

const loginSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
	password: z.string({ required_error: 'Password is required' })
});

export const load = (async ({ url, cookies, locals }) => {
	if (locals.user) {
		return redirect(302, '/dashboard');
	}

	const email = url.searchParams.get('email');
	const password = url.searchParams.get('password');
	const fromRegister = url.searchParams.get('fromRegister');

	if (fromRegister === 'true' && email && password) {
		console.log('Logging in from register');
		starLedgerLoginAsync(email, password, cookies);
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

	await loginAsyncAction(email, password, cookies);
};

async function loginAsyncAction(email: string, password: string, cookies: Cookies) {
	const loginResult = await starLedgerLoginAsync(email, password, cookies);

	if (!(await loginResult).valueOf) {
		return fail(400, { failed: true });
	}

	throw redirect(302, '/dashboard');
}

export const actions: Actions = { login };
