import { NextFunction, Request, Response } from "express";
import { Recipe } from "../types/recipe.type";
import RecipeModel from "../models/Recipe.model";
import { HttpStatusCode } from "../constants/httpStatusCode";
import ApiResponse, { ApiError } from "../utils/api.util";
import { AuthenticatedRequest } from "../types/auth.type";
import { Comment, Rating } from "../types/recipe.type";
import mongoose, { Types } from "mongoose";

/**
 * Get all recipes from Database
 * @param {Request} req - The request object sent by the client.
 * @param {Response} res - The response object that will be sent to the client.
 * @returns {Promise} - A Promise that resolves to an array of Recipe objects.
 * @throws {Error} - If there is an error retrieving the recipes from the database.
 */
const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const search = req.query.search;
    const category = (req.query.category as string)?.split(",");
    const cuisine = (req.query.cuisine as string)?.split(",");
    const ingredients = (req.query.ingredients as string)?.split(",");

    const recipes: Recipe[] = await RecipeModel.find();
    let filteredRecipes = recipes;

    if (category) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        category.every((c) => recipe.category.includes(c))
      );
    }

    if (cuisine) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        cuisine.every((c) => recipe.cuisine.includes(c))
      );
    }

    if (search) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.title.includes(search as string)
      );
    }

    if (ingredients) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        ingredients.every((i) => recipe.ingredients.includes(i))
      );
    }

    ApiResponse.success(res, HttpStatusCode.OK, filteredRecipes);
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;

    const recipe: Recipe | null = await RecipeModel.findById(recipeId);

    if (!recipe) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Recipe with id - ${recipeId} not found.`
      );
    }

    ApiResponse.success(res, HttpStatusCode.OK, recipe);
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    title,
    description,
    ingredients,
    directions,
    photo,
    category,
    cuisine,
  } = req.body;

  const { id, username, email } = req.user!;

  try {
    const newRecipe = new RecipeModel({
      title,
      description,
      ingredients,
      directions,
      photo: photo ? photo : null,
      category,
      cuisine,
      createdBy: {
        userId: id,
        username,
        email,
      },
    });

    await newRecipe.save();

    // Send the response back to the client
    ApiResponse.success(res, HttpStatusCode.CREATED);
  } catch (error) {
    next(error);
  }
};

const getAllRecipesByUserId = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes = await RecipeModel.find({
      "createdBy.userId": req.params.userId,
    });

    // Send the response back to the client
    ApiResponse.success(res, HttpStatusCode.OK, recipes);
  } catch (error) {
    next(error);
  }
};

const deleteRecipeByRecipeId = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await RecipeModel.findOneAndDelete({
      _id: req.params.recipeId,
    });

    // Send the response back to the client
    ApiResponse.success(res, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};

const getRecipeByRecipeId = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;
    const recipe = await RecipeModel.findOne({ _id: recipeId });

    // Send the response back to the client
    ApiResponse.success(res, HttpStatusCode.OK, recipe);
  } catch (error) {
    next(error);
  }
};

const updateRecipeByRecipeId = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      description,
      ingredients,
      directions,
      category,
      cuisine,
      photo,
    } = req.body;

    const filter = { _id: req.params.recipeId };
    const update = {
      title,
      description,
      ingredients,
      directions,
      category,
      cuisine,
      photo,
    };
    const options = { new: true };
    const updatedRecipe = await RecipeModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    // Send the response back to the client
    ApiResponse.success(res, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};
const createComment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text } = req.body;
    const { recipeId } = req.params;

    const updatedRecipe = await RecipeModel.findOne({ _id: recipeId });

    const createdComment: Comment = {
      text,
      username: req.user?.username!,
      userId: new mongoose.Types.ObjectId(req.user?.id),
      recipeId: new mongoose.Types.ObjectId(recipeId),
    };

    updatedRecipe?.comments?.push(createdComment);

    await updatedRecipe?.save();

    // Send the response back to the client
    ApiResponse.success(res, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};
const createRating = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { value } = req.body;
    const { recipeId } = req.params;

    const updatedRecipe = await RecipeModel.findOne({ _id: recipeId });

    const createdRating: Rating = {
      value,
      userId: new mongoose.Types.ObjectId(req.user?.id),
      recipeId: new mongoose.Types.ObjectId(recipeId),
    };

    updatedRecipe?.ratings?.push(createdRating);

    await updatedRecipe?.save();

    // Send the response back to the client
    ApiResponse.success(res, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};

export {
  getAllRecipes,
  getAllRecipesByUserId,
  createRecipe,
  getRecipeById,
  getRecipeByRecipeId,
  deleteRecipeByRecipeId,
  updateRecipeByRecipeId,
  createComment,
  createRating,
};
