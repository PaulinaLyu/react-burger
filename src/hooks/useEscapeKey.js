import { useEffect } from "react";

export const useEscapeKey = (onEsc) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onEsc(e);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onEsc]);
};
