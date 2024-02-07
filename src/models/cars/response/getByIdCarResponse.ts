export interface GetByIdCarResponse {
	id: number;
	kilometer: number;
	year: number;
	dailyPrice: number;
	plate: string;
	modelName: string;
	colorName: string;
	location: string;
	carState: string;
	gearType: string;
	fuelType: string;
}