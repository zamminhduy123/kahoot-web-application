import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import { IQuestion } from "../../model/interface";
import QuestionItem from "../QuestionItem";
interface QuestionListProps {}

const QuestionList = ({}: QuestionListProps) => {
  const fakeQuestions: IQuestion[] = [
    {
      id: "123",
      question: "Whajt asdjasd asd asd",
      multipleChoice: {},
      answer: 0,
      time: new Date().toLocaleDateString(),
    },
    {
      id: "123",
      question: "Whajt asdjasd asd asd",
      multipleChoice: {},
      answer: 0,
      time: new Date().toLocaleDateString(),
    },
    {
      id: "123",
      question: "Whajt asdjasd asd asd",
      multipleChoice: {},
      answer: 0,
      time: new Date().toLocaleDateString(),
    },
    {
      id: "123",
      question: "Whajt asdjasd asd asd",
      multipleChoice: {},
      answer: 0,
      time: new Date().toLocaleDateString(),
    },
    {
      id: "123",
      question: "Whajt asdjasd asd asd",
      multipleChoice: {},
      answer: 0,
      time: new Date().toLocaleDateString(),
    },
  ];
  return (
    <Flex direction={"column"} w={"100%"} h="100%">
      <Flex direction={"row"} margin="4px 0px" align={"center"}>
        <Box fontWeight={"600"} fontSize="16px">
          Question ({fakeQuestions.length})
        </Box>
      </Flex>
      <Flex flexGrow={"1"} direction="column" padding={"8px 8px"}>
        <Box maxH="100%" minH={"200px"} overflowX="hidden" overflowY={"auto"}>
          {fakeQuestions.map((q, id) => {
            return <QuestionItem key={"q.id" + id} {...q} />;
          })}
        </Box>
      </Flex>
      <Box h="1px"></Box>
    </Flex>
  );
};

export default QuestionList;
