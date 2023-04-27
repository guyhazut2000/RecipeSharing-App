import React from "react";
import { getTokenFromStorage, removeTokenInStorage } from "../../utils/token";
import * as UserService from "../../services/User";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    // get access token from storage
    const accessToken = getTokenFromStorage("accessToken") || "";
    console.log(accessToken);
    // send access token with http request
    try {
      const response = await UserService.logout(accessToken);
      // if logged off, remove token from storage
      if (response.status === 200) {
        removeTokenInStorage("accessToken");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={(e) => handleLogout(e)}>Logout</button>
    </div>
  );
};

export default HomePage;
