import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Facebook = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Google Authentication
    window.location.href = "http://localhost:5000/auth/facebook";
  }, [navigate]);

  return (
    <div>
      <Button colorScheme="teal" onClick={() => navigate("/auth/facebook")}>
        Đăng Nhập Với facebook
      </Button>
    </div>
  );
};

export default Facebook;
