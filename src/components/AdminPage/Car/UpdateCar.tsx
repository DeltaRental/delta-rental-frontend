import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { updateCar } from "../../../store/slices/carListSlice";
import { GetAllCarResponse } from "../../../models/cars/response/getAllCarResponse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string, number } from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { CarState } from '../../../models/enums/carState';
import { GearType } from '../../../models/enums/gearType';
import { FuelType } from '../../../models/enums/fuelType';
import { UpdateCarRequest } from "../../../models/cars/requests/updateCarRequest";
import { modelList } from "../../../store/slices/modelSlice";
import { colorList } from "../../../store/slices/colorSlice";
import { fetchBranches } from "../../../store/slices/branchSlice";

type Props = {
  onCloseModal: () => void;
  selectedCar: number ;
};

const UpdateCar = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const carListState = useSelector((state: any) => state.car);
  const modelState = useSelector((state: any) => state.model);
  const colorState = useSelector((state: any) => state.color);
  const branchState = useSelector((state: any) => state.branch);

  useEffect(() => {
    dispatch(modelList());
    dispatch(colorList());
    dispatch(fetchBranches());
  }, [dispatch]);

  

const handleUpdateCar = async (values: {
  kilometer:number,
  year: number,
  dailyPrice: number,
  plate: string,
  modelId: number,
  colorId: number,
  branchId: number,
  carState: string,
  gearType: string,
  fuelType: string,
  imageUrl: string,
 }) => {
  if(props.selectedCar !== null) {
     dispatch(updateCar({
      id: props.selectedCar, 
      kilometer: values.kilometer,
      year: values.year,
      dailyPrice: values.dailyPrice,
      plate: values.plate,
      modelId: values.modelId,
      colorId: values.colorId,
      branchId: values.branchId,
      carState: values.carState,
      gearType: values.gearType,
      fuelType: values.fuelType,
      imageUrl: values.imageUrl}));
  } props.onCloseModal();
};

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
  imageUrl: ""
};

  
  return (
   
      <div className=" p-2 w-full overflow-y-auto h-full md:h-[40rem]">
      
           <Formik
          initialValues={initialValues}
          onSubmit={(values)=>
            handleUpdateCar(values)}
          enableReinitialize={true}
          >
          
            <Form className="w-full">
            {props.selectedCar !== null && (
              <div>
                <FormikInput
                  name="kilometer"
                  label="Kilometre"
                  type="number"
                  placeholder=""
                />
              
              
                <FormikInput
                  name="year"
                  label="Yıl"
                  type="number"
                  placeholder=""
                />
              
              
                <FormikInput
                  name="dailyPrice"
                  label="Günlük Ücret"
                  type="number"
                  placeholder=""
                />
              
              
                <FormikInput
                  name="plate"
                  label="Plaka"
                  type="text"
                  placeholder=""
                />
              
                <label className="font-bold flex">Model</label>
                <Field name="modelId" as="select" className="mt-1 text-gray-700 border border-gray-300 rounded-lg w-full">
                  <option value="" disabled>
                    Model Seç{" "}
                  </option>
                  {modelState.models.map((model: any) => (
                    <option key={model.id} value={model.id}>
                      {`${model.brandName} ${model.name}`}
                    </option>
                  ))}
                </Field>
              
                <label className="font-bold flex">Renk</label>
                <Field name="colorId" as="select" className="mt-1 text-gray-700 border border-gray-300 rounded-lg w-full">
                  <option value="" disabled>
                    Renk Seç{" "}
                  </option>
                  {colorState.colors.map((color: any) => (
                    <option key={color.id} value={color.id}>
                      {`${color.name}`}
                    </option>
                  ))}
                </Field>
              
                <label className="font-bold flex">Şube</label>
                <Field name="branchId" as="select" className="mt-1 text-gray-700 border border-gray-300 rounded-lg w-full">
                  <option value="" disabled>
                    Şube Seç{" "}
                  </option>
                  {branchState.branches.map((branch: any) => (
                    <option key={branch.id} value={branch.id}>
                      {` ${branch.name}`}
                    </option>
                  ))}
                </Field>
              
                <label className="font-bold flex">Araç Durumu</label>
                <Field name="carState" as="select" className="mt-1 text-gray-700 border border-gray-300 rounded-lg w-full">
                  <option value="" disabled>
                    Araç Durumu
                  </option>
                  {Object.values(CarState).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Field>
              
                <label className="font-bold flex">Vites</label>
                <Field name="gearType" as="select" className="mt-1 text-gray-700 border border-gray-300 rounded-lg w-full">
                  <option value="" disabled>
                    Vites Tipi
                  </option>
                  {Object.values(GearType).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Field>
              
                <label className="font-bold flex">Yakıt</label>
                <Field name="fuelType" as="select" className="mt-1 mb-1 text-gray-700 border border-gray-300 rounded-lg w-full">
                  <option value="" disabled>
                    Yakıt Tipi
                  </option>
                  {Object.values(FuelType).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Field>
              
                <FormikInput
                  name="imageUrl"
                  label="Görsel"
                  type="text"
                  placeholder="Yüklenen görselin URL'ini ekle"
                />
              
              <button type="submit" className="bg-sidebar text-white w-[6rem] h-[2.75rem] rounded-lg font-bold">Güncelle</button>
              </div>
            )}
              </Form>
          </Formik> 
        
      </div>
  );
};

export default UpdateCar;
