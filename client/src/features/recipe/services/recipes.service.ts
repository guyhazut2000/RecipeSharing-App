import axios from "@config/axios";
class RecipeService {
  getRecipes = async () => {
    return await axios.get("/recipes");
  };

  getRecipeById = async (recipeId: string) => {
    return await axios.get(`/recipes/${recipeId}`);
  };

  createRecipe = async (recipe: any) => {
    return await axios.post("/recipes", recipe);
  };

  updateRecipe = async (recipeId: string, recipe: any) => {
    return await axios.put(`/recipes/${recipeId}`, recipe);
  };

  deleteRecipe = async (recipeId: string) => {
    return await axios.delete(`/recipes/${recipeId}`);
  };
}

export default new RecipeService();
