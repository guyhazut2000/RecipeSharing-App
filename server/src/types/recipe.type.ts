/**
 * Recipe Interface representing a Recipe in the application
 */
import { Document, Types } from "mongoose";
import User from "./user.type";
/**
 * Interface representing a recipe document in the database.
 * Extends the Mongoose Document interface to add typings for the Recipe model properties.
 */
interface Recipe extends Document {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  ingredients: string[];
  directions: string[];
  category: string[];
  cuisine: string[];
  createdAt: Date;
  updatedAt: Date;
  photo?: string;
  ratings?: Rating[];
  comments?: Comment[];
  createdBy: {
    userId: Types.ObjectId;
    email: string;
    username: string;
  };
}
/**
 * Interface representing a comment associated with a recipe.
 */
interface Comment {
  username: string;
  text: string;
  recipeId?: Recipe["_id"];
  userId?: User["_id"];
}
/**
 * Interface representing a rating associated with a recipe.
 */
interface Rating {
  value: number;
  recipeId?: Recipe["_id"];
  userId?: User["_id"];
}

export { Recipe, Comment, Rating };
