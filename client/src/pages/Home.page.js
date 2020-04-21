import { withLogged } from "../../lib/protectedRoutes";
import { Home } from "../components/Home/index";

export const HomePage = withLogged(Home);
