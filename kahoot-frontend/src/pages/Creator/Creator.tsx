import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { IQuestion } from "../../model/interface";
import Header from "./Header";
import MainDisplay from "./MainDisplay";
import NewQuestionList from "./NewQuestionList";
import QuestionInformation from "./QuestionInformation";

const Creator = () => {
  let data: IQuestion[] = [
    {
      id: "1",
      question:
        "Surveys help gather information about groups of people. How many surveys does the U.S. Census Bureau conduct each year?",
      time: "20",
      multipleChoice: {},
      answer: 1,
    },
    {
      id: "1",
      question:
        "Surveys help gather information about groups of people. How many surveys does the U.S. Census Bureau conduct each year?",
      time: "20",
      multipleChoice: {},
      answer: 1,
    },
    {
      id: "1",
      question:
        "Surveys help gather information about groups of people. How many surveys does the U.S. Census Bureau conduct each year?",
      time: "20",
      multipleChoice: {},
      answer: 1,
    },
    {
      id: "1",
      question:
        "Surveys help gather information about groups of people. How many surveys does the U.S. Census Bureau conduct each year?",
      time: "20",
      multipleChoice: {},
      answer: 1,
    },
    {
      id: "1",
      question:
        "Surveys help gather information about groups of people. How many surveys does the U.S. Census Bureau conduct each year?",
      time: "20",
      multipleChoice: {},
      answer: 1,
    },
    {
      id: "1",
      question:
        "Surveys help gather information about groups of people. How many surveys does the U.S. Census Bureau conduct each year?",
      time: "20",
      multipleChoice: {},
      answer: 1,
    },
    {
      id: "1",
      question:
        "Surveys help gather information about groups of people. How many surveys does the U.S. Census Bureau conduct each year?",
      time: "20",
      multipleChoice: {},
      answer: 1,
    },
    {
      id: "1",
      question:
        "Surveys help gather information about groups of people. How many surveys does the U.S. Census Bureau conduct each year?",
      time: "20",
      multipleChoice: {},
      answer: 1,
    },
  ];
  return (
    <Flex w={"100%"} style={{maxHeight:'100vh'}} direction={"column"}>
      <Header />
      <Flex direction={"row"} width={"100%"} flex={1} minHeight="0px">
        <Flex direction={"column"} flex={"0 192px"} minH='0'>
          <NewQuestionList list={data} />
        </Flex>
        <Box flexGrow={"1"} h="100%" backgroundColor={"white"}>
          <MainDisplay question={undefined} />
        </Box>
        <Flex
          width={"fit-content"}
          padding="16px"
          direction={"column"}
          boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
        >
          <QuestionInformation />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Creator;
