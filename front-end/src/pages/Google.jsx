import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Google = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Google Authentication
    window.location.href = "http://localhost:5000/auth/google";
  }, [navigate]);

  return (
    <div>
      <Button colorScheme="teal" onClick={() => navigate("/auth/google")}>
        Đăng Nhập Với Google
      </Button>
    </div>
  );
};

export default Google;
