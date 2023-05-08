import { Rating } from "../types/recipe.types";
import { useNavigate } from "react-router-dom";
type Props = {
  id: string;
  title: string;
  description: string;
  url: string;
  rating?: Rating[];
};

const RecipeItem = ({ id, title, description, rating, url }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="card text-white m-0 p-0"
      style={{ width: "24rem", cursor: "pointer" }}
      onClick={() => {
        navigate(`/recipes/${id}`);
      }}
    >
      <img
        src={url}
        className="w-100 h-100 img-fluid opacity-on-hover"
        alt={`image- ${title}`}
      />
      <div className="card-img-overlay ">
        <h1 className="card-title text-center p-5">{title}</h1>
      </div>
    </div>
  );
};

export default RecipeItem;
