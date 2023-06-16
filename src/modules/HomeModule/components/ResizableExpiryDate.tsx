import React, { useEffect, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

interface Props {
  placeholder: string;
  className: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ResizableExpiryDate: React.FC<Props> = ({ placeholder, className, onChange }) => {
  const expiryDateRef = useRef<HTMLInputElement>(null);
  const [shortenedPlaceholder, setShortenedPlaceholder] = useState(placeholder);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const input = expiryDateRef.current;

      if (input && width < 140) {
        const shortenedText = "Exp D (MM/YY)";
        setShortenedPlaceholder(shortenedText);
      } else {
        setShortenedPlaceholder(placeholder);
      }
    });

    if (expiryDateRef.current) {
      resizeObserver.observe(expiryDateRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [placeholder]);

  return (
    <input
      ref={expiryDateRef}
      className={className}
      type="text"
      name="expiryDate"
      minLength={4}
      maxLength={5}
      required
      placeholder={shortenedPlaceholder}
      onChange={onChange}
    />
  )
};
