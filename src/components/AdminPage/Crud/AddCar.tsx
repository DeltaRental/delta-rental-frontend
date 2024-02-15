import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { addBrand, brandList } from "../../../store/slices/brandSlice";
import { addModel, modelList } from "../../../store/slices/modelSlice";
import { addColor, colorList } from "../../../store/slices/colorSlice";
import { addBranch, fetchBranches } from "../../../store/slices/branchSlice";
import { addCar } from "../../../store/slices/carListSlice";
import { Field, Form, Formik } from "formik";
import { number, object, string } from "yup";
import AddModel from "../CarModel/AddModel";
import { AddCarRequest } from "../../../models/cars/requests/addCarRequest";
import FormikInput from "../../FormikInput/FormikInput";
import axios from "axios";

type Props = {};

const AddCar = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const[selectedValue, setSelectedValue] = useState({});


  // const brandState = useSelector((state: any) => state.brand);
  // const modelState = useSelector((state: any) => state.model);
  // const colorState = useSelector((state: any) => state.color);
  // const branchState = useSelector((state: any) => state.branch);

  // const [selectBrand, setSelectBrand] = useState<number | any>();
  // const [selectModel, setSelectModel] = useState<number>();
  // const [selectColor, setSelectColor] = useState<number>();
  // const [selectBranch, setSelectBranch] = useState<number>();
  // const [modelName, setModelName] = useState("");
  // const[brandName, setBrandName] = useState("");
  // const[colorName, setColorName] = useState("");
  // const[branchName, setBranchName] = useState("");
  // const [kilometer, setKilometer] = useState<number>(0);
  // const [year, setYear] = useState<number | undefined>(undefined);
  // const [dailyPrice, setDailyPrice] = useState<number>(0);
  // const [plate, setPlate] = useState("");
  // const [carState, setCarState] = useState("");
  // const [gearType, setGearType] = useState("");
  // const [fuelType, setFuelType] = useState("");

  // useEffect(() => {
  //   dispatch(brandList());
  //   dispatch(modelList());
  //   dispatch(colorList());
  //   dispatch(fetchBranches());
  // }, [dispatch]);



  // const handleSelectBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const brandId = parseInt(e.target.value, 10);

  //   setSelectBrand(brandId);
   
  // };

  // const handleSelectModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const modelId = parseInt(e.target.value, 10);
  //   setSelectModel(modelId);
  // };

  // const handleSelectColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const colorId = parseInt(e.target.value, 10);
  //   setSelectColor(colorId);
  // };

  // const handleSelectBranchChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const branchId = parseInt(e.target.value, 10);
  //   setSelectBranch(branchId);
  // };

  
  const initialValues = {
    kilometer: 0,
    year: 0,
    dailyPrice: 0,
    plate: "",
    modelId: 0,
    colorId: 0,
    branchId: 0,
    carState: "",
    gearType: "",
    fuelType: "",
  };
  const validationSchema = object({
    kilometer: number().required("Kilometre alanı zorunludur").min(0),
    year: number().required("Yıl alanı zorunludur").min(0),
    dailyPrice: number().required("Günlük fiyat alanı zorunludur").min(0),
    plate: string().required("Plaka alanı zorunludur").min(3),
    modelId: number().required().min(0),
    colorId: number().required().min(0),
    branchId: number().required().min(0),
    carState: string().required("Araç durumu alanı zorunludur").min(3),
    gearType: string().required("Vites tipi alanı zorunludur").min(3),
    fuelType: string().required("Yakıt tipi alanı zorunludur").min(3),
  });

const handleAddCar = (values: any) =>{
  
    axios.post("http://localhost:8080/api/cars", values).then(
      (response) => {
        console.log(response.data);
        
      },
      (error) => {
        console.log(error);
      }
    );
  
    }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values)=>{
          handleAddCar(values)
          setSelectedValue(values)
        }}
        validationSchema={validationSchema}
      >
       
        <Form >
          <div >
          <FormikInput name="kilometer" label="Kilometre" type="number" placeholder="" />
          <FormikInput name="year" label="Yıl" type="number" placeholder="" />
          <FormikInput name="dailyPrice" label="Günlük Ücret" type="number" placeholder="" />
          <FormikInput name="plate" label="Plaka" type="text" placeholder="" />
          <FormikInput name="modelId" label="Model" type="number" placeholder="" />
          <FormikInput name="colorId" label="Renk" type="number" placeholder="" />
          <FormikInput name="branchId" label="Şube" type="number" placeholder="" />
          <FormikInput name="carState" label="Araç Durumu" type="text" placeholder="" />
          <FormikInput name="gearType" label="Vites Tipi" type="text" placeholder="" />
          <FormikInput name="fuelType" label="Yakıt Tipi" type="text" placeholder="" />
          <button type="submit" >
            Araç Ekle
          </button>
          </div>
        </Form>
       
      </Formik>
    </div>
  );
};

export default AddCar;
