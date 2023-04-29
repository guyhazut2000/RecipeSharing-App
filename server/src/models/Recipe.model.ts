import mongoose, { Model, Schema, Types } from "mongoose";
import { Recipe, Comment, Rating } from "../types/recipe.type";
/**
 * a Mongoose schema and model for a recipe in a recipe application.
 */
const RecipeSchema = new Schema<Recipe>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    directions: {
      type: [String],
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
    category: {
      type: [String],
      required: true,
    },
    cuisine: {
      type: [String],
      required: true,
    },
    createdBy: {
      userId: Types.ObjectId,
      username: { type: String, required: true },
      email: { type: String, required: true },
    },
    comments: {
      type: [
        {
          username: String,
          text: String,
          userId: Types.ObjectId,
          recipeId: Types.ObjectId,
        },
      ],
      default: [],
    },
    ratings: {
      type: [
        {
          value: Number,
          userId: Types.ObjectId,
          recipeId: Types.ObjectId,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const RecipeModel: Model<Recipe> = mongoose.model<Recipe>(
  "Recipe",
  RecipeSchema
);

export default RecipeModel;
