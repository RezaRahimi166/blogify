import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturing = true) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  const ref = useRef();

  return ref;
}

export default useOutsideClick;
