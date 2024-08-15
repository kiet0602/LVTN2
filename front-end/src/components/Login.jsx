import { useState } from "react";
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import ButtonSighIn from "./ButtonSignIn";
import useNavigateCustom from "../Hook/useNavigateCustom.js";

import { SignIn, UserButton, useUser } from "@clerk/clerk-react";

import imgSenda from "../assets/data/image/Senda/sen-da-chuoi-ngoc-dung.jpg";

const Login = () => {
  const { goToSignUp } = useNavigateCustom();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <SignIn />
        </Flex>
        <Flex flex={1} align={"center"} justify={"center"}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            borderRadius={10}
            height={"400px"}
            src={imgSenda}
          />
        </Flex>
      </Stack>
    </>
  );
};

export default Login;
