import { useEffect } from "react";

export const useEscapeKey = (onEsc: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
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
