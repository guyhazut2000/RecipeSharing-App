import axios from "../config/axios";

export const getRecipes = async () => {
  const response = await axios.get("/recipes");
  return response.data;
};

export const getRecipeById = async (recipeId: string) => {
  const response = await axios.get(`/recipes/${recipeId}`);
  return response.data;
};

export const createRecipe = async (recipe: any) => {
  const response = await axios.post("/recipes", recipe);
  return response.data;
};

export const updateRecipe = async (recipeId: string, recipe: any) => {
  const response = await axios.put(`/recipes/${recipeId}`, recipe);
  return response.data;
};

export const deleteRecipe = async (recipeId: string) => {
  const response = await axios.delete(`/recipes/${recipeId}`);
  return response.data;
};
