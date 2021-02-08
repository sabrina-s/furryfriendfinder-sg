import React from "react";

const FFFIconText = ({ text, children }) => {
  return (
    <div className="fff__flex fff__center_align">
      {children}
      <div>{text}</div>
    </div>
  );
};

export default FFFIconText;
