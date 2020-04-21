import { withLogged } from "../../lib/protectedRoutes";
import { Admin } from "../components/Admin/index";

export const AdminPage = withLogged(Admin);
