import { withLogged } from "../../lib/protectedRoutes";

import { Nutrition } from "../components/Nutrition/index";

export const NutritionPage = withLogged(Nutrition);
