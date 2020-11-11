import React, {useEffect, useState} from "react";

 const useWindowSize = () => {
  const isSSR = typeof window !== "undefined";

  const [windowSize, setWindowSize] = useState({
    width: isSSR && window.innerWidth,
    height:  isSSR && window.innerHeight
  });

  const changeWindowSize = () => {
    return setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

   useEffect(() => {
     window.addEventListener("resize", changeWindowSize);
     return () => {
       window.removeEventListener("resize", changeWindowSize);
     };
  }, []);

  return windowSize;
}
export default useWindowSize;
