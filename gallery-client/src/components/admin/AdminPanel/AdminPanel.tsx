import { useLocation } from "react-router-dom";
import { environment } from "../../../utils/enviroment";
import { withAdminAuth } from "../../../hooks/withAdminAuth";

const AdminPanel: React.FC = withAdminAuth(() => {
    return <>Hello Admin!</>
})
export default AdminPanel;
  