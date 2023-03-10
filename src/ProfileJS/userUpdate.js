import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UserUpdate() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const accessToken = window.localStorage.getItem("accessToken");

  const editprofile = async () => {
    try {
//       const { data } = await axios.get(`http://localhost:5000/${id}`,
       const { data } = await axios.get(`https://interntask-profile.onrender.com/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setProfile(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    editprofile();
  }, []);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        {profile ? (<EditUpdateForm profile={profile} />
        ) : (
          <div className="progress mt-3">
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export function EditUpdateForm({ profile }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem("accessToken");

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  const logOut = (event) => {
    window.sessionStorage.clear();
    window.localStorage.clear();
    window.location.href = "/";
  }

  window.addEventListener("storage", logOut);

  //edit userupdate form and api call

  const editprofile = async () => {
    const updateProfile = {
      name: name,
      email: email,
    };
//     await axios.put(`http://localhost:5000/${id}`, updateProfile,
      await axios.put(`https://interntask-profile.onrender.com/${id}`, updateProfile,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    alert("Updated Successfully");
    navigate("/userDetails");
  };


  return (
    <div>
      <form>
        <h3>Update Profile</h3>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={editprofile}>
            Update
          </button>
          <br></br>
        </div>
      </form>

      <div className="d-grid">
        <h1>Updated Profile</h1>
        Name<h1>{profile.data.name}</h1>
        Email <h1>{profile.data.email}</h1>
        <button onClick={logOut} className="btn btn-primary">
          Log Out
        </button>&nbsp; &nbsp;
      </div>
    </div>
  );
}
export default UserUpdate;
