import Footer from "@component/common/footer/Footer";
import Navbar from "@component/common/navbar";
import RecipesContainer from "@features/recipe/components/RecipesContainer";

const HomePage = () => {
  return (
    <div className="w-100 h-100 ">
      <Navbar />
      <div>
        <RecipesContainer />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
