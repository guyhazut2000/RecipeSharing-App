import { Rating } from "../types/recipe.types";

const calcRating = (array: Rating[] | undefined): number => {
  if (typeof array !== undefined) {
    const sum = array!.reduce((sum, rating) => sum + rating.value, 0);
    return sum / array!.length || 0;
  }
  return 0;
};

export { calcRating };
