import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/login/success",
          { withCredentials: true } // Ensures cookies are sent with the request
        );

        if (response.data.success) {
          setUser(response.data.user);
          console.log(response.data.user);

          // Save user data to localStorage
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          setError("Failed to authenticate user.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
        navigate("/login/failed"); // Redirect to a failure page or login page
      }
    };

    fetchUser();
  }, [navigate]);

  const handleRedirect = () => {
    window.location.href = "http://localhost:4000/";
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {user.avatar && <img src={user.avatar} alt="User Avatar" />}
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>User ID: {user._id}</p>{" "}
      {/* Displaying User ID, use _id if that's the field name */}
      <button onClick={handleRedirect}>Go to Homepage</button>
    </div>
  );
};

export default Test;
