import { StarLedger_Base_Url } from '$lib';
import starLedgerApiService from '$lib/services/starLedgerApiService';
import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const authHandle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	if (!token) {
		return await resolve(event);
	}

	const user = await setAuthenticatedUser(token);
	if (user) {
		event.locals.user = user;
	}

	return await resolve(event);
};

export const refreshHandle: Handle = async ({ event, resolve }) => {
	const refreshToken = event.cookies.get('refreshToken');

	if (!refreshToken) {
		return await resolve(event);
	}

	const refreshResult = starLedgerApiService.refreshAsync(event.cookies);

	if (await refreshResult) {
		const token = event.cookies.get('token');
		if (!token) {
			return await resolve(event);
		}
		const user = await setAuthenticatedUser(token);
		if (user) {
			event.locals.user = user;
		}
	}

	return await resolve(event);
};

async function setAuthenticatedUser(token: string) {
	const response = await fetch(`${StarLedger_Base_Url}/users/information`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token
		}
	});

	if (!response.ok) {
		return null;
	}

	const data = await response.json();
	const userId = data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
	const name = data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
	const email = data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
	const role = data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

	const user = {
		id: userId,
		name: name,
		email: email,
		role: role
	};

	if (data) {
		return user;
	}
}

export const handle = sequence(authHandle, refreshHandle);
