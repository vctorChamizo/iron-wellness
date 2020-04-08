import { withoutLogged } from "../../../lib/protectedRoutes";

import { Login } from "../../components/Auth/Login";

export const LoginPage = withoutLogged(Login);
