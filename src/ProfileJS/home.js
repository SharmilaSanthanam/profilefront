import React from "react";
import axios from "../axios";

export default function Home() {
 
  const logOut = (event) => {
    axios.get(`http://localhost:5000/api/logout`)
      .then(result => {
        window.sessionStorage.clear();
        window.localStorage.clear();
        window.location.href = "/";
      })
  }
  window.addEventListener("storage", logOut);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          <h3>Welcome</h3>
          </div>
          <div className="d-grid">
          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
          </div>
      </div>
    </div>
  );
}