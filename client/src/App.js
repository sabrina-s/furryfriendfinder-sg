import React from "react";
import "./App.css";
import Navbar from "./containers/Navbar/Navbar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import RegisterPage from "./containers/User/RegisterPage";
import LoginPage from "./containers/User/LoginPage";
import AdminPage from "./containers/Admin/AdminPage";
import DogPage from "./containers/Dog/DogPage";
import DogInfo from "./containers/Dog/DogInfo";
import { UserContext } from "./context/User";
import { useCurrentUserHook } from "./hooks/useCurrentUserHook";
import { Provider } from "react-redux";
import store from "./store/store";
import Alerts from "./components/Alerts";

function App() {
  const { currentUser, setCurrentUser } = useCurrentUserHook();

  return (
    <Provider store={store}>
      <UserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Alerts />
          <Navbar setCurrentUser={setCurrentUser} />
          <Switch>
            <Route path="/" exact component={DogPage} />
            <Route path="/dog/:dogId" exact component={DogInfo}/>
            <Route
              path="/register"
              render={() => <RegisterPage setCurrentUser={setCurrentUser} />}
            />
            <Route
              path="/login"
              render={() => <LoginPage setCurrentUser={setCurrentUser} />}
            />
            {currentUser && currentUser.isAdmin ? (
              <Route path="/admin" render={() => <AdminPage />} />
            ) : (
              <Redirect to="/" />
            )}
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </Provider>
  );
}

export default App;
