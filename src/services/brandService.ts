import { AddBrandRequest } from "../model/brands/request/addBrandRequest";
import { UpdateBrandRequest } from "../model/brands/request/updateBrandRequest";
import { AddBrandResponse } from "../model/brands/response/addBrandResponse";
import { GetAllBrandResponse } from "../model/brands/response/getAllBrandResponse";
import { GetByIdBrandResponse } from "../model/brands/response/getByIdBrandResponse";
import { UpdateBrandResponse } from "../model/brands/response/updateBrandResponse";
import { BaseService } from "./baseService";

class BrandService extends BaseService<
    GetAllBrandResponse,
    GetByIdBrandResponse,
    AddBrandRequest,
    AddBrandResponse,
    UpdateBrandRequest,
    UpdateBrandResponse
>{
    constructor(){
        super();
        this.apiUrl = "brands";
    }
}
export default new BrandService();