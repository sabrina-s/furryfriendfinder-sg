import React from "react";
import { Dialog } from "@material-ui/core";

const FFFModal = ({ isOpen, children }) => {
  return <Dialog open={isOpen}>{children}</Dialog>;
};

export default FFFModal;
