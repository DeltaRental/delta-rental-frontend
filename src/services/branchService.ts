import axios from "axios"

export default class BranchService{
   getAll(){
    return axios.get("http://localhost:8080/api/branches/getAll")
  }
}