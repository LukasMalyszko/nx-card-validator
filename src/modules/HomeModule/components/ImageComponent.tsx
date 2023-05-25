import React from "react";
import { useState, useEffect } from "react";

interface Props {
  src?: string;
}

export const ImageComponent: React.FC<Props> = () => {
  const [imageSrc, setImageSrc] = useState("/nx logo.png");

  useEffect(() => {
    const handleWindowResize = () => {
      const desktopImage = "/nx logo.png";
      const tabletImage = "/tab nx logo.png";
      const mobileImage = "/mob nx logo.png";
      const screenSize = window.innerWidth;

      let newSrc = desktopImage;
      if (screenSize <= 460) {
        newSrc = mobileImage;
      } else if (screenSize <= 1020) {
        newSrc = tabletImage;
      }

      setImageSrc(newSrc);
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
