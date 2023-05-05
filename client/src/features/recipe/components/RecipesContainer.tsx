import React, { useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import recipesService from "../services/recipes.service";
import { Recipe } from "../types/recipe.types";
import { getTokenFromStorage } from "@features/shared/utils/token.util";
import AddRecipe from "./AddRecipe";

type Props = {
  userId?: string;
};

const RecipesContainer = ({ userId }: Props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const accessToken = getTokenFromStorage("accessToken") || "";
      try {
        const response = userId
          ? await recipesService.getAllByUserId(userId, accessToken)
          : await recipesService.getAll();
        if (response.status === 200) {
          setRecipes(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, [userId]);

  return (
    <div className="d-flex flex-column mx-auto">
      {/* recipe header */}
      {!userId ? (
        <div>
          <h3 className="mt-5 text-center fw-bold text-primary">
            Our Delicious Recipes
          </h3>
          {/* recipe header body */}
          <p className="mb-5 text-center text-secondary">
            Search for the recipe you want in an easy, fast and convenient way.
          </p>
        </div>
      ) : (
        <div className="mx-5 mb-5">
          <h3 className="mt-5 text-center fw-bold text-primary">My Recipes</h3>
          <AddRecipe />
        </div>
      )}
      {/* recipes list */}
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default RecipesContainer;
