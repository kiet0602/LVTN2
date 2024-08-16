import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin người dùng
    axios
      .get("http://localhost:5000/api/user", { withCredentials: true }) // withCredentials để gửi cookie cùng với yêu cầu
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response ? err.response.data : "An error occurred");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      {user && (
        <div>
          <img src={user.avatar} alt="User Avatar" />
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>
            Address:{" "}
            {user.address
              ? `${user.address.street}, ${user.address.city}, ${user.address.country}`
              : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
