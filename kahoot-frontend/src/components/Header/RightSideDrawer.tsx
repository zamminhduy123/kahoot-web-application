/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  VStack,
  Center,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RiUser3Line, RiUserSharedLine } from "react-icons/ri";
// import { logOut } from 'services/auth-service';
import { BiArrowBack } from "react-icons/bi";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { IUser } from "../../model/interface/user.model";


const LogOutAction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const history = useNavigate();

  return (
    <>
      <Button
        mt={6}
        w="full"
        onClick={onOpen}
        colorScheme="red"
        variant="outline"
        rightIcon={<RiUserSharedLine color="#c53030" size="18px" />}
      >
        Logout
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Are you sure you want to leave?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogFooter>
            <Button ref={cancelRef.current} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={() => {
              window.localStorage.clear();
              history('/login')
            }}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const RightSideDrawer = ({ user }: { user: IUser | null }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const toResetPassword = () => {
    onClose();
    // history.push(`${PUBLIC_ROUTES.RESET_PASSWORD}?email=${encodeURIComponent(user?.email || '')}`);
  };

  return (
    <>
      <Flex align="center" justifyContent="flex-end">
        <Button variant="unstyled" onClick={onOpen}>
          <Flex h="100%" align="center">
            <Avatar
              ml="4"
              size="md"
              name={user?.name}
              cursor="pointer"
              icon={<RiUser3Line size="20px" />}
              background="active"
              color="semiHeading"
            />
            <VStack ml="4" spacing="0px" align="flex-start">
              <Text fontWeight="bold" fontSize="sm" textAlign="left">
                Hi, {user?.name}!
              </Text>
              <Text textAlign="left" fontSize="xs">
                {user?.email}
              </Text>
            </VStack>
          </Flex>
        </Button>
      </Flex>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody pt={12} position="relative">
            <Flex
              direction="column"
              overflowY="auto"
              position="absolute"
              top={0}
              bottom={0}
              right={0}
              left={0}
              p={4}
            >
              <Flex align="flex-start" mb={4}>
                <IconButton
                  aria-label="arrow back"
                  icon={<Icon as={BiArrowBack} boxSize={8} color="main" />}
                  variant="unstyled"
                  onClick={onClose}
                />
              </Flex>
              <Box flex={1} textAlign="center">
                <Center>
                  <Avatar
                    size="2xl"
                    name={user?.name}
                    cursor="pointer"
                    icon={<RiUser3Line size="20px" />}
                    background="active"
                    color="semiHeading"
                  />
                </Center>
                <Box
                  mt={2}
                  fontFamily="heading"
                  fontSize="2xl"
                  color="semiHeading"
                >
                  {user?.name}
                </Box>
                <Box>{user?.email}</Box>

                <VStack align="stretch" mt={6} spacing={4}>
                  {/* <Button
                    onClick={() => toResetPassword()}
                    rightIcon={<Icon as={ArrowForwardIcon} />}
                  >
                    Change Password
                  </Button> */}
                </VStack>
              </Box>
              <LogOutAction />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RightSideDrawer;
