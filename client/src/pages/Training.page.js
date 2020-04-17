import { withLogged } from "../../lib/protectedRoutes";

import { Training } from "../components/Training/index";

export const TrainingPage = withLogged(Training);
