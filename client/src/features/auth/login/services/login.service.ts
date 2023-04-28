import axios from "@config/axios";
import endPoint from "@constants/apiEndPoints";
import { LoginUser } from "../types/login.types";

class LoginService {
  login = async (user: LoginUser) => {
    return await axios.post(endPoint.users.login, user);
  };
}

export default new LoginService();
