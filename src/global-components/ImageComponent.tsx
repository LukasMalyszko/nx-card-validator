import React from "react";
import { useState, useEffect } from "react";

interface Props {
  src?: {
    desktopImage?: string;
    tabletImage?: string;
    mobileImage?: string;
  };
}

export const ImageComponent: React.FC<Props> = ({ src }) => {
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

    window.onload = handleWindowResize;

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [src]);
    

  return <img src={imageSrc} alt="netflix logo" />;
};
