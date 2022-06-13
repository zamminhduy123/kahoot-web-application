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
import { IQuestion } from "../../model/interface";

const QuestionItem = (props: IQuestion) => {
  return (
    <Flex
      w="100%"
      direction={"column"}
      borderRadius={"4px"}
      bg="white"
      boxShadow={"rgb(0 0 0 / 15%) 0px 2px 4px 0px"}
      margin={"5px 0px"}
      padding={"4px"}
      transition={"all .2s ease-in-out"}
      _hover={{
        cursor: "pointer",
        transform: "scale(1.01)",
      }}
    >
      <Flex direction={"row"}>
        <Flex grow={"1"} direction={"column"}>
          <Flex
            width={"100%"}
            alignSelf={"flex-start"}
            align="center"
            direction={"row"}
            minH={"52px"}
          >
            <Center>
              <Box margin={"16px"} fontWeight={"bold"}>
                {props.question}
              </Box>
            </Center>
          </Flex>
          <Spacer />
          <Flex
            width={"100%"}
            alignSelf={"flex-start"}
            align="center"
            direction={"row"}
            minH={"52px"}
          >
            <Center>
              <Box margin={"16px"} fontWeight={"bold"}>
                time: {new Date(props.time).getSeconds()}
              </Box>
            </Center>
          </Flex>
        </Flex>
        <Flex w="170px" marginRight={"5px"}>
          <img
            style={{ width: "170px" }}
            src="https://assets-cdn.kahoot.it/builder/v2/assets/placeholder-cover-kahoot.dca23b0a.png"
          />
        </Flex>
      </Flex>
      <Flex h={"30"} direction={'row'} flex='1' padding="16px">
        <Flex  flex='1'>A</Flex>
        <Flex  flex='1'>B</Flex>
      </Flex>
      <Flex h={"30"} direction={'row'} flex='1' padding="16px">
        <Flex  flex='1'>C</Flex>
        <Flex  flex='1'>D</Flex>
      </Flex>
    </Flex>
  );
};

export default QuestionItem;
