import React from "react";
import "./App.css";
import Navbar from "./containers/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RegisterPage from "./containers/User/RegisterPage";
import LoginPage from "./containers/User/LoginPage";
import AdminPage from "./containers/Admin/AdminPage";
import DogPage from "./containers/Dog/DogPage";
import { UserContext } from "./context/User";
import { useCurrentUserHook } from "./hooks/useCurrentUserHook";

function App() {
  const { currentUser, setCurrentUser } = useCurrentUserHook();

  return (
    <div>
      <UserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Navbar setCurrentUser={setCurrentUser} />
          <Switch>
            <Route path="/" exact component={DogPage} />
            <Route
              path="/register"
              render={() => <RegisterPage setCurrentUser={setCurrentUser} />}
            />
            <Route
              path="/login"
              render={() => <LoginPage setCurrentUser={setCurrentUser} />}
            />
            {/* TODO: Protect /admin route from non admins */}
            <Route path="/admin" render={() => <AdminPage />} />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
