import axios from "@config/axios";
import endPoint from "@constants/apiEndPoints";

class TokenService {
  getAccessToken = (refreshToken: string) => {
    return axios.post(endPoint.refreshToken, { refreshToken });
  };
}

export default new TokenService();
