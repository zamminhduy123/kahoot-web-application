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
    <Container
      bg="black"
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
        width={'100%'}
        textAlign='center'
      >
        {`PINCODE: ${pin}`}
      </Box>
      <Flex w={"100%"} minH="100vh" direction="column" justify="center">
        {isPlaying ? null : <PlayerWaitingRoom />}
      </Flex>
    </Container>
  );
};

export default PlayingMode;
