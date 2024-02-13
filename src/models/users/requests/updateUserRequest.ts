export interface UpdateUserRequest {
	id: number;
	name: string;
	surname: string;
	gsm: string;
	email: string;
	password: string;
	roles: string[];
}