import {
  Box,
  Flex,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Icon,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Image,
  Badge,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";

import { NavLink } from "react-router-dom";

import useNavigateCustom from "../Hook/useNavigateCustom.js";
import InputSearch from "./InputSearch.jsx";

import AvatarUser from "./AvatarUser";

import imgSenda from "../assets/data/image/Senda/sen-da-chuoi-ngoc-dung.jpg";
import { navLinks, dropdownLinks } from "../assets/data/datalink/datalink.js";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { goToSignIn, goToHome } = useNavigateCustom();

  const gradientStart = useColorModeValue("#0ea5e9", "#2563eb");
  const gradientEnd = useColorModeValue("#2563eb", "#0ea5e9");
  // Define hover colors for different modes
  const hoverColor = useColorModeValue("black", "white");
  return (
    <Box
      px={4}
      bg={useColorModeValue("white", "gray.800")}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
        <Flex gap={2} alignItems="center">
          <Image borderRadius={"20px"} src={imgSenda} alt="" h={8} w={8} />
          <Text
            cursor={"pointer"}
            onClick={goToHome}
            bgGradient="linear(to-l, #0ea5e9, #2563eb)" // Linear gradient from right to left
            bgClip="text" // Clips the background to the text
            fontSize="20px" // Example font size
            fontWeight="bold"
            as="i"
          >
            SHOP TREE
          </Text>
        </Flex>

        <HStack spacing={8} alignItems="center">
          <HStack
            as="nav"
            spacing={6}
            display={{ base: "none", md: "flex" }}
            alignItems="center"
          >
            {navLinks.map((link, index) => (
              <CustomNavLink key={index} name={link.name} path={link.path} />
            ))}

            <Menu autoSelect={false} isLazy>
              {({ isOpen, onClose }) => (
                <>
                  <MenuButton
                    _hover={{ color: "white.400" }}
                    textDecoration="none"
                  >
                    <Flex alignItems="center">
                      <Text>Thể loại</Text>
                      <Icon
                        as={BiChevronDown}
                        h={5}
                        w={5}
                        ml={1}
                        transition="all .25s ease-in-out"
                        transform={isOpen ? "rotate(180deg)" : ""}
                      />
                    </Flex>
                  </MenuButton>

                  <MenuList
                    zIndex={5}
                    bg={useColorModeValue(
                      "rgb(255, 255, 255)",
                      "rgb(26, 32, 44)"
                    )}
                    border="none"
                    boxShadow={useColorModeValue(
                      "2px 4px 6px 2px rgba(160, 174, 192, 0.6)",
                      "2px 4px 6px 2px rgba(9, 17, 28, 0.6)"
                    )}
                  >
                    {dropdownLinks.map((link, index) => (
                      <MenuLink
                        key={index}
                        name={link.name}
                        path={link.path}
                        onClose={onClose}
                      />
                    ))}
                  </MenuList>
                </>
              )}
            </Menu>
          </HStack>
        </HStack>
        <Flex alignItems="center" gap={4} wrap="nowrap">
          <InputSearch />
          <AvatarUser />

          <Text
            fontSize="15px"
            onClick={goToSignIn}
            display="inline-block"
            whiteSpace="nowrap"
            _hover={{ color: hoverColor }} // Use hover color based on mode
            bgGradient={`linear(to-l, ${gradientStart}, ${gradientEnd})`} // Gradient based on mode
            bgClip="text"
            fontWeight="bold"
            cursor={"pointer"}
          >
            Đăng nhập
          </Text>

          <Box position="relative" display="inline-block">
            <IconButton
              icon={<FaShoppingCart />}
              aria-label="Cart"
              variant="outline"
              // Example of updating cart count
              fontSize="24px"
            />
            {/* Badge for displaying cart count */}
            <Badge
              position="absolute"
              top="0"
              right="0"
              transform="translate(50%, -50%)"
              colorScheme="red"
              borderRadius="full"
              fontSize="0.8em"
              padding="4px"
            >
              0
            </Badge>
          </Box>
          <IconButton
            size="md"
            icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
            aria-label="Open Menu"
            display={{ base: "inherit", md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ base: "inherit", md: "none" }}>
          <Stack as="nav" spacing={2}>
            {navLinks.map((link, index) => (
              <CustomNavLink key={index} name={link.name} path={link.path} />
            ))}
            <Text fontWeight="semibold" color="gray.500">
              Thể loại
            </Text>
            <Stack pl={2} spacing={1} mt={"0 !important"}>
              {dropdownLinks.map((link, index) => (
                <CustomNavLink key={index} name={link.name} path={link.path} />
              ))}
            </Stack>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

const CustomNavLink = ({ name, path }) => {
  // Colors for active and hover states
  const activeColor = useColorModeValue("blue.500", "blue.200");
  const hoverColor = useColorModeValue("blue.400", "blue.300");
  // Define gradient colors for different modes

  return (
    <NavLink
      to={path}
      style={({ isActive }) => ({
        color: isActive ? activeColor : "inherit",
        textDecoration: "none",
      })}
    >
      <Text
        _hover={{
          color: hoverColor,
        }}
      >
        {name}
      </Text>
    </NavLink>
  );
};

const MenuLink = ({ name, path, onClose }) => {
  return (
    <NavLink
      to={path}
      style={({ isActive }) => ({
        color: isActive ? "blue.400" : "inherit",
      })}
      onClick={onClose}
    >
      <MenuItem
        _hover={{
          color: "blue.400",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        <Text>{name}</Text>
      </MenuItem>
    </NavLink>
  );
};

export default Navbar;
