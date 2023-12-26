import axios from "axios"

export default class CarService{
  getProducts(){
    return axios.get("http://localhost:8080/api/cars/getAll")
  }

  getByCarId(id){
    return axios.get("http://localhost:8080/api/cars/{id}?id="+id)
  }
}