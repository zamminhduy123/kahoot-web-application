import { Box, Button, Center, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { IQuestion } from "../../model/interface";
import Header from "./Header";
import { RiTimerLine } from "react-icons/ri";

interface NewQuestionListProps {
  list: IQuestion[];
}

const NewQuestionList = ({ list }: NewQuestionListProps) => {
  return (
    <>
      <Flex
        minHeight={"0"}
        direction={"column"}
        padding={"8px"}
        overflowY="auto"
        flex={1}
      >
        {list.map((question, index) => {
          return (
            <Box
              padding={"12px 16px 12px 0px"}
              w="100%"
              margin="0px 0px 10px 0px"
              transition={"background-color 0.3s ease-in-out"}
              _hover={{
                backgroundColor: "rgb(234, 244, 252)",
              }}
            >
              <Flex
                fontSize={"12px"}
                color={"gray.500"}
                fontWeight="600"
                height={"24px"}
              >
                <Box marginLeft={"4px"} w="20px" textAlign={"right"}>
                  {index + 1}
                </Box>
                <Box marginLeft={"4px"}>Quiz</Box>
              </Flex>
              <Flex w={"100%"}>
                <Box w="26px" paddingRight="0.125rem" textAlign={"right"}></Box>
                <Center
                  borderRadius={"4px"}
                  flexGrow={1}
                  backgroundColor={"brand.300"}
                  p="4px"
                  h="93px"
                >
                  <Icon as={RiTimerLine}></Icon>
                  {question.time}
                </Center>
              </Flex>
            </Box>
          );
        })}
      </Flex>
      <Center flex={0} margin={"4px"}>
        <Box margin="10px 0px">
          <Button>Add Question</Button>
        </Box>
      </Center>
    </>
  );
};

export default NewQuestionList;
