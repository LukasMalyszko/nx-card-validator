import React, { useEffect, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

interface Props {
  placeholder: string;
  className: string;
  // onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (event: any) => void;
}

export const ResizableExpiryDate: React.FC<Props> = ({
  placeholder,
  className,
  // onBlur,
  onChange,
  onKeyUp,
}) => {
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
  }, [placeholder]);

  return (
    <input
      ref={expiryDateRef}
      className={className}
      type="text"
      name="expiryDate"
      maxLength={5}
      required
      placeholder={shortenedPlaceholder}
      // onBlur={onBlur}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  );
};
