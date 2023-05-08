import RecipesService from "../services/recipes.service";
import { Recipe } from "../types/recipe.types";
import EditRecipe from "./EditRecipe";
import RecipeListItem from "./RecipeListItem";

type RecipeListProps = {
  recipes: Recipe[] | null;
  userId?: string;
};

const RecipeList = ({ recipes, userId }: RecipeListProps) => {
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const divElement = e.target as HTMLDivElement;
    const recipeId = divElement.id;
    const response =
      userId && (await RecipesService.deleteOne(userId, recipeId));
    console.log(response);
  };

  return (
    <div className="d-flex flex-column gap-5">
      <h5 className="text-secondary px-5">
        {recipes?.length !== 0 ? "Trending Recipes" : "No recipes to display"}
      </h5>
      <div className="container row gap-5 mx-5">
        {recipes?.map((recipe, key) => (
          <div className="container" key={key}>
            <RecipeListItem
              id={recipe._id!}
              title={recipe.title}
              description={recipe.description}
              url={recipe.photo}
              rating={recipe.ratings}
            />
            {userId && (
              <div>
                <EditRecipe recipeId={recipe._id!} userId={userId} />

                <button
                  id={recipe._id}
                  className="btn btn-danger "
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
