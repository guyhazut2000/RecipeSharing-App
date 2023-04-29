import { Rating } from "../types/recipe.types";
type Props = {
  id: string;
  title: string;
  description: string;
  rating?: Rating[];
};

const RecipeItem = ({ id, title, description, rating }: Props) => {
  const calcRating = (array: Rating[] | undefined): number => {
    if (typeof array !== undefined) {
      const sum = array!.reduce((sum, rating) => sum + rating.value, 0);
      return sum / array!.length || 0;
    }
    return 0;
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGFzdGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
        className="card-img-top"
        alt="recipe image"
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex gap-2 align-content-center justify-items-center">
          <a href={`/recipes/${id}`} className="btn btn-primary">
            View Recipe
          </a>
          <p>Rating - {calcRating(rating)}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
