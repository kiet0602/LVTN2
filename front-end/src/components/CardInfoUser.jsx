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
} from "@chakra-ui/react";
import { ImQuotesLeft } from "react-icons/im";
import ModalInfoUser from "./ModalInfoUser";

const testimonials = [
  {
    name: "Ben Parker",
    email: "ben.parker@example.com",
    address: "123 Elm Street, Springfield",
    phone: "+1234567890",
    role: "Khách hàng",
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
  },
];

const CardInfoUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [testimonial, setTestimonial] = useState([]);

  const OpenModal = (testimonial) => {
    setTestimonial(testimonial);
    onOpen();
  };

  return (
    <>
      <Box bg={useColorModeValue("white", "black")}>
        <Container maxW="6xl" p={{ base: 3, md: 8 }}>
          {testimonials.map((obj, index) => (
            <React.Fragment key={index}>
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
                    src={obj.image}
                  />
                </Box>

                <Stack
                  direction="column"
                  spacing={4}
                  textAlign="left"
                  maxW="4xl"
                >
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
                      src={obj.image}
                      display={{ base: "block", sm: "none" }}
                    />
                    <Text fontWeight="bold" fontSize="lg">
                      {obj.name}
                    </Text>
                    <Text fontWeight="medium" fontSize="sm">
                      Email: {obj.email}
                    </Text>
                    <Text fontWeight="medium" fontSize="sm">
                      Địa chỉ: {obj.address}
                    </Text>
                    <Text fontWeight="medium" fontSize="sm">
                      Số điện thoại: {obj.phone}
                    </Text>
                    <Text fontWeight="medium" fontSize="sm">
                      Vai trò: {obj.role}
                    </Text>
                    <Box paddingTop={2}>
                      {" "}
                      <Button onClick={() => OpenModal(obj)}>
                        <Text
                          padding={{ base: 2, sm: 4, md: 6 }} // Responsive padding
                          fontSize={{ base: "sm", md: "md" }} // Responsive font size
                          width={{ base: "full", sm: "auto" }} // Responsive width
                          display="flex" // Ensures that content is properly aligned
                          alignItems="center" // Center align items vertically
                          justifyContent="center" // Center align items horizontally
                          textAlign="center"
                        >
                          chỉnh sửa
                        </Text>
                      </Button>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </React.Fragment>
          ))}
          <ModalInfoUser isOpen={isOpen} onClose={onClose} data={testimonial} />
        </Container>
      </Box>
    </>
  );
};

export default CardInfoUser;
