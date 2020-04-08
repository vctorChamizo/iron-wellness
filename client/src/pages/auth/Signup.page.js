import { withoutLogged } from "../../../lib/protectedRoutes";

import { Signup } from "../../components/Auth/Signup";

export const SignupPage = withoutLogged(Signup);
