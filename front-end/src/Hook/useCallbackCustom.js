import { useCallback } from "react";

const useSignInSocical = () => {
  const handleGoogleSignIn = useCallback(() => {
    // Redirect to Google Authentication
    window.location.href = "http://localhost:5000/auth/google";
  }, []);

  const handleFacebookSignIn = useCallback(() => {
    window.location.href = "http://localhost:5000/auth/facebook";
  }, []);

  return { handleGoogleSignIn, handleFacebookSignIn };
};

export default useSignInSocical;
