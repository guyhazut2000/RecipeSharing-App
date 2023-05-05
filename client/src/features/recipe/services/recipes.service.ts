import axios from "@config/axios";
import { routes } from "@constants/routes";
import { Recipe } from "../types/recipe.types";
class RecipeService {
  getAll = async () => {
    return await axios.get("/recipes");
  };

  getById = async (recipeId: string) => {
    return await axios.get(`/recipes/${recipeId}`);
  };

  getAllByUserId = async (userId: string, accessToken: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    return await axios.get(`/users/${userId}/recipes`);
  };

  createRecipe = async (recipe: Recipe, accessToken: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    return await axios.post(routes.createRecipe, recipe);
  };

  updateRecipe = async (recipeId: string, recipe: any) => {
    return await axios.put(`/recipes/${recipeId}`, recipe);
  };

  deleteRecipe = async (recipeId: string) => {
    return await axios.delete(`/recipes/${recipeId}`);
  };
}

export default new RecipeService();
