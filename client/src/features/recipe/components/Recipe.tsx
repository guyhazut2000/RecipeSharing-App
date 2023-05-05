import React from "react";
import { Recipe as IRecipe } from "../types/recipe.types";
import { calcRating } from "../utils/recipe.util";

type Props = {
  recipe: IRecipe;
};

const Recipe = ({ recipe }: Props) => {
  return (
    <div className="container">
      <p>By: {recipe.createdBy.username}</p>
      <p>Created At: {new Date(recipe.createdAt!).toDateString()}</p>
      {/* <img className="col" src={recipe.photo} alt="image" /> */}
      <div className="row">
        <h3 className="row">Title: {recipe.title}</h3>
        <p className="row">Description: {recipe.description}</p>
        <p>Rating - {calcRating(recipe.ratings)}/5</p>
      </div>
      <div className="row">
        <div className="row">Ingredients: {recipe.ingredients}</div>
        <div className="row">Directions: {recipe.directions}</div>
      </div>
      <p>Category: {recipe.category}</p>
      <p>Cuisine: {recipe.cuisine}</p>
      <div>
        comments:{" "}
        {recipe.comments?.map((comment) => (
          <p>comment</p>
        ))}
      </div>
    </div>
  );
};

export default Recipe;
