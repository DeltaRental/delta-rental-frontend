import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { faCarSide, faPen, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddCar from "../Crud/AddCar";
import UpdateCar from "../Crud/UpdateCar";
import Link from "../../CustomLink/Link";

export const datas =[
    {
        id:1,
        icon: <FontAwesomeIcon icon={faCarSide}/>,
        text: <Link to="/admin">{"Araç Ekle"} </Link>
    },
    {
        id:2,
        icon:<FontAwesomeIcon icon={faPen}/>,
        text: "Araçlarım"
    },
    {
        id:3,
        icon:<FontAwesomeIcon icon={faBuilding}/>,
        text: "Ofisler"
    },
    {
        id:4,
        icon:<FontAwesomeIcon icon={faCreditCard}/>,
        text: "Ödemeler"
    }
]