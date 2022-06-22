import { Box, Button, Center, Flex, Icon, VStack } from "@chakra-ui/react";
import React from "react";
import { IQuestion } from "../../model/interface";
import Header from "./Header";
import {
  RiTimerLine,
  RiDeleteBinLine,
  RiCheckboxMultipleBlankLine,
} from "react-icons/ri";
import { useAppDispatch } from "../../hook";
import { addNewQuestion, deleteQuestionAtIndex, dublicateQuestionAtIndex } from "../../model/reducers/newQuiz.reducer";

interface NewQuestionListProps {
  list: IQuestion[];
}

const NewQuestionList = ({ list }: NewQuestionListProps) => {
  const dispatch = useAppDispatch();
  const deleteCheck = (index: number) => {
    if (list.length <= 1) {

    } else {
      dispatch(deleteQuestionAtIndex(index))
    }
  }
  return (
    <>
      <Flex minHeight={"0"} direction={"column"} overflowY="auto" flex={1}>
        {list.map((question, index) => {
          return (
            <Box
              key={question.id}
              padding={"12px 16px 12px 0px"}
              w="100%"
              margin="0px 0px 10px 0px"
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
                <Box
                  w="26px"
                  paddingRight="0.125rem"
                  textAlign={"right"}
                  alignSelf="flex-end"
                  marginBottom={"4px"}
                >
                  <VStack>
                  <Center
                      onClick={() => dispatch(dublicateQuestionAtIndex(index))}
                      style={{
                        width: "24px",
                        height: "24px",
                        marginTop: "8px",
                        padding: "2px",
                      }}
                      _hover={{
                        backgroundColor: "gray.200",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    >
                      <Icon
                        style={{ margin: "8px" }}
                        as={RiCheckboxMultipleBlankLine}
                      ></Icon>
                    </Center>
                    <Center
                      onClick={() => deleteCheck(index)}
                      style={{
                        width: "24px",
                        height: "24px",
                        marginTop: "8px",
                        padding: "2px",
                      }}
                      _hover={{
                        backgroundColor: "gray.200",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    >
                      <Icon
                        style={{ margin: "8px" }}
                        as={RiDeleteBinLine}
                      ></Icon>
                    </Center>
                  </VStack>
                </Box>
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
          <Button onClick={() => dispatch(addNewQuestion())}>
            Add Question
          </Button>
        </Box>
      </Center>
    </>
  );
};

export default NewQuestionList;
