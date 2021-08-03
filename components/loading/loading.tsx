import React from "react";
import ReactLoading, { LoadingType } from "react-loading";

interface PropsLoading {
  type: LoadingType;
  color: string;
}

const Loading: React.FC<PropsLoading> = ({ type, color }) => (
  <ReactLoading type={type} color={color} width={24} height={24} />
);

export default Loading;
