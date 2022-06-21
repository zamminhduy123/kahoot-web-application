import { Box, Divider, Flex, Heading, Icon, Select } from "@chakra-ui/react";
import React from "react";
import { RiQuestionnaireLine, RiTimerLine ,RiMedalLine} from "react-icons/ri";

const QuestionInformation = () => {
  return (
    <Flex direction={"column"} width={"256px"}>
      <Flex direction={"column"}>
        <Heading as="h5" size="sm" color="gray.700">
          <Icon marginRight={"5px"} as={RiQuestionnaireLine}></Icon>Question
          Type
        </Heading>
        <Select marginTop="10px"><option value="option1">Quiz</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option></Select>
        <Divider
          margin={"20px 0px"}
          justifySelf="center"
          orientation="horizontal"
        />
      </Flex>
      <Flex direction={"column"}>
        <Heading as="h5" size="sm" color="gray.700">
          <Icon marginRight={"5px"} as={RiTimerLine}></Icon>Time limit
        </Heading>
        <Select marginTop="10px">
          <option value="option1">20 seconds</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Flex>
      <Flex direction={"column"} marginTop='20px'>
        <Heading as="h5" size="sm" color="gray.700">
          <Icon marginRight={"5px"} as={RiMedalLine}></Icon>Points
        </Heading>
        <Select marginTop="10px">
          <option value="option1">100</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Flex>
    </Flex>
  );
};

export default QuestionInformation;
