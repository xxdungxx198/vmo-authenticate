import React, { FC, useState } from "react";
import { useRef } from "react";
import Loading from "../../components/loading/loading";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../../utils/context/auth-context";

interface PropsResetPassword {}

const ResetPassword: React.FC<PropsResetPassword> = (props) => {
  // State
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [failure, setFailure] = useState<string>("");

  // Auth Method
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const { resetPassword } = useAuth();

  // Submit form
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setSuccess("Success! Now check your email for further information");
    } catch {
      setFailure("Fail to reset password");
    }
    setLoading(false);
  }

  // Navigate to Login page
  function handleLogin() {
    router.push("/login");
  }

  return (
    <div className="w-screen h-screen bg-discord_img flex justify-center items-center">
      <div className="bg-discord w-2/6 rounded-md">
        <div className="p-4">
          <h1 className="text-white">Forgot password?</h1>
          <p className="text-white ">
            Enter your email and we'll send you a reset link
          </p>
          <p className="text-green-400 my-2 text-2xl h-4">{success}</p>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="text-discord text-15px py-2">EMAIL</label>
            <input
              spellCheck="false"
              ref={emailRef}
              className={`mb-1 text-1xl text-white bg-input border-black h-12  border-1 rounded border-opacity-25 hover:border-opacity-100 transform duration-200 ${
                error ? "ring ring-red-500" : " focus:ring focus:ring-blue-300"
              } outline-none px-2`}
            ></input>
            <div
              className={`${error ? "text-danger" : "invisible"} h-4 text-18px`}
            >
              {failure}
            </div>
            <button
              disabled={loading}
              className="mt-2 flex text-white justify-center bg-button opacity-100 py-2.5 rounded mb-2 hover:opacity-70 transform duration-200"
            >
              {loading ? (
                <Loading type={"spin"} color={"#fff"} />
              ) : (
                "Reset my Password"
              )}
            </button>
            <a
              onClick={handleLogin}
              className="text-decoration-none text-center text-forgot pt-3"
              href="#"
            >
              Login
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
