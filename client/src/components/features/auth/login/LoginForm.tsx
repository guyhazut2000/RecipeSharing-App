import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as UserService from "../../../../services/User";
import axios from "axios";
import {
  getErrorMessage,
  getErrorMessageDetails,
  getErrorStatusCode,
} from "../../../../utils/helpers";
import { LoginUser } from "../../../../types/user";
import { setTokenInStorage } from "../../../../utils/token";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");

  const handleLoginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: LoginUser = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };
    try {
      const loggedUser = await UserService.login(formData);
      if (loggedUser) {
        // Set accessToken in storage.
        setTokenInStorage("accessToken", loggedUser.data?.accessToken);
        // TODO: Set user in redux store.

        // Go to Home page
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // console.error(`Error message: ${getErrorMessage(error)}`);
        // console.error(`Status code: ${getErrorStatusCode(error)}`);
        // console.error(`Error message info: ${getErrorMessageDetails(error)}`);
        setError(getErrorMessageDetails(error));
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLoginUser}>
        <div className="d-flex align-content-center justify-content-center">
          <label>
            Email:
            <input type="email" ref={emailRef} required />
          </label>
          <label>
            Password:
            <input type="password" ref={passwordRef} required />
          </label>
          <button type="submit">Login</button>
        </div>
      </form>
      {error && <p className="text-danger">{error}</p>}
      <p>Don't have an account ?</p>
      <Link to={"/register"}>Register</Link>
    </div>
  );
};

export default LoginForm;
