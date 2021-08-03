import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import router from "next/router";


interface PropsSuccess {}

const Success: React.FC<PropsSuccess> = (props) => {
    const handleChange = () => {
        router.push('/login')
    }
  return (
    <div className="h-screen w-screen bg-discord_img flex justify-center items-center">
      <div className="text-white font-sans bg-discord text-center p-8 rounded">
        <div className="">
          <span className="text-6xl pb-4">
            <FontAwesomeIcon className="text-success" icon={faCheckCircle} />
          </span>
          <p className="text-2xl">
            Congratulations, your account has been successfully created
          </p>
          <button
            className="bg-button px-8 py-2 rounded opacity-100 hover:opacity-70 transform duration-200"
            onClick={handleChange}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
