import React, { useEffect, useState } from "react";

const Image = (props) => {
  const [imageSrc, setImageSrc] = useState("");
  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onloadend = function () {
      setImageSrc(reader.result);
    };
  }, [props.blob]);
  return <img style={{ width: 150, height: 150 }} src={imageSrc} alt={props.fileName}></img>;
};

export default Image;
