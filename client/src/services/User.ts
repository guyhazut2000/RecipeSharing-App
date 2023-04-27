import axios from "../config/axios";
import Cookies from "js-cookie";
import { LoginUser, LogoutUser, RegistrationUser } from "../types/user";

export const getUserById = async (userId: string) => {
  return await axios.get(`/users/${userId}`);
};

export const create = async (user: RegistrationUser) => {
  return await axios.post("/users/register", user);
};

export const update = async (userId: string, user: any) => {
  return await axios.put(`/users/${userId}`, user);
};

export const remove = async (userId: string) => {
  return await axios.delete(`/users/${userId}`);
};

export const login = async (user: LoginUser) => {
  return await axios.post("/users/auth/login", user);
};

export const logout = async (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.post("/users/auth/logout");
};
