import { withoutLogged } from "../../../lib/protectedRoutes";

import { Login } from "../../components/Auth/Login/index";

export const LoginPage = withoutLogged(Login);
