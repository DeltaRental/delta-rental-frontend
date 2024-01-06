import { Form, Formik } from 'formik'
import { number, object } from 'yup';
import FormikInput from '../components/FormikInput/FormikInput';

type Props = {}

function CarAdd(props: Props) {

  const initialValues = {
    kilometer: 0.0,
    year: 2000,
    dailyPrice: 0,
    plate: "",
    modelId: 0,
    colorId: 0
  };

  const validationSchema = object({
    kilometer: number().required("Kilometre boş geçilemez."),
    year: number().required("Yıl boş geçilemez."),
  });


  return (
    <div className="container ">
      <Formik
        
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="row justify-content-md-center">
            <div className="col-8">
              <FormikInput name="kilometer" label="Kilometer" type="number"/>
              <FormikInput name="year" label="Year" type="number"/>
              <FormikInput name="dailyPrice" label="Daily Price" type="number" />
              <FormikInput name="plate" label="Plate" type="text" />
              <FormikInput name="modelId" label="Model Id" type="number" />
              <FormikInput name="colorId" label="Color Id" type="number" />

              <div>
                <button type="submit" className="btn btn-success ">
                  Ürünü Ekle
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default CarAdd