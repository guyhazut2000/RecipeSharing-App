import axios from "../config/axios";

export const getRecipes = async () => {
  return await axios.get("/recipes");
};

export const getRecipeById = async (recipeId: string) => {
  return await axios.get(`/recipes/${recipeId}`);
};

export const createRecipe = async (recipe: any) => {
  return await axios.post("/recipes", recipe);
};

export const updateRecipe = async (recipeId: string, recipe: any) => {
  return await axios.put(`/recipes/${recipeId}`, recipe);
};

export const deleteRecipe = async (recipeId: string) => {
  return await axios.delete(`/recipes/${recipeId}`);
};
