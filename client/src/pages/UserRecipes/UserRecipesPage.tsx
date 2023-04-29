import Footer from "@component/common/footer/Footer";
import Navbar from "@component/common/navbar";
import RecipesContainer from "@features/recipe/components/RecipesContainer";
import { useSelector } from "react-redux";

type Props = {};

const UserRecipesPage = (props: Props) => {
  const user = useSelector((state: any) => state.user.user);
  return (
    <div className="w-100 h-100 ">
      <Navbar />
      <div>
        <RecipesContainer userId={user.id} />
      </div>
      <Footer />
    </div>
  );
};

export default UserRecipesPage;
