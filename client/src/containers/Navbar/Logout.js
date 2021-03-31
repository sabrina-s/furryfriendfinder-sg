import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { LOGOUT_API } from "../../constants/api";
import "../../stylesheets/buttons.css";

const Logout = ({ setCurrentUser }) => {
  const history = useHistory();

  const handleLogout = () => {
    axios
      .post(LOGOUT_API, {}, { withCredentials: true })
      .then(() => {
        setCurrentUser();
        history.push("/");
      })
      .catch(console.error);
  };

  return (
    <div className="btn__plain" onClick={handleLogout}>
      Logout
    </div>
  );
};

export default Logout;
