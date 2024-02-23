import { GetByIdBranchResponse } from "../../branches/response/getByIdBranchResponse";
import { GetByIdModelResponse } from "../../carModels/response/getByIdModelResponse";
import { GetByIdColorResponse } from "../../colors/response/GetByIdColorResponse";
import { CarState } from "../../enums/carState";
import { FuelType } from "../../enums/fuelType";
import { GearType } from "../../enums/gearType";

export interface GetAllCarResponse {
	id: number;
	kilometer: number;
	year: number;
	dailyPrice: number;
	plate: string;
	model: GetByIdModelResponse;
	color: GetByIdColorResponse;
	carState?: CarState;
	gearType: GearType;
	fuelType: FuelType;
	branch: GetByIdBranchResponse;
	imageUrl: string;
}