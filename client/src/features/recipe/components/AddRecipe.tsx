import { useRef, useState } from "react";
import recipesService from "../services/recipes.service";
import { Recipe } from "../types/recipe.types";
import { useSelector } from "react-redux";
import {
  getTokenFromStorage,
  removeTokenFromStorage,
  setTokenInStorage,
} from "@features/shared/utils/token.util";
import axios from "axios";
import tokenService from "@features/auth/token/services/token.service";
import { useNavigate } from "react-router-dom";

type Props = {};

const AddRecipe = (props: Props) => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.user);

  const titleRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const CuisineRef = useRef<HTMLInputElement>(null);

  const [directions, setDirections] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");

  const handleShowModal = () => {
    const modal: HTMLElement = document.querySelector("#addRecipeModal")!;
    modal.classList.add("show");
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const handleCloseModal = () => {
    const modal: HTMLElement = document.querySelector("#addRecipeModal")!;
    modal.classList.remove("show");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  const handleCreateRecipe = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const title = titleRef.current?.value!;
    const imageURL = imageUrlRef.current?.value!;
    const category = categoryRef.current?.value!;
    const cuisine = CuisineRef.current?.value!;

    console.log(title, imageURL, category, cuisine);
    console.log(directions, description, ingredients);

    const recipe: Recipe = {
      title,
      description,
      ingredients: ingredients.split(","),
      directions: directions.split(","),
      photo: imageURL,
      category: category.split(","),
      cuisine: cuisine.split(","),
      createdBy: {
        username: user.username,
        userId: user.id,
      },
    };
    // create new recipe
    try {
      const response = await recipesService.createRecipe(
        recipe,
        getTokenFromStorage("accessToken")
      );
      if (response.status === 201) {
        console.log(response);
        handleCloseModal();
      }
    } catch (error) {
      // try generating a new access Token using the user refresh token.
      if (axios.isAxiosError(error) && error.status === 401) {
        try {
          const refreshToken: string =
            getTokenFromStorage("refreshToken") ?? "";
          const tokenResponse = await tokenService.getAccessToken(refreshToken);

          if (tokenResponse.status === 200) {
            // set the new user access token in storage
            setTokenInStorage("accessToken", tokenResponse.data.accessToken);

            // try to logout again
            handleCreateRecipe(event);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(error);
      }
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-success"
        id="addRecipeButton"
        onClick={handleShowModal}
      >
        Create Recipe
      </button>
      <div
        className="modal fade"
        id="addRecipeModal"
        tabIndex={-1}
        aria-labelledby="addRecipeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addRecipeModalLabel">
                Create New Recipe
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="recipeTitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipeTitle"
                    placeholder="Enter recipe title"
                    required
                    ref={titleRef}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipeDescription">Description</label>
                  <textarea
                    className="form-control"
                    id="recipeDescription"
                    rows={3}
                    placeholder="Enter recipe description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="recipeIngredients">Ingredients</label>
                  <textarea
                    className="form-control"
                    id="recipeIngredients"
                    rows={3}
                    placeholder="Enter recipe ingredients"
                    required
                    onChange={(e) => setIngredients(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="recipeDirections">Directions</label>
                  <textarea
                    className="form-control"
                    id="recipeDirections"
                    rows={3}
                    placeholder="Enter recipe directions"
                    required
                    onChange={(e) => setDirections(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="recipeImage">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipeImage"
                    placeholder="Enter recipe image URL"
                    required
                    ref={imageUrlRef}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipeCategory">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipeCategory"
                    placeholder="Enter recipe category. use ',' to separate."
                    required
                    ref={categoryRef}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipeCuisine">Cuisine</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipeCuisine"
                    placeholder="Enter recipe cuisine. use ',' to separate."
                    required
                    ref={CuisineRef}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button className="btn btn-primary" onClick={handleCreateRecipe}>
                Create Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
