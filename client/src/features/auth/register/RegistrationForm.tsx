import React, { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import userService from "../shared/services/user.service";
import {
  getErrorMessage,
  getErrorMessageDetails,
  getErrorStatusCode,
} from "@features/shared/utils/httpError.util";
import { RegistrationUser } from "../shared/types/user.types";
import { routes } from "@constants/routes";

type Props = {};

const RegistrationForm: React.FC = (props: Props) => {
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const formData: RegistrationUser = {
      username: usernameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      role: "user",
    };
    try {
      const createdUser = await userService.create(formData);
      if (createdUser) {
        navigate("/login");
      }
    } catch (error) {
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
            <form onSubmit={handleFormSubmit}>
              <h3 className="text-primary text-center m-4 fw-bold">Sign Up</h3>
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
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  ref={usernameRef}
                  required
                  id="username"
                  className="form-control form-control-lg"
                  placeholder="Enter your name"
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

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "4rem", paddingRight: "4rem" }}
                >
                  Sign Up
                </button>
                {error && <p className="fw-bold my-3 text-danger">{error}</p>}
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <Link className="text-decoration-none" to={routes.login}>
                    Login
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

export default RegistrationForm;
