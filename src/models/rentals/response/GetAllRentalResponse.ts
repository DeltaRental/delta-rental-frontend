import { GetByIdCarResponse } from "../../cars/response/getByIdCarResponse";

export interface GetAllRentalResponse{
    id: number;
    startDate: Date;
    endDate: Date;
    returnDate: Date;
    startKilometer: number;
    endKilometer: number;
    totalPrice: number;
    discount: number;
    car: GetByIdCarResponse;
    //customer: GetByIdCustomerResponse;
    //employee: GetByIdEmployeeResponse;
}