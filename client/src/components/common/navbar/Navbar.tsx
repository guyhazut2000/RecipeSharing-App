import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getTokenFromStorage,
  removeTokenInStorage,
} from "../../../features/shared/utils/token.util";
import * as UserService from "../../../features/auth/services/User";
import Logout from "../../../features/auth/logout";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    // get access token from storage
    const accessToken = getTokenFromStorage("accessToken") || "";

    try {
      // send access token with http request
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
      <h1>Navbar Logo</h1>
      <Logout onLogout={handleLogout} />
    </div>
  );
};

export default Navbar;
