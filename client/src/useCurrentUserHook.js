import { useState } from "react";

export const useCurrentUserHook = () => {
  const [currentUser, setCurrentUser] = useState();

  return {
    currentUser,
    setCurrentUser,
  };
};
