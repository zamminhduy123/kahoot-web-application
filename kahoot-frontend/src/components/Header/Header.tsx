/** @format */

import {
  Box,
  Flex,
  Stack,
  Link,
  useColorModeValue,
  useDisclosure,
  Image,
  Spacer,
  Center,
  Button,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { Link as ReachLink, useLocation, useNavigate } from "react-router-dom";
import RightSideDrawer from "./RightSideDrawer";
import { IUser } from "../../model/interface/user.model";
import {
  RiAddCircleLine,
  RiGamepadLine,
  RiHome4Line,
  RiListUnordered,
} from "react-icons/ri";
import logo from "../../assets/logo.png";

import "./Header.scss";
import { IconType } from "react-icons";
import { Dispatch, SetStateAction } from "react";

interface DesktopNavProps {
  activePath: string;
}

const DesktopNav = ({ activePath }: DesktopNavProps) => {
  const linkColor = useColorModeValue("gray.900", "brand.200");
  const linkHoverColor = useColorModeValue("brand.600", "white");
  return (
    <Stack direction={"row"} h="100%">
      {NAV_ITEMS.map((navItem) => {
        const className = [
          "nav-item-link",
          activePath == navItem.href && "selected",
        ].join(" ");
        return (
          <Box className={className} key={navItem.label}>
            <Flex h="100%" alignItems="center">
              {navItem.icon && <Icon h="100%" w="25%" as={navItem.icon} />}
              <Link
                as={ReachLink}
                px={2}
                fontSize={"sm"}
                fontWeight={"semibold"}
                color={linkColor}
                style={{ textDecoration: "none" }}
                to={navItem.href ?? "#"}
              >
                {navItem.label}
              </Link>
            </Flex>
          </Box>
        );
      })}
    </Stack>
  );
};

interface NavItem {
  label: string;
  icon?: IconType;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    icon: RiHome4Line,
    href: "/",
  },
  {
    label: "Library",
    icon: RiListUnordered,
    href: "/my-library",
  },
];

export interface PublicHeaderProps {
  user: IUser | null;
}

const Header = (props: PublicHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;
  return (
    <Box
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.600", "white")}
      zIndex={100}
      position="relative"
    >
      <Stack>
        <Flex
          w="100%"
          minH="60px"
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
        >
          <Link href="/">
            <Center h="100%">
              <Image w="100px" p="4" src={logo} />
            </Center>
          </Link>
          <Flex justifyContent="center" alignItems="center" ml={10}>
            <DesktopNav activePath={activePath} />
          </Flex>
          <Spacer />

          <Center marginRight="10px">
            <HStack>
              <Button
                w="120px"
                variant="solid"
                colorScheme="green"
                fontSize={"m"}
                fontWeight={"bold"}
                onClick={() => {
                  navigate("/join");
                }}
                rightIcon={<Icon as={RiGamepadLine} />}
              >
                Play
              </Button>
              <Button
                w="120px"
                variant="solid"
                colorScheme="brand"
                fontSize={"m"}
                fontWeight={"bold"}
                onClick={() => {
                  navigate("/creator");
                }}
                rightIcon={<Icon as={RiAddCircleLine} />}
              >
                Create
              </Button>
            </HStack>
            <RightSideDrawer user={props.user} />
          </Center>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Header;
