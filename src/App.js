import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./ProfileCss/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./ProfileJS/login";
import SignUp from "./ProfileJS/signup";
import UserDetails from "./ProfileJS/userdetails";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn === "true" ? <UserDetails /> : <Login />}
          />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/userDetails" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;