import {
  Avatar,
  Button,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../Atom/userAtom";

const AvatarUser = () => {
  const user = useRecoilValue(userAtom);
  return (
    <>
      <Menu isLazy>
        <MenuButton as={Button} size="sm" px={0} py={0} rounded="full">
          <Avatar
            size="sm"
            src={"https://avatars2.githubusercontent.com/u/37842853?v=4"}
          />
        </MenuButton>
        <MenuList
          zIndex={5}
          border="2px solid"
          borderColor={useColorModeValue("gray.700", "gray.100")}
          boxShadow="4px 4px 0"
        >
          <NavLink
            to={`/profile/${user._id}`}
            _hover={{ textDecoration: "none" }}
            isExternal
          >
            <MenuItem>
              <VStack justifyContent="start" alignItems="left">
                <Text fontWeight="500">{user.username}</Text>
                <Text size="sm" color="gray.500" mt="0 !important">
                  {user.email}
                </Text>
              </VStack>
            </MenuItem>
          </NavLink>
          <MenuDivider />
          <MenuItem>
            <Text fontWeight="500">Dashboard</Text>
          </MenuItem>
          <MenuItem>
            <Text fontWeight="500">Create Post</Text>
          </MenuItem>
          <MenuItem>
            <Text fontWeight="500">Reading List</Text>
          </MenuItem>
          <MenuItem>
            <Text fontWeight="500">Settings</Text>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <Text fontWeight="500">Sign Out</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default AvatarUser;
