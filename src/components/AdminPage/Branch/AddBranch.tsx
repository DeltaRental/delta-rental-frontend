import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {  Form, Formik } from "formik";
import { object, string } from "yup";
import FormikInput from "../../FormikInput/FormikInput";
import { addBranch } from "../../../store/slices/branchSlice";

type Props = {};

const AddBranch = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    branch: '',
    address: '',
    gsm: '',
    email: '',
    managerName: '',
    postCode: '',
    city: ''
  }
  const validationSchema = object({
    branch: string().required("Şube alanı zorunludur").min(3),
    address: string().required("Şube alanı zorunludur").min(3),
    gsm: string().required("Şube alanı zorunludur").min(3),
    email: string().required("Şube alanı zorunludur").min(3),
    managerName: string().required("Şube alanı zorunludur").min(3),
    postCode: string().required("Şube alanı zorunludur").min(3),
    city: string().required("Şube alanı zorunludur").min(3),
  })
  return (
    <div className="bg-gray-800 border border-gray-800 rounded-lg top-0 shadow-md shadow-blue-600 hover:shadow-lg hover:shadow-yellow-400">  
      <Formik initialValues={initialValues}
        onSubmit={(values) => {
          if (values.branch.trim() !== "") {
            dispatch(addBranch({ name: values.branch, address:values.branch, gsm:values.branch, email: values.branch, 
            managerName: values.branch, postCode:values.branch, city:values.branch }));
            values.branch = "";
          }
        }}
        validationSchema={validationSchema}
        >  
        <Form className="p-3">  
          <FormikInput name="branch" label="Şube" type="text" placeholder="Şube"/>
          <FormikInput name="address" label="Adres" type="text" placeholder="Adres"/>
          <FormikInput name="gsm" label="Gsm" type="text" placeholder="Gsm"/>
          <FormikInput name="email" label="Email" type="text" placeholder="Email"/>
          <FormikInput name="managerName" label="Yönetici Adı" type="text" placeholder="Yönetici Adı"/>
          <FormikInput name="postCode" label="Posta Kodu" type="text" placeholder="Posta Kodu"/>
          <FormikInput name="city" label="Şehir" type="text" placeholder="Şehir"/>
          <button type="submit" className="shadow-md shadow-gray-600 font-bold text-gray-800 bg-gray-300 text-sm border border-gray-400 rounded-xl w-[8rem] h-full">
            Şube Ekle
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddBranch;
