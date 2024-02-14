import { BaseService } from "./baseService";
import { GetAllCarResponse } from "../models/cars/response/getAllCarResponse";
import { GetByIdCarResponse } from "../models/cars/response/getByIdCarResponse";
import { AddCarRequest } from "../models/cars/requests/addCarRequest";
import { AddCarResponse } from "../models/cars/response/addCarResponse";
import { UpdateCarRequest } from "../models/cars/requests/updateCarRequest";
import { UpdateCarResponse } from "../models/cars/response/updateCarResponse";
import axiosInstance from "../core/utils/interceptors/axiosInterceptors";

// export default class CarService{
//    getAll(){
//     return axios.get("http://localhost:8080/api/cars/getAll",
//     {
//       headers:{
//         'Content-Type' : 'application/json',
//         Authorization: 'Bearer ' + localStorage.getItem('jsonwebtoken')
//       }
//     })
//   }

// }

// {
//    getAll(){
//     return axios.get("http://localhost:8080/api/cars/getAll")
//   }


//   getByCarId(id?:string){
//     return axios.get("http://localhost:8080/api/cars/{id}?id="+id)
//   }

//   getCarAvailability(){
//     return axios.get("http://localhost:8080/api/cars/getCarAvailability")
//   }

// }

class CarService extends BaseService<GetAllCarResponse,
GetByIdCarResponse,
AddCarRequest,
AddCarResponse,
UpdateCarRequest,
UpdateCarResponse
>{
  constructor() {
		super();
		this.apiUrl = "cars";
	}

getFilteredCars(
	startDate: string,
	endDate: string,
	startLocation:string){
	return axiosInstance.get(this.apiUrl + "/filter", {
		params: {
			startDate: startDate,
			endDate:endDate,
			startLocation:startLocation,
		}
	});
}

}

export default new CarService();

