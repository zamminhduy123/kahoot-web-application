/** @format */

import {
  Box,
  Circle,
  Square,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  useBoolean,
  Center,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import Socket from "../../../../api/socket";
import { useAppSelector } from "../../../../hook";
import PlayerWaitingRoom from "./PlayerWaitingRoom";

const PlayingMode = (props: any) => {
  const [isPlaying, setIsPlaying] = useBoolean(false);

  const { pin } = useAppSelector((state) => state.play);

  React.useEffect(() => {
    Socket.getInstance().registerListener("gameStarted", () => {
      console.log("lam loz");
    });
    return () => Socket.getInstance().removeRegisteredListener("gameStarted");
  }, []);
  return (
    <Box bg="orange.800" minWidth="100vw" minHeight="100vh">
      <Circle
        position="fixed"
        bg="white"
        opacity="0.1"
        minWidth="75vmin"
        minHeight="75vmin"
        top="-40"
        left="-40"
      />
      <Square
        position="fixed"
        bg="white"
        opacity="0.1"
        minWidth="75vmin"
        minHeight="75vmin"
        bottom="-40"
        right="-40"
      />
      <Container
        minWidth="100%"
        minH={"100vh"}
        py="6"
        centerContent
        position={"relative"}
      >
        <Box
          position={"absolute"}
          fontSize={"3xl"}
          color="#Fff"
          fontWeight={600}
          alignSelf="start"
          width={"100%"}
          textAlign="center"
        >
          {`PINCODE: ${pin}`}
        </Box>
        <Flex w={"100%"} minH="100vh" direction="column" justify="center">
          {isPlaying ? null : <PlayerWaitingRoom />}
        </Flex>
      </Container>
    </Box>
  );
};

export default PlayingMode;
