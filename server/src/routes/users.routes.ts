/**
 * This module defines the routes for the API related to users and recipes. It exports an instance of Express.Router() with all the routes defined.
 * It also imports the necessary middleware and controllers to handle user and recipe operations.
 * The routes are defined in the following order:
 * Users:
 * POST /auth/login - Endpoint for user login
 * POST /auth/logout - Endpoint for user logout
 * POST /auth/refresh-token - Endpoint for refreshing JWT token
 * POST /register - Endpoint for registering a new user
 * PUT, PATCH /:userId - Endpoints for updating user information
 * DELETE /:userId - Endpoint for deleting a user
 * Recipes:
 * GET /:userId/recipes - Endpoint for getting all the recipes for a user
 * GET /:userId/recipes/:recipeId - Endpoint for getting a specific recipe for a user
 * POST /:userId/recipes - Endpoint for creating a new recipe for a user
 * PUT, PATCH /:userId/recipes/:recipeId - Endpoints for updating a recipe for a user
 * DELETE /:userId/recipes/:recipeId - Endpoint for deleting a recipe for a user
 */
import { Router } from "express";
import {
  createUser,
  deleteUser,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/user.controller";
import { authenticateUser } from "../middleware/auth.middleware";
import { refreshToken } from "../controllers/auth.controller";
import {
  validateUserDeleteRequest,
  validateUserUpdateRequest,
  validateUserRequestBody,
} from "../middleware/user.middleware";
import {
  createRecipe,
  deleteRecipeByRecipeId,
  getAllRecipesByUserId,
  getRecipeByRecipeId,
  updateRecipeByRecipeId,
} from "../controllers/recipe.controller";
import {
  validateRecipeCreateRequest,
  validateRecipeDeleteRequest,
  validateRecipeGetRequest,
  validateRecipeUpdateRequest,
} from "../middleware/recipe.middleware";

const router = Router();

router
  // Users
  // POST
  .post("/auth/login", validateUserRequestBody, loginUser)
  .post("/auth/logout", authenticateUser, logoutUser)
  .post("/auth/refresh-token", refreshToken)
  .post("/register", validateUserRequestBody, createUser)
  // PUT, PATCH
  .put(
    "/:userId",
    authenticateUser,
    validateUserRequestBody,
    validateUserUpdateRequest,
    updateUser
  )
  .patch(
    "/:userId",
    authenticateUser,
    validateUserRequestBody,
    validateUserUpdateRequest,
    updateUser
  )
  // DELETE
  .delete("/:userId", authenticateUser, validateUserDeleteRequest, deleteUser)
  // Recipes
  // GET
  .get(
    "/:userId/recipes",
    authenticateUser,
    validateRecipeGetRequest,
    getAllRecipesByUserId
  )
  .get(
    "/:userId/recipes/:recipeId",
    authenticateUser,
    validateRecipeGetRequest,
    getRecipeByRecipeId
  )
  // POST
  .post(
    "/:userId/recipes",
    authenticateUser,
    validateRecipeCreateRequest,
    createRecipe
  )

  // PUT PATCH
  .put(
    "/:userId/recipes/:recipeId",
    authenticateUser,
    validateRecipeUpdateRequest,
    updateRecipeByRecipeId
  )
  .patch(
    "/:userId/recipes/:recipeId",
    authenticateUser,
    validateRecipeUpdateRequest,
    updateRecipeByRecipeId
  )
  // DELETE
  .delete(
    "/:userId/recipes/:recipeId",
    authenticateUser,
    validateRecipeDeleteRequest,
    deleteRecipeByRecipeId
  );

export default router;
