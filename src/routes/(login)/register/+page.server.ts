import { fail, type Action, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { StarLedger_Base_Url } from '$lib';
import { z } from 'zod';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

const registerSchema = z
	.object({
		email: z.string({ required_error: 'Email is required' }).min(1).email({ message: 'Invalid email address' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, { message: 'Password needs at least 8 letters' })
			.max(64)
			.trim(),
		confirmPassword: z.string(),
		terms: z.enum(['on'], { required_error: 'You must agree to the terms and conditions' })
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	});

const register: Action = async ({ request }) => {
	//const cloned = request.clone();
	const formData = Object.fromEntries(await request.formData());

	const parseResult = registerSchema.safeParse(formData);
	if (!parseResult.success) {
		const { fieldErrors: errors } = parseResult.error.flatten();
		const { password, confirmPassword, ...rest } = formData;
		return fail(422, { data: rest, errors });
	}

	const email = parseResult.data.email;
	const password = parseResult.data.password;

	console.log('serverRequest', JSON.stringify({ email: email, password: password }));
	const response = await fetch(`${StarLedger_Base_Url}/identity/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: '*/*'
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	});
	console.log('response', response);

	if (!response.ok) {
		const responseData = await response.json();
		// Registration failed, handle errors
		const errors = Object.entries(responseData.errors).map(([key]) => `${key}`);

		// Duplicate Email
		if (errors.includes('DuplicateUserName')) {
			return fail(422, { duplicate: true });
		}

		// Return General Error
		return fail(400, { general: true });
	}

	throw redirect(302, '/login?fromRegister=true&email=' + email + '&password=' + password);
};

export const actions: Actions = { register };
