import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  HStack,
  Icon,
  Spacer,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { RiPencilFill, RiMore2Fill } from "react-icons/ri";

interface LibraryItemProps {
  name: string;
  totalQuestion: number;
  last_modified: Date;
}

const LibraryItem = ({
  name,
  totalQuestion,
  last_modified,
}: LibraryItemProps) => {
  return (
    <Flex
      w="100%"
      direction={"row"}
      maxW="1280px"
      width={"1280px"}
      borderRadius={"4px"}
      boxShadow={"rgb(0 0 0 / 15%) 0px 2px 4px 0px"}
      margin={"5px 0px"}
      padding={"4px"}
      transition={"all .2s ease-in-out"}
      _hover={{
        cursor: "pointer",
        transform: "scale(1.01)"
      }}
    >
      <Flex margin={"0px 10px"}>
        <Checkbox />
      </Flex>
      <Flex w="170px" marginRight={"5px"}>
        <img
          style={{ width: "170px" }}
          src="https://assets-cdn.kahoot.it/builder/v2/assets/placeholder-cover-kahoot.dca23b0a.png"
        />
      </Flex>
      <Flex grow={"1"} direction={"column"}>
        <Flex
          width={"100%"}
          alignSelf={"flex-start"}
          align="center"
          direction={"row"}
          minH={'52px'}
        >
          <Center><Box margin={"16px"} fontWeight={"bold"}>{name}</Box></Center>
         
          <Spacer />
          <HStack>
            <Icon _hover={{color: "brand.600", cursor: "pointer"}} boxSize={6} as={RiPencilFill}></Icon>
            <Icon _hover={{color: "brand.600", cursor: "pointer"}} boxSize={6} as={RiMore2Fill}></Icon>
          </HStack>
        </Flex>
        <Spacer />
        <Flex alignSelf={"flex-end"} minH={'40px'}>
          <HStack>
            <Box fontWeight={"600"}>Last update from {last_modified.toLocaleDateString()}</Box>
            <Button
              bg={"brand.600"}
              color={"white"}
              _hover={{ backgroundColor: "brand.900" }}
            >
              Start
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LibraryItem;
