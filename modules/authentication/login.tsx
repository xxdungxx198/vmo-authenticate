import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "@material-ui/core";
import Cookie from "js-cookie";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Loading from "../../components/loading/loading";
import { useAuth } from "../../utils/context/auth-context";

interface PropsLogin {}

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC<PropsLogin> = (props) => {
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState<boolean>(false);
  const [failure, setFailure] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  // Login method
  const {
    login,
    socialMediaAuth,
    facebookProvider,
    googleProvider,
    githubProvider,
  } = useAuth();

  // Submit form
  const handleChangeEmail = (e) => {
    setValues((prev) => ({ ...prev, email: e.target.value }));
    setFailure("");
  };

  const handleChangePassword = (e) => {
    setValues((prev) => ({ ...prev, password: e.target.value }));
  };

  // Remember function
  const handleChangeCheckbox = () => {
    setRemember(!remember);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await login(values.email, values.password);
      remember
        ? Cookie.set("email", values.email, { expires: 99999999 })
        : Cookie.remove("email");
      router.push("/admin");
    } catch {
      setFailure("Incorrect username or password");
    }
    setLoading(false);
  }

  // Login with SocialMedia
  async function handleLoginForm(provider: any) {
    try {
      await socialMediaAuth(provider);
    } catch {
      setFailure("Fail to login");
    }
  }

  // Navigate to Register form
  function handleRegister() {
    router.push("/register");
  }

  // Navigate to Reset password form
  function handleResetPassword() {
    router.push("/reset-password");
  }

  // Toggle show/hide password
  function showPassword() {
    setShow(!show);
    if (!remember) Cookie.remove("email");
  }

  useEffect(() => {
    const tempEmail = Cookie.get("email") || "";
    setValues((prev) => ({ ...prev, email: tempEmail }));
    setRemember(!!tempEmail);
  }, []);

  return (
    <div className="bg-discord_img h-screen w-screen flex justify-center items-center">
      <div className="bg-discord w-3/12 min-h-4/6 rounded">
        <div className="p-8">
          <h1 className="text-white">Login</h1>
          <p className="h-3 text-danger text-xl">{failure}</p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="text-discord text-15px py-2">EMAIL</label>

            <input
              value={values.email}
              onChange={handleChangeEmail}
              className="mb-1 text-1xl text-white bg-input border-black h-12  border-1 rounded border-opacity-25 hover:border-opacity-100 transform duration-200 focus:ring focus:ring-blue-300
               outline-none px-2"
            ></input>
            <div className="flex relative flex-col">
              <label className="text-discord text-15px py-2 ">PASSWORD</label>
              <input
                onChange={handleChangePassword}
                type={`${show ? "text" : "password"}`}
                className="relative mb-3 text-1xl text-white bg-input border-black h-12  border-1 rounded border-opacity-25 hover:border-opacity-100 transform duration-200 focus:ring focus:ring-blue-300 outline-none px-2"
              />
              <span
                onClick={showPassword}
                className="absolute right-0 text-white bottom-7 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 mr-2 ${
                    show ? "text-white" : "text-discord"
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
            <div className="flex justify-content-between">
              <a
                onClick={handleResetPassword}
                className="inline text-15px text-forgot transform duration-200 no-underline hover:underline hover:text-forgot cursor-pointer"
              >
                Forgot your password?
              </a>
              <a className="inline text-forgot no-underline hover:text-forgot hidden xs:hidden sm:hidden lg:block">
                Remember me{" "}
                <Checkbox
                  className="p-0 m-0 text-white"
                  color="primary"
                  checked={remember}
                  inputProps={{ "aria-label": "white checkbox" }}
                  onClick={handleChangeCheckbox}
                />
              </a>
            </div>
            <div className="flex flex-col">
              <button
                disabled={loading}
                className="mt-8 flex text-white justify-center bg-button opacity-100 py-2.5 rounded mb-2 hover:opacity-70 transform duration-200"
              >
                {loading ? <Loading type={"spin"} color={"#fff"} /> : "Login"}
              </button>
              <p className="text-discord text-15px">
                Need an account? &nbsp;
                <a
                  onClick={handleRegister}
                  className=" text-forgot hover:text-forgot no-underline hover:underline"
                  href="#"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
          <div className="text-center text-white my-4">
            <p className="text-discord">Or login with</p>
            <div>
              <button
                aria-hidden="true"
                role="presentation"
                type="button"
                onClick={() => handleLoginForm(facebookProvider)}
                className="text-3xl hover:bg-facebook hover:text-white duration-300 rounded-full h-16 w-16 mx-2"
              >
                <span className="sr-only">facebook</span>
                <FontAwesomeIcon icon={["fab", "facebook-f"]} />
              </button>
              <button
                aria-hidden="true"
                role="presentation"
                type="button"
                onClick={() => handleLoginForm(googleProvider)}
                className="text-3xl hover:bg-white hover:text-google duration-300 rounded-full h-16 w-16 mx-2"
              >
                <span className="sr-only">google</span>
                <FontAwesomeIcon icon={["fab", "google"]} />
              </button>
              <button
                aria-hidden="true"
                role="presentation"
                type="button"
                onClick={() => handleLoginForm(githubProvider)}
                className="text-3xl hover:bg-white hover:text-github duration-300 rounded-full h-16 w-16 mx-2"
              >
                <span className="sr-only">github</span>
                <FontAwesomeIcon icon={["fab", "github"]} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
