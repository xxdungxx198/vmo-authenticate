import React from "react";
import Register from "../../modules/authentication/register";

interface PropsIndex {}

const Index: React.FC<PropsIndex> = (props) => {
  return (
    <div>
      <Register />
    </div>
  );
};

export default Index;
