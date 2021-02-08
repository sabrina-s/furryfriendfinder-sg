import "./App.css";
import Navbar from "./components/common/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RegisterPage from "./containers/RegisterPage";
import LoginPage from "./containers/LoginPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact render={() => <h1>home</h1>} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
