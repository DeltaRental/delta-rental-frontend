// export interface CarModel {
// 	id: number;
// 	kilometer: number;
// 	year: number;
// 	dailyPrice: number;
// 	plate: string;
// 	modelName: string;
// 	colorName: string;
// 	status ?: boolean;
// }

export interface Branch {
	id: number;
	name?: string;
	address: string;
	gsm: string;
	email: string;
	managerName: string;
	postCode: string;
	city: string;
}

export interface CarModel {
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
	branch: Branch;
}