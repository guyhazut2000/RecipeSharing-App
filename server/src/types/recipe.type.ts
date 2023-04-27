import { Document, Types } from "mongoose";
import User from "./user.type";

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
  photo?: Buffer;
  ratings?: Rating[];
  comments?: Comment[];
  createdBy: {
    userId: Types.ObjectId;
    email: string;
    username: string;
  };
}

interface Comment {
  username: string;
  text: string;
  recipeId?: Recipe["_id"];
  userId?: User["_id"];
}

interface Rating {
  value: number;
  recipeId?: Recipe["_id"];
  userId?: User["_id"];
}

export { Recipe, Comment, Rating };
