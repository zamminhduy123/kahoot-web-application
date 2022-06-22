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
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { IUser } from "../../model/interface/user.model";
import { RiAddCircleLine, RiHome4Line, RiListUnordered } from "react-icons/ri";
import { IconType } from "react-icons";
import { Dispatch, SetStateAction } from "react";

export interface PublicHeaderProps {
  onSettingClick: Function;
  title: string;
}

const Header = ({ onSettingClick, title }: PublicHeaderProps) => {
  return (
    <Box
      flex={0}
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
              <Image
                w="100px"
                src="https://static.miraheze.org/freshwebsiteswiki/thumb/c/c9/Kahoot_Logo.png/1200px-Kahoot_Logo.png"
              />
            </Center>
          </Link>
          <Flex
            justifyContent="center"
            alignItems="center"
            ml={10}
            onClick={() => onSettingClick()}
          >
            <Flex
              padding={"5px 10px"}
              border="1px solid"
              borderColor={"gray.200"}
              borderRadius="4px"
            >
              <Box
                minW={"100px"}
                paddingTop={"4px"}
                fontWeight={"600"}
                _hover={{
                  cursor: "pointer",
                }}
                marginRight="10px"
              >
                {title || "Enter QuizShare title..."}
              </Box>
              <Button
                h="1.75rem"
                size="sm"
                fontWeight={"600"}
                color={"gray.700"}
                backgroundColor={"gray.200"}
                _hover={{
                  backgroundColor: "gray.200",
                }}
              >
                Settings
              </Button>
            </Flex>
          </Flex>
          <Spacer />

          <Center marginRight="10px">
            <HStack>
              <Button
                w="100px"
                variant="solid"
                color={"gray.700"}
                backgroundColor={"gray.200"}
                _hover={{
                  backgroundColor: "gray.300",
                }}
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={() => {}}
              >
                Exit
              </Button>
              <Button
                w="100px"
                variant="solid"
                colorScheme={"brand"}
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={() => {}}
              >
                Save
              </Button>
            </HStack>
          </Center>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Header;
