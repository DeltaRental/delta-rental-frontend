import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import SideBar from "../../components/AdminPage/Sidebar/SideBar";
import AdminHome from "../../components/AdminPage/Crud/AdminHome";
import Brand from "../../components/AdminPage/Brand/Brand";
import AddBrand from "../../components/AdminPage/Brand/AddBrand";
import UpdateBrand from "../../components/AdminPage/Brand/UpdateBrand";

type Props = {};

const AdminPage = (props: Props) => {

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      <div className="row-span-3">
      <SideBar/>
      </div>
      <div className="row-span-2">
      <AdminHome/>
      </div>
      
    </div>
  );
};

export default AdminPage;
