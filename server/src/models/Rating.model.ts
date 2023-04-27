// import { Schema, Types, model } from "mongoose";
// import { Rating } from "../types/recipe.type";

// const RatingSchema = new Schema(
//   {
//     value: {
//       type: Schema.Types.Number,
//       int32: true,
//       required: true,
//       min: 1,
//       max: 5,
//     },
//     recipeId: {
//       type: Types.ObjectId,
//       ref: "Recipe",
//       required: true,
//     },
//     userId: {
//       type: Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const RatingModel = model<Rating>("Rating", RatingSchema);

// export default RatingModel;
