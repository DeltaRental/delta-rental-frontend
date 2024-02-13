export interface AddRentalRequest {
	startDate: string;
	endDate: string;
	startLocation: string;
	carId: number;
	customerId?: number;
	employeeId?: number;
}