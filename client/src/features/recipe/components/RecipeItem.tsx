import { Rating } from "../types/recipe.types";
import { calcRating } from "../utils/recipe.util";
type Props = {
  id: string;
  title: string;
  description: string;
  url: string;
  rating?: Rating[];
};

const RecipeItem = ({ id, title, description, rating, url }: Props) => {
  return (
    <div className="card d-flex flex-column m-0 p-0" style={{ width: "18rem" }}>
      <img src={url} className="img-fluid rounded h-50" alt="recipe image" />
      <div className="card-body d-flex flex-column justify-content-around">
        <h5 className="card-title">Title - {title}</h5>
        <p className="card-text">Description - {description}</p>
        <div>
          <p>Rating - {calcRating(rating)}/5</p>
          <a href={`/recipes/${id}`} className="btn btn-primary w-100">
            View Recipe
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
