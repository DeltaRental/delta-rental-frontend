import { GetByIdBrandResponse } from './../models/brands/response/getByIdBrandResponse';
import { GetAllBrandResponse } from './../models/brands/response/getAllBrandResponse';
import { UpdateBrandRequest } from './../models/brands/requests/updateBrandRequest';
import { AddBrandRequest } from './../models/brands/requests/addBrandRequest';
import { AddBrandResponse } from '../models/brands/response/addBrandResponse';
import { UpdateBrandResponse } from '../models/brands/response/updateBrandResponse';
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