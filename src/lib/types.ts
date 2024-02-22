export interface TokenResponse {
	tokenType: string;
	accessToken: string;
	expiresIn: number;
	refreshToken: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	organization: string;
}

export interface UpdateUserResponse {
	userId: string;
	organizationId: string;
	starCitizenHandle: string;
	email: string;
}
