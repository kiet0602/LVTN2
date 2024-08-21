import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import useSignInSocical from "../Hook/useCallbackCustom";

import { Button, Center, Stack, Text } from "@chakra-ui/react";

const ButtonSighIn = ({ handleSignIn, isLoading }) => {
  const signInGoogle = () => {
    window.open("http://localhost:5000/auth/google/callback", "self");
  };

  // const { handleGoogleSignIn, handleFacebookSignIn } = useSignInSocical();

  return (
    <Center>
      <Stack align={"center"} w={"full"}>
        <Button
          bgGradient="linear(to-l, #0ea5e9, #2563eb)"
          variant={"solid"}
          w={"full"}
          onClick={handleSignIn}
          isLoading={isLoading}
        >
          Đăng nhập
        </Button>
        {/* Facebook */}
        <Button w={"full"} colorScheme={"facebook"} leftIcon={<FaFacebook />}>
          <Center>
            <Text>Tiếp tục với Facebook</Text>
          </Center>
        </Button>
        {/* Google */}
        <Button
          w={"full"}
          variant={"outline"}
          leftIcon={<FcGoogle />}
          onClick={signInGoogle}
        >
          <Center>
            <Text>Tiếp tục với Google</Text>
          </Center>
        </Button>
      </Stack>
    </Center>
  );
};
export default ButtonSighIn;
