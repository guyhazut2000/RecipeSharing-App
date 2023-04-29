import { Rating } from "../types/recipe.types";
type Props = {
  id: string;
  title: string;
  description: string;
  url: string;
  rating?: Rating[];
};

const RecipeItem = ({ id, title, description, rating, url }: Props) => {
  const calcRating = (array: Rating[] | undefined): number => {
    if (typeof array !== undefined) {
      const sum = array!.reduce((sum, rating) => sum + rating.value, 0);
      return sum / array!.length || 0;
    }
    return 0;
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={url} className="card-img-top" alt="recipe image" />
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
