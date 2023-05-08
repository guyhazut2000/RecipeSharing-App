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

  create = async (recipe: Recipe, accessToken: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    return await axios.post(routes.createRecipe, recipe);
  };

  updateOne = async (
    userId: string,
    accessToken: string,
    recipeId: string,
    update: Recipe
  ) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    return await axios.put(`/users/${userId}/recipes/${recipeId}`, update);
  };

  deleteOne = async (userId: string, recipeId: string) => {
    return await axios.delete(`/users/${userId}/recipes/${recipeId}`);
  };
}

export default new RecipeService();
