export interface GetByIdUserResponse {
	id: number;
	name: string;
	surname: string;
	gsm: string;
	email: string;
	authorities: string[];
}