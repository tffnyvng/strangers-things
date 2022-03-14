import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useAuth } from "./custom-hooks";
import {
  Home,
  NewPost,
  EditPost,
  Nav,
  LoginOrRegister,
  Message,
} from "./components";

function App() {
  const { token, isLoggedIn, logout } = useAuth();

  const route = (
    <div>
      <div> token value is: {token || "''"}</div>
      <div> isLoggedIn?: {isLoggedIn.toString()}</div>

      <button onClick={() => logout()}>Logout</button>
    </div>
  );

  return (
    <Router>
      <nav>
        <Nav />
      </nav>
      <Switch>
        {!isLoggedIn && (
          <>
            <Route path="/home" component={Home} />
            <Route path="/login" component={LoginOrRegister} />
            <Route path="/register" component={LoginOrRegister} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/home" component={Home} />
            <Route path="/posts/new" component={NewPost} />
          </>
        )}{" "}
      </Switch>
    </Router>
  );
}

export default App;
