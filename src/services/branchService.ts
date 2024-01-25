import axios from "axios"
import { BranchModel } from "../model/BranchModel"

export default class BranchService{
   getAll(){
    return axios.get<BranchModel[]>("http://localhost:8080/api/branches/getAll")
  }
}