import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useAuth } from "./custom-hooks";
import {
  Home,
  NewPost,
  Nav,
  LoginOrRegister,
  Message,
  Profile,
  Search,
} from "./components";

function App() {
  const { token, isLoggedIn, logout } = useAuth();

  return (
    <Router>
      <nav>
        <Nav />
        {/* <Route path="/home" component={Search} /> */}
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
            <Route path="/profile" component={Profile} />
            <Route path="/posts/:postId/messages/new" component={Message} />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
