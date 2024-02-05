import axios from "axios"

export default class CarService{
   getAll(){
    return axios.get("http://localhost:8080/api/cars/getAll",
    {
      headers:{
        'Content-Type' : 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jsonwebtoken')
      }
    })
  }

  getByCarId(id?:string){
    return axios.get("http://localhost:8080/api/cars/{id}?id="+id)
  }

  getCarAvailability(){
    return axios.get("http://localhost:8080/api/cars/getCarAvailability")
  }
}