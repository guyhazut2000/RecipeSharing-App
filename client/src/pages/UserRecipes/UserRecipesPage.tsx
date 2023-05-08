import Footer from "@component/common/footer/Footer";
import Navbar from "@component/common/navbar";
import AddRecipe from "@features/recipe/components/AddRecipe";
import RecipesContainer from "@features/recipe/components/RecipesContainer";
import { useSelector } from "react-redux";

type Props = {};

const UserRecipesPage = (props: Props) => {
  const user = useSelector((state: any) => state.user.user);
  return (
    <div className="d-flex flex-column justify-content-between w-100 h-100 ">
      <div>
        <Navbar />
        <RecipesContainer userId={user.id} />
      </div>
      <Footer />
    </div>
  );
};

export default UserRecipesPage;
