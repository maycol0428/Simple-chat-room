import React, { useState, useRef, useEffect } from "react";

const useOutsideClick = (initValue) => {
  const ref = useRef(null);
  const refButtonShow = useRef(null);
  const [showEmoji, setShowEmoji] = useState(initValue);
  const handleClickOutside = (e) => {
    if (refButtonShow.current === e.target || refButtonShow.current.contains(e.target)) {
      return;
    }
    if (ref.current && !ref.current.contains(e.target)) {
      setShowEmoji(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return { showEmoji, setShowEmoji, ref, refButtonShow };
};

export default useOutsideClick;
