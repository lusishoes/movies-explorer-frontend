import { useState, useEffect } from "react";

function useWindowWidth() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    setTimeout(() => {
      window.addEventListener("resize", handleResize);
    }, 500);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowWidth;
