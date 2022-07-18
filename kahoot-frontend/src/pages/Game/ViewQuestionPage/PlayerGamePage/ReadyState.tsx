/** @format */

import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Heading,
  Spinner,
  Square,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { IQuestion } from "../../../../model/interface/question.model";
import AnswerList from "../AnswerList";

interface ReadyStateProps {
  message: string;
}

const ReadyState: FunctionComponent<ReadyStateProps> = ({
  message,
}: ReadyStateProps) => {
  return (
    <Flex
      minW={"100%"}
      minH="100%"
      direction={"column"}
      justify={"center"}
      align="center"
    >
      <Spinner
        thickness="8px"
        speed="1.5s"
        color="#FFf"
        emptyColor="gray.500"
        size="xl"
      />
      <Box fontSize={"2xl"} color="#Fff">
        {message}
      </Box>
    </Flex>
  );
};

export default ReadyState;
