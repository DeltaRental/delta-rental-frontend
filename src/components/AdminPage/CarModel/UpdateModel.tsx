import React, { useEffect } from "react";
import UpdateCar from "../Car/UpdateCar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { brandList } from "../../../store/slices/brandSlice";
import { updateModel } from "../../../store/slices/modelSlice";
import { Field, Form, Formik } from "formik";
import FormikInput from "../../FormikInput/FormikInput";
type Props = {
  closeModal: () => void;
  selectedModel: number ;
};

const UpdateModel = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const brandState = useSelector((state: any) => state.brand);
  const modelState = useSelector((state: any) => state.model);

  useEffect(() => {
    dispatch(brandList());
    
  }, [dispatch]);

  const handleUpdateModel = async (values: {
    name: string;
    brandId: number;
  }) => {
    if (props.selectedModel !== null) {
      dispatch(
        updateModel({
          id: props.selectedModel,
          name: values.name,
          brandId: values.brandId,
          
        })
      );
    }props.closeModal();
  };

  const selectedModel = modelState.models.find((model: any) => model.id === props.selectedModel);
  const initialValues = {
    name: selectedModel ? selectedModel.name : "",
    brandId: selectedModel ? selectedModel.brandId : 0
  };

  return (
    
      <div className="ml-[4.5rem] w-[31.50rem] ">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleUpdateModel(values)}
          enableReinitialize={true}
        >
          <Form className="mt-3">
            {props.selectedModel !== null && (
              <div className="grid grid-col-1">
                <FormikInput
                  name="name"
                  label="Model"
                  type="text"
                  placeholder="Model adı"
                />

                <label className="font-bold ">Marka</label>
                <Field
                  name="brandId"
                  as="select"
                  className="mt-1 text-gray-700 border border-gray-300 rounded-lg"
                >
                  <option value="" disabled>
                    Marka Seç{" "}
                  </option>
                  {brandState.brands.map((brand: any) => (
                    <option key={brand.id} value={brand.id} 
                    selected={brand.id === initialValues.brandId}>
                      {`${brand.name} `}
                    </option>
                  ))}
                </Field>

                <button
                  type="submit"
                  className="bg-sidebar text-white w-[6rem] h-[2.75rem] rounded-lg font-bold mt-2"
                >
                  Güncelle
                </button>
              </div>
            )}
          </Form>
        </Formik>
      </div>
  );
};

export default UpdateModel;
