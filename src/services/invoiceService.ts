// export default class InvoiceService{
//    getAll(){
//     return axios.get<GetAllInvoiceResponse[]>("http://localhost:8080/api/Invoicees/getAll")
//   }
// }

import axiosInstance from "../core/utils/interceptors/axiosInterceptors";
import { addInvoiceRequest } from "../models/invoices/requests/addInvoiceRequest";
import { updateInvoiceRequest } from "../models/invoices/requests/updateInvoiceRequest";
import { AddInvoiceResponse } from "../models/invoices/response/addInvoiceResponse";
import { getAllInvoiceResponse } from "../models/invoices/response/getAllInvoiceResponse";
import { getByIdInvoiceResponse } from "../models/invoices/response/getByIdInvoiceResponse";
import { UpdateInvoiceResponse } from "../models/invoices/response/updateInvoiceResponse";
import { BaseService } from "./baseService";

class InvoiceService extends BaseService<
  getAllInvoiceResponse,
  getByIdInvoiceResponse,
  addInvoiceRequest,
  AddInvoiceResponse,
  updateInvoiceRequest,
  UpdateInvoiceResponse
> {
  constructor() {
    super();
    this.apiUrl = "invoices";
  }

  getAllInvoiceDetails(userId: any) {
    return axiosInstance.get(this.apiUrl + "/getAllInvoiceDetails?id=" + userId);
  }
  getInvoiceDetails(rentalId: any) {
    return axiosInstance.get(
      this.apiUrl + "/getInvoiceDetails?id=" + rentalId
    );
  }
}

export default new InvoiceService();
