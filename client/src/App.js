import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./containers/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RegisterPage from "./containers/RegisterPage";
import LoginPage from "./containers/LoginPage";
import { UserContext } from "./context/User";
import axios from "axios";
import { ME_API } from "./constants/api";

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    axios
      .get(ME_API, { withCredentials: true })
      .then((user) => setCurrentUser(user.data))
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Navbar setCurrentUser={setCurrentUser} />
          <Switch>
            <Route path="/" exact render={() => <h1>home</h1>} />
            <Route
              path="/register"
              render={() => <RegisterPage setCurrentUser={setCurrentUser} />}
            />
            <Route
              path="/login"
              render={() => <LoginPage setCurrentUser={setCurrentUser} />}
            />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
