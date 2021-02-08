import "./App.css";
import Navbar from "./components/common/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact render={() => <h1>home</h1>} />
          <Route path="/register" render={() => <h1>register</h1>} />
          <Route path="/login" render={() => <h1>login</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
