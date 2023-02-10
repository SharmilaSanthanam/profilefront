import React, { useState } from "react";

export default function UserHome({ userData }) {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  const getUser = () => {
    fetch("http://localhost:5000/userdata/:id", {
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
      fetch("http://localhost:5000/updateUser/:id", {
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

          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button><br />

          <form ><br />
            <h3>Update Profile Details</h3>

            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder={userData.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder={userData.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary" onClick={() => updateUser(userData.name, userData.email)}>
                Update
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );

}