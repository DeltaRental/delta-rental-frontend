import axiosInstance from "../core/utils/interceptors/axiosInterceptors";
import { AddRentalRequest } from "../models/rentals/requests/AddRentalRequest";
import { UpdateRentalRequest } from "../models/rentals/requests/UpdateRentalRequest";
import { AddRentalResponse } from "../models/rentals/response/AddRentalResponse";
import { GetAllRentalResponse } from "../models/rentals/response/GetAllRentalResponse";
import { GetByIdRentalResponse } from "../models/rentals/response/GetByIdRentalResponse";
import { UpdateRentalResponse } from "../models/rentals/response/UpdateRentalResponse";
import { BaseService } from "./baseService";

class RentalService extends BaseService<
  GetAllRentalResponse,
  GetByIdRentalResponse,
  AddRentalRequest,
  AddRentalResponse,
  UpdateRentalRequest,
  UpdateRentalResponse
> {
  constructor() {
    super();
    this.apiUrl = "rentals";
  }

  getRentalByUser(userId:any) {
    return axiosInstance.get(this.apiUrl + "/getRentalByUser?id=" + userId);
  }
}
export default new RentalService();
