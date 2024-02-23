import { AddModelRequest } from "../models/carModels/requests/addModelRequest";
import { UpdateModelRequest } from "../models/carModels/requests/updateModelRequest";
import { AddModelResponse } from "../models/carModels/response/addModelResponse";
import { GetAllModelResponse } from "../models/carModels/response/getAllModelResponse";
import { GetByIdModelResponse } from "../models/carModels/response/getByIdModelResponse";
import { UpdateModelResponse } from "../models/carModels/response/updateModelResponse";
import { BaseService } from "./baseService";

class ModelService extends BaseService<
    GetAllModelResponse,
    GetByIdModelResponse,
    AddModelRequest,
    AddModelResponse,
    UpdateModelRequest,
    UpdateModelResponse
>{
    constructor(){
        super();
        this.apiUrl = "models";
    }
    // getByBrandId(brandId: number){
    //     return axiosInstance.get<GetAllModelResponse>(`models/brands/${brandId}`)
    // }
}
export default new ModelService();