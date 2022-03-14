import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useAuth } from "./custom-hooks";
import { Feed, Form, newPost } from "./components";

function App() {
  const { token, isLoggedIn, logout } = useAuth();

  const route = (
    <div>
      <div> token value is: {token || "''"}</div>
      <div> isLoggedIn?: {isLoggedIn.toString()}</div>
      <Form />
      <button onClick={() => logout()}>Logout</button>
    </div>
  );

  return (
    <Router>
      <nav>
        {isLoggedIn && <Link to="/">Logging In Link</Link>}
        {!isLoggedIn && <Link to="/">Logging Out Link</Link>}
      </nav>

      <Route path="/" component={() => route} />

      {!isLoggedIn && <Route path="/new" component={newPost} />}

      <Feed />
    </Router>
  );
}

export default App;
