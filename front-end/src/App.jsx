import React from "react";
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import PageUser from "./pages/PageUser";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ButtonIconModeColor from "./components/ButtonIconModeColor";
import Google from "./pages/Google"; // Import Google component
import UserProfile from "./pages/test";
import Facebook from "./pages/Facebook";

function App() {
  return (
    <>
      {/* Set the position to fixed to keep the button in place on scroll */}
      <Box position={"fixed"} bottom={4} right={4} zIndex={9}>
        <ButtonIconModeColor />
      </Box>
      <Box position={"relative"} w={"full"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/profile" element={<PageUser />} />
          <Route path="/checkOut" element={<CheckoutPage />} />
          <Route path="/productDetail" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/auth/google" element={<Google />} />
          <Route path="/auth/facebook" element={<Facebook />} />

          <Route path="/test" element={<UserProfile />} />

          {/* Route for Google Authentication */}
        </Routes>
      </Box>
    </>
  );
}

export default App;
