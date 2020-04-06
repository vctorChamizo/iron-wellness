import { withoutLogged } from "../../../lib/protectedRoutes";

import { Signup } from "../../components/Auth/Signup/index";

export const SignupPage = withoutLogged(Signup);
