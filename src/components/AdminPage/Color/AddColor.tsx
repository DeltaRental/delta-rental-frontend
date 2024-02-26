import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {  Form, Formik } from "formik";
import { object, string } from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { addColor } from "../../../store/slices/colorSlice";
import { useState } from "react";

type Props = {};

const AddColor = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const[selectedValue, setSelectedValue] = useState({});
  const initialValues = {
    name: ''
  }
  const validationSchema = object({
    name: string().required("Renk alanı zorunludur").min(3)
  })
  const handleAddColor = (values: any)=>{
    dispatch(addColor(values));
    
  }

  return (
    <div className="shadow-2xl shadow-gray-600 rounded-lg mt-3 bg-delta-green-600">  
    <Formik initialValues={initialValues}
      onSubmit={(values, {resetForm}) => {
        handleAddColor(values);
        setSelectedValue(values);
        resetForm();
      }}
      validationSchema={validationSchema}
      >  
      <Form className="w-full grid grid-cols-1 gap-4">  
        <FormikInput 
        name="name" 
        label="Renk" 
        type="text" 
        placeholder="Renk ekle"/>
        <button 
        type="submit" 
        className="bg-delta-green-1000 text-delta-green-400 w-[10rem] h-[2.75rem] rounded-lg font-bold mt-8 ml-6">
          Renk Ekle
        </button>
      </Form>
    </Formik>
  </div>
  );
};

export default AddColor;
