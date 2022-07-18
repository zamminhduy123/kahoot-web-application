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

interface PlayerWaitingRoomProps {}

const PlayerWaitingRoom: FunctionComponent<PlayerWaitingRoomProps> = () => {
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
        color="orange.800"
        emptyColor="gray.200"
        size="xl"
      />
      <Box fontSize={"3xl"} color="#Fff" fontWeight={600}>
        You are in!
      </Box>
      <Box fontSize={"2xl"} color="#Fff">
        Waiting for game to start!
      </Box>
    </Flex>
  );
};

export default PlayerWaitingRoom;
