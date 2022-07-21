/** @format */

import { FunctionComponent } from "react";
import React, {  useEffect } from "react";
import QuizItem from "./QuizItem";
import {  Box, Badge,  Wrap, Button, Flex } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../hook";
import { IPlayer } from "../../model/interface/player.model";
import Socket from "../../api/socket";

interface WaitingRoomProps {
  title : string,
  ownerName: string,
  players: IPlayer[],
  totalQuestions: number,
  gamePin: string,
  image:string
}

const WaitingRoom: FunctionComponent<WaitingRoomProps> = (props) => {

  const startGame = () => {
    Socket.getInstance().emit(
      "game-start",{}
    )
  }
  const dispatch = useAppDispatch();
  const renderPlayers = () => {
    return (
      <>
        {props.players.map((person: any, index: number) => (
          <Box
            bg="blackAlpha.400"
            key={index}
            py="4"
            px="10"
            fontSize="2xl"
            fontWeight="bold"
            color="white"
          >
            {person.name}
          </Box>
        ))}
      </>
    );
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      maxW="lg"
      justifyContent="center"
      alignItems="center"
      minW={'100%'}
    >

      <Box
        display="flex"
        flexDirection="column"
        maxW="md"
        justifyContent="center"
        alignItems="center"
      >
        <QuizItem title={props.title} author={props.ownerName} image={props.image} totalQuestions={props.totalQuestions}></QuizItem>
        <Flex direction={'row'}>
        <Badge
          borderRadius="full"
          px="2"
          colorScheme="orange"
          fontSize="lg"
          my="4"
          textAlign="center"
          marginRight={'10px'}
          padding='10px 20px'
        >
          GAME PIN: {props.gamePin}
        </Badge>
        <Badge
        padding='10px 20px'
          borderRadius="full"
          px="2"
          colorScheme="orange"
          fontSize="lg"
          my="4"
          textAlign="center"
        >
          Questions: {props.totalQuestions}
        </Badge>
        </Flex>
        
      </Box>
      <Box
        w={"100%"}
        display="flex"
        flexDirection="row"
        maxW="md"
        justifyContent="center"
        alignItems="center"
      >
        <Box padding={"10px 20px"} bgColor="#FFF" borderRadius={'10px'} margin='0px 10px' fontWeight={600}>Players: {props.players.length}</Box>
        <Button onClick={()=>startGame()}>Start Game</Button>
      </Box>
      <Wrap width="100%" mt="8" spacing="8" justify="center">
        {renderPlayers()}
      </Wrap>
    </Box>
  );
};

export default WaitingRoom;
