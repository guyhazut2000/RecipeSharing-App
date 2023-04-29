import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Registration";
import LoginPage from "./pages/Login";
import { routes } from "./config/routes";
import UserRecipesPage from "./pages/UserRecipes/UserRecipesPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.userRecipes} element={<UserRecipesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
