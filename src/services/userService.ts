import axiosInstance from "../core/utils/interceptors/axiosInterceptors";
import { AddUserRequest } from "../models/users/requests/addUserRequest";
import { UpdateUserRequest } from "../models/users/requests/updateUserRequest";
import { AddUserResponse } from "../models/users/response/addUserResponse";
import { GetAllUserResponse } from "../models/users/response/getAllUserResponse";
import { GetByIdUserResponse } from "../models/users/response/getByIdUserResponse";
import { UpdateUserResponse } from "../models/users/response/updateUserResponse";
import { BaseService } from "./baseService";

class UserService extends BaseService<
    GetAllUserResponse,
    GetByIdUserResponse,
    AddUserRequest,
    AddUserResponse,
    UpdateUserRequest,
    UpdateUserResponse
>{
    constructor(){
        super();
        this.apiUrl = "users";
    }

    getUserInfo(email?:string){
        return axiosInstance.get(this.apiUrl + "/getUserInfo", {
          params: {
            email: email
          }
        });
    }
    
}
export default new UserService();