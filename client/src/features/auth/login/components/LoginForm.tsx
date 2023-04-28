import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// config
import { routes } from "@config/routes";
// features
import { setTokenInStorage } from "@features/shared/utils/token.util";
import { getErrorMessageDetails } from "@features/shared/utils/httpError.util";
// services
import UserService from "../../services/user.service";
// types
import { LoginUser } from "../types/login.types";
// redux slices
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../shared/slices/authSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");

  // handle login click
  const handleLoginClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formUserData: LoginUser = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };
    try {
      // Start user login process
      dispatch(loginStart());
      const response = await UserService.login(formUserData);
      if (response) {
        // Set user in app store
        dispatch(loginSuccess(response.data.user));

        // Set tokens in storage.
        setTokenInStorage("accessToken", response.data?.accessToken);
        setTokenInStorage("refreshToken", response.data?.refreshToken);

        // Go to Home page
        navigate(routes.home);
      }
    } catch (error) {
      // Dispatch login error
      dispatch(loginFailure());

      // Display error message
      if (axios.isAxiosError(error)) {
        setError(getErrorMessageDetails(error));
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <section className="vh-100 ">
      <div className="container-fluid h-custom">
        <div className="row d-flex flex-row justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5 align-self-center justify-self-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 align-self-center justify-self-center ">
            <form onSubmit={handleLoginClick}>
              <h3 className="text-primary text-center m-4 fw-bold">Login</h3>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  ref={emailRef}
                  required
                  id="email"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  ref={passwordRef}
                  required
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "4rem", paddingRight: "4rem" }}
                >
                  Login
                </button>
                {error && <p className="fw-bold my-3 text-danger">{error}</p>}
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link className="text-decoration-none" to={routes.register}>
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
