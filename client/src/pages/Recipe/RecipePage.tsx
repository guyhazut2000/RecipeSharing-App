import Footer from "@component/common/footer/Footer";
import Navbar from "@component/common/navbar";
import Recipe from "@features/recipe/components/Recipe";
import recipesService from "@features/recipe/services/recipes.service";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {};

const RecipePage = (props: Props) => {
  const [recipe, setRecipe] = useState();
  const location = useLocation();

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeId = location.pathname.split("/")[2];
      const response = await recipesService.getById(recipeId);
      setRecipe(response.data);
    };
    fetchRecipe();
  }, []);
  return (
    <div className="d-flex flex-column justify-content-between w-100 h-100">
      <div>
        <Navbar />
        {!recipe ? <p>Loading ...</p> : <Recipe recipe={recipe} />}
      </div>
      <Footer />
    </div>
  );
};

export default RecipePage;
