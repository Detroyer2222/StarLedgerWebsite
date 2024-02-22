import { StarLedger_Base_Url } from '$lib';
import type { TokenResponse } from '$lib/types';
import { type Cookies } from '@sveltejs/kit';

/**
 * The base URL for the Star Ledger API.
 */
const baseUrl: string = StarLedger_Base_Url;

/**
 * Authenticates a user and sets their access and refresh tokens as cookies.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {Cookies} cookies - The cookies object.
 * @throws Will redirect to '/home' if the response is ok.
 * @returns {Promise<boolean>} A promise that resolves to true if the response is ok, otherwise false.
 */
export async function starLedgerLoginAsync(email: string, password: string, cookies: Cookies): Promise<boolean> {
	const response = await fetch(`${baseUrl}/identity/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: '*/*'
		},
		body: JSON.stringify({ email, password })
	});

	if (response.ok) {
		const tokenResponse = await response.json();
		setCookies(cookies, tokenResponse);

		return true;
	} else {
		// General error
		return false;
	}
}

/**
 * Refreshes the access token using the refresh token.
 *
 * @param {Cookies} cookies - The cookies object.
 * @returns {Promise} A promise that resolves to a fetch response object.
 */
export async function starLedgerRefreshAsync(refreshToken: string, cookies: Cookies) {
	const response = await fetch(`${baseUrl}/identity/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: '*/*'
		},
		body: JSON.stringify({ refreshToken })
	});

	if (response.ok) {
		const tokenResponse: TokenResponse = await response.json();
		setCookies(cookies, tokenResponse);

		return true;
	} else {
		// General error
		return false;
	}
}

function setCookies(cookies: Cookies, tokenResponse: TokenResponse) {
	// TODO: set cookie with svelte kit
	// TODO: set access token and refresh token
	cookies.set('token', tokenResponse.accessToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: tokenResponse.expiresIn
	});

	cookies.set('refreshToken', tokenResponse.refreshToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 30 // 30 days
	});
}
