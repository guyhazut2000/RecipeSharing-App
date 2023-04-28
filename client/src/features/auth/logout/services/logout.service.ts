import axios from "@config/axios";
import endPoint from "@constants/apiEndPoints";

class LogoutService {
  logout = async (accessToken: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    return await axios.post(endPoint.users.logout);
  };
}

export default new LogoutService();
