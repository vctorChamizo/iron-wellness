import { withLogged } from "../../lib/protectedRoutes";

import { Exersice } from "../components/Training/Exersice/index";

export const ExersicePage = withLogged(Exersice);
