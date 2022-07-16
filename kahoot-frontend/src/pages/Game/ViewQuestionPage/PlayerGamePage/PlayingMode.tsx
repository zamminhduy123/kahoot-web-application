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
  } from "@chakra-ui/react";
  import React from "react"
import Socket from "../../../../api/socket";
import PlayerWaitingRoom from "./PlayerWaitingRoom";

  const PlayingMode = (props: any) => {
    const [isPlaying, setIsPlaying] = useBoolean(false);

    React.useEffect(()=>{
      Socket.getInstance().registerListener("gameStarted", () => {
        console.log(
        "lam loz"
        )
      })
      return () => Socket.getInstance().removeRegisteredListener("gameStarted")
    },[])
    return (
      <Container
        bg="black"
        minWidth="100%"
        minH={'100%'}
        py="6"
        centerContent
      >
        {isPlaying ? (null
        ) : (
          <PlayerWaitingRoom />
        )}
      </Container>
    );
  };
  
  export default PlayingMode;
  