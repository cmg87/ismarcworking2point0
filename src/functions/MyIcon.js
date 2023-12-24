// MyIcon.js

import React from "react";
import { ReactComponent as FontAwesomeIcon } from "../images/share-solid.svg";

const MyIcon = () => {
  const iconStyle = {
    width: "24px",
    height: "24px",
    fill: "blue", // Adjust the color as needed
  };

  return (
    <>
      <FontAwesomeIcon style={iconStyle} />
    </>
  );
};

export default MyIcon;
