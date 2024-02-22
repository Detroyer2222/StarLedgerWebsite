import { StarLedger_Base_Url } from '$lib';
import { type Cookies } from '@sveltejs/kit';

/**
 * Service class for interacting with the Star Ledger API.
 */
class StarLedgerApiService {
	/**
	 * The base URL for the Star Ledger API.
	 */
	private baseUrl: string = StarLedger_Base_Url;

	/**
	 * Authenticates a user and sets their access and refresh tokens as cookies.
	 *
	 * @param {string} email - The user's email.
	 * @param {string} password - The user's password.
	 * @param {Cookies} cookies - The cookies object.
	 * @throws Will redirect to '/home' if the response is ok.
	 * @returns {Promise<boolean>} A promise that resolves to true if the response is ok, otherwise false.
	 */
	async loginAsync(email: string, password: string, cookies: Cookies) {
		const response = await fetch(`${this.baseUrl}/identity/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*'
			},
			body: JSON.stringify({ email, password })
		});

		if (response.ok) {
			const tokenResponse = await response.json();
			this.setCookies(cookies, tokenResponse);

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
	async refreshAsync(refreshToken: string, cookies: Cookies) {
		console.log('refreshing token');
		const response = await fetch(`${this.baseUrl}/identity/refresh`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*'
			},
			body: JSON.stringify({ refreshToken })
		});
		console.log('refresh response', response);

		if (response.ok) {
			const tokenResponse: TokenResponse = await response.json();
			this.setCookies(cookies, tokenResponse);

			return true;
		} else {
			// General error
			return false;
		}
	}

	async getAuthenticatedApiClient(cookies: Cookies) {
		const token = cookies.get('token');
		if (!token) {
			return null;
		}
		return fetch(`${this.baseUrl}/api`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + token,
				Accept: '*/*'
			}
		});
	}

	private setCookies(cookies: Cookies, tokenResponse: TokenResponse) {
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
}

export default new StarLedgerApiService();
