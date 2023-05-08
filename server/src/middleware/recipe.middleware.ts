import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../types/auth.type";
import { ApiError } from "../utils/api.util";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { ErrorMessage } from "../constants/errorMessages";
import { Recipe } from "../types/recipe.type";
import { isValidObjectId } from "mongoose";
import RecipeModel from "../models/Recipe.model";

const validateRecipeCreateRequest = async (
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
      photo,
      category,
      cuisine,
    }: Recipe = req.body;

    if (
      !title ||
      !description ||
      !ingredients ||
      !directions ||
      !category ||
      !cuisine
    ) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "Missing one or more properties [title, description, ingredients, directions, category, cuisine]"
      );
    }

    next(); // Call next middleware or route
  } catch (error) {
    return next(error);
  }
};

const validateRecipeGetRequest = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    // validate not null values
    if (!userId) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "Missing property user ID from request params."
      );
    }

    // validate user id from req param and user id from token
    if (userId !== req.user?.id) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        ErrorMessage.UNAUTHORIZED_USER_ID_MISMATCH
      );
    }

    next(); // Call next middleware or route
  } catch (error) {
    return next(error);
  }
};

const validateRecipeDeleteRequest = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, recipeId } = req.params;

    // validate user id from req param and user id from token
    if (userId !== req.user?.id) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        ErrorMessage.UNAUTHORIZED_USER_ID_MISMATCH
      );
    }

    // validate recipe exists in db
    const recipe = await RecipeModel.findOne({ _id: recipeId });
    if (!recipe) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Recipe with recipe ID - ${recipeId} not found.`
      );
    }

    next(); // Call next middleware or route
  } catch (error) {
    return next(error);
  }
};

const validateCommentCreateRequest = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;
    const { text } = req.body;

    // validate text is not null
    if (!text) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "The 'text' property is required in the request body."
      );
    }

    // validate text typeof string
    if (typeof text !== "string") {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "Text must be of type string."
      );
    }

    // validate recipe type of object id
    if (!isValidObjectId(recipeId)) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Recipe ID - ${recipeId} must be a valid Object ID.`
      );
    }

    // validate recipe exists in db
    const recipe = await RecipeModel.findOne({ _id: recipeId });
    if (!recipe) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Recipe with recipe ID - ${recipeId} not found.`
      );
    }

    next(); // Call next middleware or route
  } catch (error) {
    return next(error);
  }
};

const validateRatingCreateRequest = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;
    const { value } = req.body;

    // validate value is not null
    if (!value) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "The 'value' property is required in the request body."
      );
    }

    // validate value typeof number
    if (typeof value !== "number") {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "Value must be of type number."
      );
    }

    // validate value typeof string
    if (!(1 < value && value < 5)) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "Value must be a number between 1-5"
      );
    }

    // validate recipe type of object id
    if (!isValidObjectId(recipeId)) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Recipe ID - ${recipeId} must be a valid Object ID.`
      );
    }

    // validate recipe exists in db
    const recipe = await RecipeModel.findOne({ _id: recipeId });
    if (!recipe) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Recipe with recipe ID - ${recipeId} not found.`
      );
    }

    next(); // Call next middleware or route
  } catch (error) {
    return next(error);
  }
};

const validateRecipeUpdateRequest = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, recipeId } = req.params;

    // validate user id from req param and user id from token
    if (userId !== req.user?.id) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        ErrorMessage.UNAUTHORIZED_USER_ID_MISMATCH
      );
    }

    // validate recipe exists in db
    const recipe = await RecipeModel.findOne({ _id: recipeId });
    if (!recipe) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Recipe with recipe ID - ${recipeId} not found.`
      );
    }
    // validate null
    const {
      title,
      description,
      ingredients,
      directions,
      category,
      cuisine,
      photo,
    } = req.body;
    if (
      !title ||
      !description ||
      !ingredients ||
      !directions ||
      !category ||
      !cuisine
    ) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "One or more of properties [title, description, ingredients, directions, category, cuisine] is missing."
      );
    }

    // validate types of request body properties
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      (typeof category !== "string" && !Array.isArray(category)) ||
      (typeof cuisine !== "string" && !Array.isArray(cuisine))
    ) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "Properties [title, description, category, cuisine] must be typeof string."
      );
    }

    if (!Array.isArray(ingredients) || !Array.isArray(directions)) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "Properties [ingredients, directions] must be typeof Array."
      );
    }

    next(); // Call next middleware or route
  } catch (error) {
    return next(error);
  }
};
export {
  validateRecipeGetRequest,
  validateRecipeCreateRequest,
  validateRecipeDeleteRequest,
  validateRecipeUpdateRequest,
  validateCommentCreateRequest,
  validateRatingCreateRequest,
};
