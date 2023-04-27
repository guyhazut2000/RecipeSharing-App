import React from "react";
import RecipeListItem from "./RecipeListItem";

type Props = {
  recipes: Recipe[] | null;
};

const RecipeList = ({ recipes }: Props) => {
  return (
    <div>
      {/* Sort by */}
      <button>Sort</button>
      {/* Filter by */}
      <button>Filter</button>
      <div>
        {recipes?.map((recipe, key) => (
          <RecipeListItem title={recipe.title} key={key} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
