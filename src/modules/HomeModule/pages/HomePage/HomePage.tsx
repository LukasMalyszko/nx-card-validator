import React, { useState } from "react";
import "./HomePage.scss";

interface IProps {
  msg: string;
}

export const HomePage: React.FC<IProps> = ({ msg }) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{msg}</h1>
      <div className="card">
        <p>
          See the README.md for more information on how to start your challenge.
        </p>
        <button
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
      </div>
    </>
  );
};
