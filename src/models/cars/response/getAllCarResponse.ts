import { GetByIdBranchResponse } from "../../branches/response/getByIdBranchResponse";
import { GetByIdModelResponse } from "../../carModels/response/getByIdModelResponse";
import { GetByIdColorResponse } from "../../colors/response/GetByIdColorResponse";

export interface GetAllCarResponse {
	id: number;
	kilometer: number;
	year: number;
	dailyPrice: number;
	plate: string;
	model: GetByIdModelResponse;
	color: GetByIdColorResponse;
	carState?: string;
	gearType: string;
	fuelType: string;
	branch: GetByIdBranchResponse;
}