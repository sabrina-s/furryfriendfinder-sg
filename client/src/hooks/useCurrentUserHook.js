import { useState, useEffect } from "react";
import { ME_API } from "../constants/api";
import axios from "axios";

export const useCurrentUserHook = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    axios
      .get(ME_API, { withCredentials: true })
      .then((user) => setCurrentUser(user.data))
      .catch(() => console.error("Not logged in."));
  }, []);

  return {
    currentUser,
    setCurrentUser,
  };
};
