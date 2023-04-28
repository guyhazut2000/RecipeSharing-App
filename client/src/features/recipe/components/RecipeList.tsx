import RecipeItem from "./RecipeItem";

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
          <RecipeItem title={recipe.title} key={key} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
