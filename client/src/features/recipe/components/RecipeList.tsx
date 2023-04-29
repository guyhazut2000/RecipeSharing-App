import { Recipe } from "../types/recipe.types";
import RecipeItem from "./RecipeItem";

type Props = {
  recipes: Recipe[] | null;
};

const RecipeList = ({ recipes }: Props) => {
  return (
    <div className="d-flex flex-row justify-content-start gap-5">
      <h5 className="text-secondary px-5">
        {recipes?.length !== 0 ? "Our Recipes" : "No recipes to display"}
      </h5>
      {recipes?.map((recipe, key) => (
        <RecipeItem
          key={key}
          id={recipe._id!}
          title={recipe.title}
          description={recipe.description}
          rating={recipe.ratings}
        />
      ))}
    </div>
  );
};

export default RecipeList;
