import LogoutButton from "@features/auth/logout/components/LogoutButton";
import userService from "@features/auth/services/user.service";
import TokenService from "@features/auth/token/services/token.service";
import { getErrorStatusCode } from "@features/shared/utils/httpError.util";
import {
  getTokenFromStorage,
  removeTokenFromStorage,
  setTokenInStorage,
} from "@features/shared/utils/token.util";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // const handleLogout = async (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   event.preventDefault();

  //   // get access token from storage
  //   const accessToken = getTokenFromStorage("accessToken") || "";

  //   try {
  //     // send access token with http request
  //     const response = await userService.logout(accessToken);
  //     // if logged off, remove token from storage
  //     if (response.status === 200) {
  //       removeTokenFromStorage("accessToken");
  //       removeTokenFromStorage("refreshToken");
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       try {
  //         const errorCode: number | undefined = getErrorStatusCode(error);
  //         if (errorCode === 401) {
  //           // Send refresh token.
  //           const refreshToken: string =
  //             getTokenFromStorage("refreshToken") ?? "";
  //           const tokenResponse = await TokenService.getAccessToken(
  //             refreshToken
  //           );
  //           if (tokenResponse) {
  //             tokenResponse.status === 200 &&
  //               setTokenInStorage(
  //                 "accessToken",
  //                 tokenResponse.data.accessToken
  //               );
  //             handleLogout(event);
  //           }
  //         }
  //       } catch (error) {
  //         // Clear tokens and navigate to login page.
  //         removeTokenFromStorage("accessToken");
  //         removeTokenFromStorage("refreshToken");
  //         navigate("/login");
  //       }
  //     } else {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand mx-5" href="/">
          Recipe Logo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/recipes/userid"
              >
                My Recipes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/about">
                About
              </a>
            </li>
          </ul>
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
