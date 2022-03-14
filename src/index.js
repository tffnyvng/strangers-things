import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context";

// const App = () => {
//   const [] = useState();

//   return (
//     <div className="app">
//       {/* <Home /> */}
//       {/* <Feed /> */}
//       {/* <Form /> */}
//     </div>
//   );
// };

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
