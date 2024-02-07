import { GetByIdBranchResponse } from "../../branches/response/getByIdBranchResponse";


export interface GetAllCarResponse {
	id: number;
	kilometer: number;
	year: number;
	dailyPrice: number;
	plate: string;
	modelName: string;
	colorName: string;
	carState?: string;
	gearType: string;
	fuelType: string;
	branch: GetByIdBranchResponse;
}