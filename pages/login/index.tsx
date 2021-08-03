import React from "react";
import Login from "../../modules/authentication/login";

interface PropsIndex {}

const Index: React.FC<PropsIndex> = (props) => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default Index;
