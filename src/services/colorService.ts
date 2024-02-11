import { AddColorRequest } from "../models/colors/requests/AddColorRequest";
import { UpdateColorRequest } from "../models/colors/requests/UpdateColorRequest";
import { AddColorResponse } from "../models/colors/response/AddColorResponse";
import { GetAllColorResponse } from "../models/colors/response/GetAllColorResponse";
import { GetByIdColorResponse } from "../models/colors/response/GetByIdColorResponse";
import { UpdateColorResponse } from "../models/colors/response/UpdateColorResponse";
import { BaseService } from "./baseService";

class ColorService extends BaseService<
    GetAllColorResponse,
    GetByIdColorResponse,
    AddColorRequest,
    AddColorResponse,
    UpdateColorRequest,
    UpdateColorResponse
>{
    constructor(){
        super();
        this.apiUrl = "colors";
    }
}
export default new ColorService();