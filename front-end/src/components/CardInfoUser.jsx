import React, { useState } from "react";
import {
  Container,
  Text,
  Stack,
  Avatar,
  Icon,
  Box,
  Button,
  useColorModeValue,
  useDisclosure,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { ImQuotesLeft } from "react-icons/im";
import ModalInfoUser from "./ModalInfoUser";
import useFetchUsers from "../Hook/useFetchUsers";

const CardInfoUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, loading, error } = useFetchUsers();
  const [updateDataUser, setUpdateDataUser] = useState(null);

  const OpenModal = (user) => {
    setUpdateDataUser(user);
    onOpen();
  };

  return (
    <Box bg={useColorModeValue("white", "black")}>
      <Container maxW="6xl" p={{ base: 3, md: 8 }}>
        {loading ? (
          <Flex
            align="center"
            justify="center"
            height="40vh" // Or adjust height based on your needs
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        ) : error ? (
          <Flex
            align="center"
            justify="center"
            height="150vh" // Or adjust height based on your needs
          >
            <Text color="red.500" fontSize="lg">
              Có lỗi xảy ra: {error.message}
            </Text>
          </Flex>
        ) : (
          user && (
            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={{ base: 0, sm: 10 }}
              p={{ base: 2, sm: 5 }}
              rounded="lg"
              justifyContent="center"
            >
              <Box
                width="10rem"
                pos="relative"
                display={{ base: "none", sm: "flex" }}
                justifyContent="center"
                alignItems="center"
              >
                <Avatar
                  size="2xl"
                  showBorder={true}
                  borderColor="green.400"
                  name="avatar"
                  src={user.avatar}
                />
              </Box>

              <Stack direction="column" spacing={4} textAlign="left" maxW="4xl">
                <Icon as={ImQuotesLeft} w={10} h={10} color="white" />
                <Stack
                  alignItems={{ base: "center", sm: "flex-start" }}
                  spacing={0}
                >
                  <Avatar
                    size="xl"
                    showBorder={true}
                    borderColor="green.400"
                    name="avatar"
                    src={user.avatar}
                    display={{ base: "block", sm: "none" }}
                  />
                  <Text fontWeight="bold" fontSize="lg">
                    {user.username}
                  </Text>
                  <Text fontWeight="medium" fontSize="sm">
                    Email: {user.email}
                  </Text>
                  <Text fontWeight="medium" fontSize="sm">
                    Địa chỉ: {user.address.street}, {user.address.city},{" "}
                    {user.address.country}
                  </Text>
                  <Text fontWeight="medium" fontSize="sm">
                    Số điện thoại: {user.phoneNumber}
                  </Text>
                  <Text fontWeight="medium" fontSize="sm">
                    Vai trò: {user.role}
                  </Text>
                  <Box paddingTop={2}>
                    <Button onClick={() => OpenModal(user)}>
                      <Text
                        padding={{ base: 2, sm: 4, md: 6 }}
                        fontSize={{ base: "sm", md: "md" }}
                        width={{ base: "full", sm: "auto" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                      >
                        chỉnh sửa
                      </Text>
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          )
        )}
        {updateDataUser && (
          <ModalInfoUser
            isOpen={isOpen}
            onClose={onClose}
            data={updateDataUser}
          />
        )}
      </Container>
    </Box>
  );
};

export default CardInfoUser;
