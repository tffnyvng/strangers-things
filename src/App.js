import React from "react";
import { BrowerRouter as Router, Route, Link } from "react-router-dom";
import { useAuth } from "./custom-hooks";
import { Form } from "./components";

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

      {!isLoggedIn && (
        <Route
          path="/pizza"
          component={() => <div>not logged in with pizza</div>}
        />
      )}
    </Router>
  );
}

export default App;
