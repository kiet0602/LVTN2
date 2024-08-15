import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Container,
  Stack,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
  Select,
  Image,
  Flex,
  Box,
} from "@chakra-ui/react";

const ModalInfoUser = ({ isOpen, onClose, data }) => {
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Modal isCentered isOpen={isOpen} size={"full"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh sửa hồ sơ cá nhân</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container maxW="7xl" py={10} px={{ base: 5, md: 8 }}>
              <Stack spacing={10}>
                <VStack
                  as="form"
                  spacing={8}
                  w="100%"
                  bg={useColorModeValue("white", "gray.700")}
                  rounded="lg"
                  boxShadow="lg"
                  p={{ base: 5, sm: 10 }}
                >
                  <Flex alignItems="center" justifyContent="center" gap={4}>
                    <Box>
                      <Image
                        borderRadius="full"
                        boxSize="150px"
                        src="https://bit.ly/dan-abramov"
                        alt="Dan Abramov"
                      />
                    </Box>
                    <Box>
                      <Button
                        bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                        onClick={handleButtonClick}
                      >
                        Thay đổi ảnh
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        //  onChange={handleFileChange}
                        style={{ display: "none" }} // Hide the input
                      />
                    </Box>
                  </Flex>

                  <VStack spacing={4} w="100%">
                    <Stack
                      w="100%"
                      spacing={3}
                      direction={{ base: "column", md: "row" }}
                    >
                      <FormControl>
                        <FormLabel>Tên của bạn</FormLabel>
                        <Input
                          type="text"
                          placeholder="Ahmad"
                          rounded="md"
                          value={data?.name}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Địa chỉ Email</FormLabel>
                        <Input
                          type="email"
                          placeholder="test@test.com"
                          rounded="md"
                          value={data?.email}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Số điện thoại</FormLabel>
                        <Input
                          type="email"
                          placeholder="test@test.com"
                          rounded="md"
                          value={data.phone}
                        />
                      </FormControl>
                    </Stack>
                    <Stack
                      w="100%"
                      spacing={3}
                      direction={{ base: "column", md: "row" }}
                    >
                      <FormControl>
                        <FormLabel>Đường</FormLabel>
                        <Select placeholder="Select option">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Huyện/xã</FormLabel>

                        <Select placeholder="Select option">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Tỉnh/Thành phố</FormLabel>
                        <Select placeholder="Select option">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </FormControl>
                    </Stack>
                  </VStack>
                  <VStack w="100%">
                    <Button
                      onClick={onClose}
                      bg={"red"}
                      color="white"
                      _hover={{
                        bg: "green.500",
                      }}
                      rounded="md"
                      w={{ base: "100%", md: "max-content" }}
                    >
                      Lưu thông tin
                    </Button>
                  </VStack>
                </VStack>
              </Stack>
            </Container>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalInfoUser;
