import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
// features
import TokenService from "@features/auth/token/services/token.service";
import {
  getTokenFromStorage,
  removeTokenFromStorage,
  setTokenInStorage,
} from "@features/shared/utils/token.util";
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "@features/auth/shared/slices/authSlice";
// services
import LogoutService from "../services/logout.service";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    // get access token from storage
    const accessToken = getTokenFromStorage("accessToken") || "";

    try {
      // start logout user process
      dispatch(logoutStart());
      const response = await LogoutService.logout(accessToken);

      if (response.status === 200) {
        // dispatch success
        dispatch(logoutSuccess());

        // remove token's from local storage
        removeTokenFromStorage("accessToken");
        removeTokenFromStorage("refreshToken");

        // move to login page
        navigate("/login");
      }
    } catch (error) {
      // try generating a new access Token using the user refresh token.
      if (axios.isAxiosError(error) && error.status === 401) {
        try {
          const refreshToken: string =
            getTokenFromStorage("refreshToken") ?? "";
          const tokenResponse = await TokenService.getAccessToken(refreshToken);

          if (tokenResponse.status === 200) {
            // set the new user access token in storage
            setTokenInStorage("accessToken", tokenResponse.data.accessToken);

            // try to logout again
            handleLogoutClick(event);
          }
        } catch (error) {
          // Dispatch logout failure
          dispatch(logoutFailure());

          // Clear tokens and navigate to login page.
          removeTokenFromStorage("accessToken");
          removeTokenFromStorage("refreshToken");

          // go to login page
          navigate("/login");
        }
      } else {
        // Dispatch logout failure
        dispatch(logoutFailure());
      }
    }
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogoutClick}>
      Logout
    </button>
  );
};

export default LogoutButton;
