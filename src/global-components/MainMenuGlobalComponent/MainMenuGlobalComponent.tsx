import React from "react";
import "./MainMenuGlobalComponent.scss";
import ViteSvg from "@/assets/images/vite.svg";

export const MainMenuGlobalComponent: React.FC = () => (
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={ViteSvg} className="logo" alt="Vite logo" />
    </a>
  </div>
);
