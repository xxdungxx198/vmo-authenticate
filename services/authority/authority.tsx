import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import Loading from "../../components/loading/loading";
import { useAuth } from "../../utils/context/auth-context";

interface PropsAuthority {
  children: ReactElement;
}

export const Authority: React.FC<PropsAuthority> = ({ children }) => {
  const router = useRouter();
  const [authenticated, setAuth] = useState(false);
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser === null) {
      router.push("/login");
    } else {
      setAuth(true);
    }
  }, []);
  if (!authenticated) {
    return (
      <div>
        <div className="bg-discord_img h-screen w-screen flex items-center justify-center">
          <div className="bg-discord p-4 text-white rounded-md flex justify-center flex-col">
            <p className="text-5xl">Loading</p>
            <p className="self-center">
              <Loading type="balls" color="#FFF" />
            </p>
          </div>
        </div>
      </div>
    );
  }
  return <div>{children}</div>;
};
