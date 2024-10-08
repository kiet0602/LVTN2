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
import userAtom from "../Atom/userAtom.js";

import imgSenda from "../assets/data/image/Senda/sen-da-chuoi-ngoc-dung.jpg";

import axios from "axios";
import { useSetRecoilState } from "recoil";

const SignIn = () => {
  const { goToSignUp, goToHome } = useNavigateCustom();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const setUser = useSetRecoilState(userAtom);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/users/login`, {
        email,
        password,
      });
      localStorage.setItem("userCurrent", JSON.stringify(res.data));
      console.log(res.data);
      setUser(res.data);
      goToHome();
    } catch (error) {
      console.log("Error: " + error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading
              bgClip="text"
              bgGradient="linear(to-l, #0ea5e9, #2563eb)"
              fontSize={"2xl"}
            >
              Tài khoảng đăng nhập của bạn
            </Heading>
            <FormControl id="email">
              <FormLabel>Địa chỉ Email</FormLabel>
              <Input
                placeholder="Ex: ten@gmail.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Mật khẩu</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    color={useColorModeValue("gray.900", "gray.100")}
                    onClick={handleClick}
                  >
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text>Bạn có tài khoảng chưa?</Text>

                <Text
                  bgClip="text"
                  bgGradient="linear(to-l, #0ea5e9, #2563eb)"
                  fontWeight={"bold"}
                  cursor={"pointer"}
                  _hover={{ color: "white" }}
                  onClick={goToSignUp}
                >
                  Đăng kí
                </Text>
              </Stack>

              <ButtonSighIn handleSignIn={handleSignIn} isLoading={isLoading} />
            </Stack>
          </Stack>
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

export default SignIn;
