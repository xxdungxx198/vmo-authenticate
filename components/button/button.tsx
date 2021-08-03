import React from "react";

interface PropsButton {
  color: string;
  title: string;
}

const Button: React.FC<PropsButton> = (props) => {
  const { color, title } = props;
  return (
    <div>
      <button style={{ backgroundColor: `${color}` }} title={title}>
        {title}
      </button>
    </div>
  );
};

export default Button;
