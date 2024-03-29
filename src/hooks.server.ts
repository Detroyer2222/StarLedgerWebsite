import { StarLedger_Base_Url } from '$lib';
import { starLedgerRefreshAsync } from '$lib/starLedgerApiService';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const authHandle: Handle = async ({ event, resolve }) => {
	if (event.locals.user) {
		return resolve(event);
	}

	const token = event.cookies.get('token');
	if (!token) {
		return resolve(event);
	}

	const user = await setAuthenticatedUser(token);
	if (user) {
		event.locals.user = user;
	}

	return resolve(event);
};

export const refreshHandle: Handle = async ({ event, resolve }) => {
	if (event.locals.user) {
		console.log('user is already authenticated from refreshHandle');
		return resolve(event);
	}

	const refreshToken = event.cookies.get('refreshToken');
	if (!refreshToken) {
		return resolve(event);
	}

	const refreshResult = await starLedgerRefreshAsync(refreshToken, event.cookies);
	if (refreshResult) {
		const token = event.cookies.get('token');
		if (!token) {
			return redirect(302, '/login');
		}

		const user = await setAuthenticatedUser(token);
		if (user) {
			event.locals.user = user;
		}
	}

	return resolve(event);
};

async function setAuthenticatedUser(token: string) {
	const response = await fetch(`${StarLedger_Base_Url}/users/claims`, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: '*/*'
		}
	});

	if (!response.ok) {
		return null;
	}

	const data = await response.json();
	const userId = data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
	const name = data['StarCitizenHandle'];
	const email = data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
	const role = data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
	const organization = data['Organization'];

	const user = {
		id: userId,
		name: name,
		email: email,
		role: role,
		organization: organization
	};

	return user;
}

export const handle = sequence(authHandle, refreshHandle);
