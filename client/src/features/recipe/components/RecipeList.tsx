import { Recipe } from "../types/recipe.types";
import RecipeItem from "./RecipeItem";

type Props = {
  recipes: Recipe[] | null;
};

const RecipeList = ({ recipes }: Props) => {
  return (
    <div className="d-flex flex-column gap-5">
      <h5 className="text-secondary px-5">
        {recipes?.length !== 0 ? "View Recipes" : "No recipes to display"}
      </h5>
      <div className="container row gap-5 mx-5">
        {recipes?.map((recipe, key) => (
          <RecipeItem
            key={key}
            id={recipe._id!}
            title={recipe.title}
            description={recipe.description}
            url={recipe.photo}
            rating={recipe.ratings}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
