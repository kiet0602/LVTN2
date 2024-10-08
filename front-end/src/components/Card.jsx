import React from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  useColorModeValue,
  Icon,
  Button,
} from "@chakra-ui/react";

import { toast } from "react-toastify";

import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Card = ({ imageSrc, avatarSrc, review, name, country }) => {
  return (
    <Box
      as="article"
      width={{ base: "100%", md: 1 / 4 }}
      px={{ md: "1rem" }}
      mb={{ base: "6", md: "0" }}
      cursor={"pointer"}
      pos="relative"
    >
      <Box>
        <Image
          alt="header image"
          src={imageSrc}
          objectFit="cover"
          borderRadius="0.25rem"
          w="100%"
        />

        {/* Featured Badge */}
        <Flex
          alignItems="center"
          p={1}
          bg="red.400"
          pos="absolute"
          fontSize="xs"
          fontWeight="500"
          color="white"
          top={0}
          left={0}
          borderRadius="0.25rem"
        >
          <Text>FEATURED</Text> &nbsp;{" "}
          <Icon as={AiOutlineExclamationCircle} h={4} w={4} />
        </Flex>

        <Box my={3} alignItems="center">
          <Flex>
            {" "}
            {Array.from(Array(4).keys()).map((id) => {
              return <Star key={id} />;
            })}
          </Flex>
        </Box>
        <Box marginBottom={2}>
          <Text>100$</Text>
        </Box>

        <Text
          color={useColorModeValue("gray.700", "gray.400")}
          fontSize="0.87rem"
          textAlign="left"
          lineHeight="1.375"
          fontWeight="300"
        >
          {review}
        </Text>
      </Box>

      <Flex my={3} alignItems="center" justifyContent="space-between">
        <Flex>
          <Button>
            <FontAwesomeIcon icon={faHeart} />
          </Button>
        </Flex>
        <Flex>
          <Button colorScheme="teal" variant="ghost">
            <Text color={useColorModeValue("gray.900", "gray.100")}>
              {" "}
              Thêm giỏ hàng
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

const Star = () => {
  return (
    <svg
      style={{
        width: "1rem",
        height: "1rem",
        fill: "#008F94",
        marginRight: "0.25rem",
      }}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z" />
    </svg>
  );
};

export default Card;
