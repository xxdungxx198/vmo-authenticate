import router from "next/dist/client/router";
import React, { useState } from "react";
import { lowerCase, upperFirst, trim } from "lodash";
import Loading from "../../components/loading/loading";
import { useAuth } from "../../utils/context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLocaleLowerCase());
}

function validatePassword(pw) {
  return (
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw) &&
    pw.length > 8
  );
}

interface PropsRegister {}

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC<PropsRegister> = (props) => {
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormValues>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [confirmShow, setConfirmShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [guide, setGuide] = useState<boolean>(false);
  const { register } = useAuth();

  // Submit form
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      values.email.length !== 0 &&
      values.password.length !== 0 &&
      values.confirmPassword.length !== 0
    ) {
      try {
        setLoading(true);
        await register(values.email, values.password);
        router.push("/account");
      } catch {
        setMessage("Your email has already been used!");
      }
      setLoading(false);
    }
  }

  // Show password requirement
  const handleGuide = () => {
    setGuide(!guide);
  };

  // Navigate to Login form
  function handleLogin() {
    router.push("/login");
  }

  // Show password
  function showPassword() {
    setPasswordShow(!passwordShow);
  }

  function showConfirmPassword() {
    setConfirmShow(!confirmShow);
  }

  const handleChange = (key: keyof FormValues, value: string) => {
    if (!trim(value)) {
      setErrors((prev) => ({
        ...prev,
        [key]: `${upperFirst(lowerCase(key))} is required`,
      }));
    } else if (key === "email" && !validateEmail(trim(value))) {
      setErrors((prev) => ({
        ...prev,
        [key]: `${upperFirst(lowerCase(key))} invalid`,
      }));
    } else if (key === "password" && !validatePassword(trim(value))) {
      setErrors((prev) => ({
        ...prev,
        [key]: `${upperFirst(lowerCase(key))} invalid`,
      }));
    } else if (key === "confirmPassword" && value !== values.password) {
      setErrors((prev) => ({
        ...prev,
        [key]: `${upperFirst(lowerCase(key.slice(7)))} does not match`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
    setValues((prev) => ({ ...prev, [key]: value }));
    setMessage("");
  };

  return (
    <div className="bg-discord_img h-screen w-screen flex justify-center items-center ">
      <div className="bg-discord w-3/12 min-h-4/6 rounded z-0 relative">
        <div
          className={`${guide ? styles.guide : " "} ${
            errors.password ? styles.guide : " "
          } hidden absolute top-0 min-w-84 rounded-md bg-discord`}
        >
          <div className="p-4 text-white shadow-2xl">
            <h1>Password required</h1>
            <ul className="p-0 ">
              <li className="py-1">Must be at least 8 characters</li>
              <li className="py-1">Must contain number</li>
              <li className="py-1">Must contain at least 1 Capital Case</li>
              <li className="py-1">
                Must contain at least 1 special character
              </li>
            </ul>
          </div>
        </div>
        <div className="p-8">
          <div className="flex justify-content-between items-center py-2 relative">
            <h1 className="text-white">Register</h1>
            <FontAwesomeIcon
              onClick={handleGuide}
              className={`${
                guide ? "text-white" : "text-discord"
              }  text-1xl transfrom duration-200 `}
              icon={faExclamationCircle}
            />
          </div>
          <p className="text-danger text-18px h-2 mb-3">{message}</p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="text-discord text-15px py-2">EMAIL</label>
            <input
              onChange={(e) => handleChange("email", e.target.value)}
              spellCheck="false"
              className={`mb-1 text text-1xl text-white bg-input border-black h-12  border-1 rounded border-opacity-25 hover:border-opacity-100 transform duration-200 ${
                errors.email
                  ? "ring ring-red-500"
                  : " focus:ring focus:ring-blue-300"
              } outline-none px-2`}
            ></input>
            <div className={"text-danger text-18px h-2 mb-3"}>
              {errors.email}
            </div>
            <div className="flex relative flex-col">
              <label className="text-discord text-15px py-2 ">PASSWORD</label>
              <input
                type={`${passwordShow ? "text" : "password"}`}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`mb-1 text text-1xl text-white bg-input border-black h-12  border-1 rounded border-opacity-25 hover:border-opacity-100 transform duration-200 ${
                  errors.password
                    ? "ring ring-red-500"
                    : " focus:ring focus:ring-blue-300"
                } outline-none px-2`}
              />
              <span
                onClick={showPassword}
                className="absolute right-0 text-white bottom-4 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 mr-2 ${
                    passwordShow ? "text-white" : "text-discord"
                  } transform duration-200`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <div className={"text-danger text-18px h-2 mb-3"}>
              {errors.password}
            </div>
            <div className="flex relative flex-col">
              <label className="text-discord text-15px py-2 ">
                CONFIRM PASSWORD
              </label>
              <input
                type={`${confirmShow ? "text" : "password"}`}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                className={`mb-1 text text-1xl text-white bg-input border-black h-12  border-1 rounded border-opacity-25 hover:border-opacity-100 transform duration-200 ${
                  errors.confirmPassword
                    ? "ring ring-red-500"
                    : " focus:ring focus:ring-blue-300"
                } outline-none px-2`}
              />
              <span
                onClick={showConfirmPassword}
                className="absolute right-0 text-white bottom-4 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 mr-2 ${
                    confirmShow ? "text-white" : "text-discord"
                  } transform duration-200`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <div className={"text-danger text-18px h-2 mb-3"}>
              {errors.confirmPassword}
            </div>
            <div className="flex flex-col">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-8 flex text-white justify-center bg-button opacity-100 py-2.5 rounded mb-2 hover:opacity-70 transform duration-200"
              >
                {loading ? (
                  <Loading type={"spin"} color={"#fff"} />
                ) : (
                  "Register"
                )}
              </button>
            </div>
            <p className="text-discord text-15px">
              Already have an account? &nbsp;
              <a
                onClick={handleLogin}
                className="text-forgot hover:text-forgot no-underline hover:underline "
                href="#"
              >
                Log In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
