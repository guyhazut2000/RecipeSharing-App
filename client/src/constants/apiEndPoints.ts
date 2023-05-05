const endPoint = {
  refreshToken: "/users/auth/refresh-token",
  users: {
    login: "/users/auth/login",
    logout: "/users/auth/logout",
    register: "/users/register",
    deleteOne: "/users/:userId",
    updateOne: "/users/:userId",
  },
  recipes: {
    getAll: "/users/:userId/recipes",
    getById: "/users/:userId/recipes/:recipeId",
    createOne: "/users/:userId/recipes",
    updateOne: "/users/:userId/recipes",
    deleteOne: "/users/:userId/recipes",
  },
};

export default endPoint;
