const endPoint = {
  refreshToken: "/users/auth/refresh-token",
  users: {
    login: "/users/auth/login",
    logout: "/users/auth/logout",
    register: "/users/register",
    delete: "/users/:userId",
    update: "/users/:userId",
  },
};

export default endPoint;
