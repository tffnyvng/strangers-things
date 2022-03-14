import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useAuth } from "./custom-hooks";
import {
  Home,
  Form,
  NewPost,
  EditPost,
  Nav,
  Login,
  Message,
} from "./components";

function App() {
  const { token, isLoggedIn, logout } = useAuth();

  const route = (
    <div>
      <div> token value is: {token || "''"}</div>
      <div> isLoggedIn?: {isLoggedIn.toString()}</div>
      <Login />
      <button onClick={() => logout()}>Logout</button>
    </div>
  );

  return (
    <Router>
      <nav>
        <Nav />
        {isLoggedIn && <Link to="/">Logging In Link</Link>}
        {!isLoggedIn && <Link to="/">Logging Out Link</Link>}
      </nav>

      {!isLoggedIn && (
        <Switch>
          <Route exact path="/" component={() => route} />
          <Route path="/home" component={Home} />
        </Switch>
      )}

      {isLoggedIn && (
        <Switch>
          <Route exact path="/" component={() => route} />
          <Route path="/home" component={Home} />
          <Route path="/posts/new" component={NewPost} />
        </Switch>
      )}
    </Router>
  );
}

export default App;
