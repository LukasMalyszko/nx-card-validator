import React from "react";
import { useState, useEffect } from "react";

interface Props {
  src?:{[key: string]: string;
  }
}

export const ImageComponent: React.FC<Props> = ({src}) => {
  const [imageSrc, setImageSrc] = useState("/nx logo.png");

  useEffect(() => {
    const handleWindowResize = () => {
      const desktopImage = src?.desktopImage;
      const tabletImage = src?.tabletImage;
      const mobileImage = src?.mobileImage;
      const screenSize = window.innerWidth;

      let newSrc = desktopImage;
      if (screenSize <= 460) {
        newSrc = mobileImage;
      } else if (screenSize <= 1020) {
        newSrc = tabletImage;
      }

      setImageSrc(newSrc || "");
    };
    ///  nasłuchiwanie na zdarzenie resize przy montowaniu komponentu
    ///
    window.addEventListener("resize", handleWindowResize);
    /// czyszczenie nasłuchiwania przy odmontowaniu komponentu
    ///
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return <img src={imageSrc} alt="netflix logo" />;
};
