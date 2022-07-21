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
import React from "react";
import { FunctionComponent, useState } from "react";
import { IQuestion } from "../../../../model/interface/question.model";
import AnswerList from "../AnswerList";

interface ReadyStateProps {
  message: string;
  time?: number;
}

const ReadyState: FunctionComponent<ReadyStateProps> = ({
  message,
  time,
}: ReadyStateProps) => {
  const [countDown, setCountDown] = useState(time);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (countDown && countDown > 0) {
      timeout = setTimeout(() => {
        if (time) setCountDown((prev) => prev! - 1);
      }, 1000);
    }
  }, [countDown]);
  return (
    <Flex
      minW={"100%"}
      minH="100%"
      direction={"column"}
      justify={"center"}
      align="center"
    >
      {time ? (
        <Box fontWeight={900} fontSize='5xl' color='white'>{countDown}</Box>
      ) : (
        <Spinner
          thickness="8px"
          speed="1.5s"
          color="#FFf"
          emptyColor="gray.500"
          size="xl"
        />
      )}
      <Box fontSize={"2xl"} color="#Fff">
        {message}
      </Box>
    </Flex>
  );
};

export default ReadyState;
