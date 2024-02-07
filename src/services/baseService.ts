import { AxiosResponse } from "axios";
import axiosInstance from "../core/utils/interceptors/axiosInterceptors";


export class BaseService<
    GetAllType,
    GetByIdType,
    AddRequestType,
    AddResponseType,
    UpdateRequestType,
    UpdateResponseType,
    >{
        public apiUrl: string;

        constructor(){
            this.apiUrl = "";
        }

        getAll(): Promise<AxiosResponse<GetAllType, any>>{
            return axiosInstance.get<GetAllType>(this.apiUrl + "/getAll");
        }

        getById(id?:string): Promise<AxiosResponse<GetByIdType, any>>{
            return axiosInstance.get<GetByIdType>(this.apiUrl + "/" + id);
        }
        add(request: AddRequestType): Promise<AxiosResponse<AddResponseType, any>>{
            return axiosInstance.post<AddResponseType>(this.apiUrl, request);
        }
        update(request: UpdateRequestType): Promise<AxiosResponse<UpdateResponseType, any>>{
            return axiosInstance.put<UpdateResponseType>(this.apiUrl, request);
        }
        delete(id: number){
            return axiosInstance.delete(this.apiUrl + "/" + id);
        }
    }