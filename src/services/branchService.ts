import { GetAllBranchResponse } from "../models/branches/response/getAllBranchResponse"
import { BaseService } from "./baseService";
import { GetByIdBranchResponse } from "../models/branches/response/getByIdBranchResponse";
import { AddBranchRequest } from "../models/branches/requests/addBranchRequest";
import { AddBranchResponse } from "../models/branches/response/addBranchResponse";
import { UpdateBranchRequest } from "../models/branches/requests/updateBranchRequest";
import { UpdateBranchResponse } from "../models/branches/response/updateBranchResponse";

// export default class BranchService{
//    getAll(){
//     return axios.get<GetAllBranchResponse[]>("http://localhost:8080/api/branches/getAll")
//   }
// }

class BranchService extends BaseService<
GetAllBranchResponse,
GetByIdBranchResponse,
AddBranchRequest,
AddBranchResponse,
UpdateBranchRequest,
UpdateBranchResponse
>{
  constructor() {
		super();
		this.apiUrl = "branches";
	}


}

export default new BranchService();