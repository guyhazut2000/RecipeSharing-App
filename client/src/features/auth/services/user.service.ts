import { RegistrationUser } from "../types/user.types";
import axios from "@config/axios";

class UserService {
  getUserById = async (userId: string) => {
    return await axios.get(`/users/${userId}`);
  };

  create = async (user: RegistrationUser) => {
    return await axios.post("/users/register", user);
  };

  update = async (userId: string, user: any) => {
    return await axios.put(`/users/${userId}`, user);
  };

  remove = async (userId: string) => {
    return await axios.delete(`/users/${userId}`);
  };
}

export default new UserService();
