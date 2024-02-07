export interface AddCarRequest {
	kilometer: number;
	year: number;
	dailyPrice: number;
	plate: string;
	modelId: number;
	colorId: number;
	branchId: number;
	carState: string;
	gearType: string;
	fuelType: string;
}