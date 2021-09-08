import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Components/Main";
import Game from "./Components/Game";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Main />} />
        <Route path="/memory/:category/:level" component={() => <Game />} />
      </Switch>
    </Router>
  );
}

export default App;