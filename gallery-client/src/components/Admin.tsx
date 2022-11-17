import { useLocation } from "react-router-dom";
import { environment } from "../utils/enviroment";

const Admin: React.FC = () => {
    const location = useLocation();
    window.location.replace(`${environment.adminBaseUrl}${location.pathname}`);
    return null;
}
export default Admin;
  