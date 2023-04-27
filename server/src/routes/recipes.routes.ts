/**
 * This module defines the routes for the API related to recipes. It exports an instance of Express.Router() with all the routes defined.
 * It also imports the necessary middleware and controllers to handle recipe operations.
 * The routes are defined in the following order:
 * Recipes:
 * GET / Endpoints for retrieving a list of all recipes.
 * GET /:recipeId: Endpoints for retrieving a specific recipe by ID.
 * GET /search: Endpoints for retrieving all recipes filtered by a search query, category, cuisine, and/or ingredients.
 * POST /:recipeId/comments: Endpoints for creating a new comment for a recipe.
 * POST /:recipeId/rating: Endpoints for creating a new rating for a recipe.
 */
import { Router } from "express";
import {
  createComment,
  createRating,
  getAllRecipes,
  getRecipeById,
} from "../controllers/recipe.controller";
import { authenticateUser } from "../middleware/auth.middleware";
import {
  validateCommentCreateRequest,
  validateRatingCreateRequest,
} from "../middleware/recipe.middleware";

const router = Router();

router
  // Public routes
  // Get
  .get("/", getAllRecipes) // Retrieve a list of all recipes
  .get("/:recipeId", getRecipeById) // Retrieve a specific recipes
  .get("/search") // Retrieve all recipes filtered by request query [search, category, cuisine, ingredients]
  // Post
  .post(
    "/:recipeId/comments",
    authenticateUser,
    validateCommentCreateRequest,
    createComment
  ) // Create a new comment for a recipe
  .post(
    "/:recipeId/rating",
    authenticateUser,
    validateRatingCreateRequest,
    createRating
  ); // Create a new rating for a recipe

export default router;
