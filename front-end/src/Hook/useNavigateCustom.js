import { useNavigate } from "react-router-dom";

const useCustomNavigate = () => {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/signUp");
  };
  const goToSignIn = () => {
    navigate("/signIn");
  };

  const goToHome = () => {
    navigate("/");
  };

  return {
    goToSignUp,
    goToSignIn,
    goToHome,
  };
};

export default useCustomNavigate;
