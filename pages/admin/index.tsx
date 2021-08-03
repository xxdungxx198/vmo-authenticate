import React from "react";
import { Dashboard } from "../../modules/dashboard/dashboard";
import { Authority } from "../../services/authority/authority";

interface PropsIndex {}

const Index: React.FC<PropsIndex> = () => {
  return (
    <div>
      <Authority>
        <Dashboard />
      </Authority>
    </div>
  );
};

export default Index;
