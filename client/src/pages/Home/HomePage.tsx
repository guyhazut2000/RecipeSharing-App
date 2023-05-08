import Footer from "@component/common/footer/Footer";
import Navbar from "@component/common/navbar";
import RecipesContainer from "@features/recipe/components/RecipesContainer";

const HomePage = () => {
  return (
    <div className="d-flex flex-column justify-content-between w-100 h-100 ">
      <div>
        <Navbar />
        <RecipesContainer />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
