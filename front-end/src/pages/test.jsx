import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin người dùng
    axios
      .get("http://localhost:5000/api/user", { withCredentials: true }) // withCredentials để gửi cookie cùng với yêu cầu
      .then((response) => {
        const userData = response.data;
        console.log(userData);
        setUser(userData);
        let jsonString = JSON.stringify(userData);

        let encodedValue = encodeURIComponent(jsonString);
        // Lưu thông tin người dùng vào cookie
        Cookies.set("user", encodedValue, { expires: 7 }); // Lưu thông tin người dùng trong 7 ngày
        Cookies.set("userId", userData._id, { expires: 7 }); // Lưu thông tin người dùng trong 7 ngày

        // Lưu userId riêng biệt nếu cần

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
