import React from "react";
import "./App.css";
import Navbar from "./components/common/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RegisterPage from "./containers/RegisterPage";
import LoginPage from "./containers/LoginPage";
import { useCurrentUserHook } from "./useCurrentUserHook";
import { UserContext } from "./context/User";

function App() {
  const { currentUser, setCurrentUser } = useCurrentUserHook();

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Navbar setCurrentUser={setCurrentUser} />
          <Switch>
            <Route path="/" exact render={() => <h1>home</h1>} />
            <Route path="/register" component={RegisterPage} />
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
