export interface RegisterRequest {
	name: string;
	surname: string;
	gsm: string;
	email: string;
	password: string;
	authorities: string[];
}