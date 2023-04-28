import { useEffect, useState } from "react";
import * as RecipeService from "../../features/recipe/services/recipes.service";
import Navbar from "src/components/common/navbar";
import RecipeList from "@features/recipe/components/RecipeList";

const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    // get all recipes
    const getAllRecipes = async () => {
      try {
        const response = await RecipeService.getRecipes();
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllRecipes();
  }, []);

  return (
    <div>
      {/* TODO: add navbar with login/logout buttons*/}
      <Navbar />
      {/* TODO: add home page header for recipes */}
      <h1>Some recipe header</h1>
      <h4>some recipes info</h4>
      {/* TODO: display recipes (10 per page) with a sort/filter options */}
      <h3>Display all recipes</h3>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default HomePage;
