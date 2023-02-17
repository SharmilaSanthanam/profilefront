import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

export default function UserHome({ userData }) {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  // const logOut = () => {
  //   window.localStorage.clear();
  //   window.location.href = "/sign-in";
  // };

    const logOut = (event) => {
    // axios.get(`http://localhost:5000/api/logout`)
    //   .then(result => {
        window.sessionStorage.clear();
        window.localStorage.clear();
        window.location.href = "/";
        // navigate("/");
       
      // })
    }

    window.addEventListener("storage", logOut);

  const getUser = () => {
    fetch(`https://interntask-profile.onrender.com/userdata/:id`, {
//       fetch(`http://localhost:5000/userdata/:id`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  const updateUser = (id, name) => {
    if (window.confirm(`Are you sure you want to update ${name}`)) {
//       fetch(`http://localhost:5000/updateUser/:id`, {
        fetch(`https://interntask-profile.onrender.com/updateUser/:id`, {
        method: "PUT",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getUser(userData.name);
        });
    } else {
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          <h3>Welcome {userData.name} </h3>
          Name<h1>{userData.name}</h1>
          Email <h1>{userData.email}</h1>
          <br />
          <div className="d-grid">
          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
          </div>
          <br />
     
          <div className="d-grid">
  <button type="submit" className="btn btn-primary" onClick={() => navigate("/user-update/"+`${userData._id}`)}>
               Update
           </button>
           </div>

        </div>
      </div>
    </div>
  );

}
