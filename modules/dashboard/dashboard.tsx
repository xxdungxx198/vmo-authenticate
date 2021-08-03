import router from "next/router";
import React, { useState } from "react";
import { useAuth } from "../../utils/context/auth-context";

interface PropsDashboard {}

export const Dashboard: React.FC<PropsDashboard> = (props) => {
  const { logout, currentUser } = useAuth();
  const [toggleOption, setToggleOptios] = useState<boolean>(false);
  async function handleLogOut() {
    try {
      await logout();
      router.push("/login");
    } catch {
      alert;
    }
  }

  function handleOptions() {
    setToggleOptios(!toggleOption);
  }

  return (
    <div>
      <div className="relative grid grid-cols-6 relative">
        <div className="bg-discord">
          <div className="flex flex-col justify-center justify-content-between relative h-screen">
            <a className="block text-white text-center text-decoration-none text-4xl">
              VMO
            </a>
          </div>
          <nav className="text-white"></nav>
        </div>
        <div className="relative col-span-5 h-screen bg-light ">
          <div className="bg-white shadow-2xl flex justify-content-end items-center py-2 px-3">
            <p className="inline font-bold m-0 mx-2">
              {currentUser.displayName !== null ? currentUser.displayName : ""}
            </p>
            <button onClick={handleOptions} className="inline">
              <img
                src={currentUser.photoURL !== null ? currentUser.photoURL : ""}
                className=" rounded-full w-8 h-8"
              ></img>
            </button>
          </div>
          <div className="">
            <h1>Hello</h1>
          </div>
        </div>
        <div
          className={`absolute right-0 top-12 ${
            toggleOption ? "visible" : "invisible"
          }`}
        >
          <button
            onClick={handleLogOut}
            className="p-2 font-bold bg-white shadow-2xl border border-current"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
