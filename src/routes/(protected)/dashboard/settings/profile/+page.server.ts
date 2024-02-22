import { fail, type Action, type Actions, type Cookies, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as z from 'zod';
import type { UpdateUserResponse } from '$lib/types';
import { StarLedger_Base_Url } from '$lib';

const updateProfileSchema = z.object({
	starCitizenHandle: z.string({ required_error: 'User name is required' }),
	email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' })
});

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

const updateProfile: Action = async ({ request, cookies, locals }) => {
	const formData = Object.fromEntries(await request.formData());

	const parseResult = updateProfileSchema.safeParse(formData);
	if (!parseResult.success) {
		const { fieldErrors: errors } = parseResult.error.flatten();
		return fail(422, { data: formData, errors });
	}

	const { starCitizenHandle, email } = parseResult.data;
	const token = cookies.get('token');

	if (!token) {
		return fail(401, { message: 'Unauthorized' });
	}

	const response = await updateUser(locals.user.id, starCitizenHandle, email, token);
	if (!response.ok) {
		console.log('Failed to update profile');
		return fail(400, { failed: true });
	}

	const result: UpdateUserResponse = await response.json();
	locals.user.name = result.starCitizenHandle;
	locals.user.email = result.email;

	redirect(302, '/home/logout');
};

async function updateUser(userId: string, starCitizenHandle: string, email: string, token: string) {
	console.log('Updating Profile: ', userId, starCitizenHandle, email);
	const response = await fetch(`${StarLedger_Base_Url}/users/${userId}`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
			Accept: '*/*'
		},
		body: JSON.stringify({ starCitizenHandle, email })
	});

	return response;
}

export const actions: Actions = { updateProfile };
