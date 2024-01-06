import { ErrorMessage, Field, getIn, useField } from "formik";

type Props = {
  name: string,
  label: string,
  type?: string,
  placeholder?: string,
};


const FormikInput = (props: Props) => {
  const [field, meta] = useField(props.name); // İlgili formikde ilgili input elemanından bilgi toplar.


  return (
    <>
      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text" id="title">
            {props.label}
          </span>
          <Field
            type={props.type || "text"}
            className={`form-control ${meta.touched && meta.error ? "is-invalid" : ""}`}
            {...field}
            name={props.name}
            aria-describedby="title"
            placeholder={props.placeholder || ""}
          />
        </div>
        <ErrorMessage name={props.name}>
          {
          (message) => <span className="text-danger">{message}</span>
          }
        </ErrorMessage>
      </div>
    </>
  );
};

export default FormikInput;