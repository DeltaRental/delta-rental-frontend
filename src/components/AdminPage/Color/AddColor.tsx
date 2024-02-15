import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {  Form, Formik } from "formik";
import { object, string } from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { addColor } from "../../../store/slices/colorSlice";

type Props = {};

const AddColor = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    color: ''
  }
  const validationSchema = object({
    color: string().required("Renk alanı zorunludur").min(3)
  })
  return (
    <div className="bg-gray-800 border border-gray-800 rounded-lg top-0 h-[10rem] shadow-md shadow-blue-600 hover:shadow-lg hover:shadow-yellow-400">  
      <Formik initialValues={initialValues}
        onSubmit={(values) => {
          if (values.color.trim() !== "") {
            dispatch(addColor({ name: values.color }));
            values.color = "";
          }
        }}
        validationSchema={validationSchema}
        >  
        <Form className="p-3">  
          <FormikInput name="color" label="Renk" type="text" placeholder="Renk ekle"/>
          <button type="submit" className="shadow-inner shadow-md shadow-gray-600 font-bold text-gray-800 bg-gray-300 text-sm border border-gray-400 rounded-xl w-[8rem] h-full">
            Renk Ekle
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddColor;
