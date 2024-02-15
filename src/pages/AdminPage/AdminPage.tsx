import AdminHome from "../../components/AdminPage/Crud/AdminHome";
import SideBar from "../../components/AdminPage/Sidebar/SideBar";


type Props = {};

const AdminPage = (props: Props) => {

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4 h-screen bg-white">
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
