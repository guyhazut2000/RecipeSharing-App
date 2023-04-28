import React, { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as UserService from "../../../../services/User";
import axios from "axios";
import {
  getErrorMessage,
  getErrorMessageDetails,
  getErrorStatusCode,
} from "../../../../utils/httpError.util";
import { RegistrationUser } from "../../../../types/user.types";
import { routes } from "../../../../config/routes";

type Props = {};

const RegistrationForm: React.FC = (props: Props) => {
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
      const createdUser = await UserService.create(formData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Error message: ${getErrorMessage(error)}`);
        console.error(`Status code: ${getErrorStatusCode(error)}`);
        console.error(`Error message info: ${getErrorMessageDetails(error)}`);
        setError(getErrorMessageDetails(error));
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="container d-flex justify-content-center">
          <label>
            Username:
            <input type="text" ref={usernameRef} required />
          </label>
          <label>
            Email:
            <input type="email" ref={emailRef} required />
          </label>
          <label>
            Password:
            <input type="password" ref={passwordRef} required />
          </label>
          <button className="btn btn-success w-25" type="submit">
            Register
          </button>
        </div>
        <div>{error && <p className="text-danger">{error}</p>}</div>
      </form>
      <p>Already have an account ?</p>
      <Link to={routes.login}>Log in</Link>
    </div>
  );
};

export default RegistrationForm;
