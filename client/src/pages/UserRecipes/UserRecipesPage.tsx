import Footer from "@component/common/footer/Footer";
import Navbar from "@component/common/navbar";
import AddRecipe from "@features/recipe/components/AddRecipe";
import RecipesContainer from "@features/recipe/components/RecipesContainer";
import { useSelector } from "react-redux";

type Props = {};

const UserRecipesPage = (props: Props) => {
  const user = useSelector((state: any) => state.user.user);
  return (
    <div className="w-100 h-100 recipe-container">
      <Navbar />
      <RecipesContainer userId={user.id} />
      <Footer />
    </div>
  );
};

export default UserRecipesPage;
