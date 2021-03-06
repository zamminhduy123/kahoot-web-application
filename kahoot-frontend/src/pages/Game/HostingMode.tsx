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
import React from "react";
import { Children, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Socket from "../../api/socket";
import { useAppDispatch, useAppSelector } from "../../hook";
import { IQuestion } from "../../model/interface";
import { newPlayerJoin, playerLeave, setPlayerLists } from "../../model/reducers/game.reducer";
import Leaderboards from "./Leaderboards";
import ViewQuestionPage from "./ViewQuestionPage/ViewQuestionPage";
import WaitingRoom from "./WaitingRoom";


const HostingMode = (props: any) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const {title,ownerName,players,totalQuestions,pin,image} = useAppSelector((state) => state.game)
  console.log(image);
  
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    Socket.getInstance().registerListener(
      "updatePlayerLobby",
      (newPlayer: any) => {
        dispatch(
          newPlayerJoin(
            {name: newPlayer.name,
            score: newPlayer.score}
          )
        );
      }
    );
    Socket.getInstance().registerListener(
      "playerLeave",
      (player: any) => {
        dispatch(
          playerLeave(
            player.name
          )
        );
      }
    );
    Socket.getInstance().registerListener(
      "gameStarted",
      () => {
        setIsPlaying(true)
      }
    );
    return () => {
      Socket.getInstance().removeRegisteredListener("updatePlayerLobby");
      Socket.getInstance().removeRegisteredListener("playerLeave");
      Socket.getInstance().removeRegisteredListener("gameStarted");
    }

  }, []);
  return (
    <Container
      bg="black"
      minWidth="100%"
      minHeight="100vh"
      py="6"
      centerContent
    >
      {isPlaying ? (
        <ViewQuestionPage />
      ) : (
        <WaitingRoom title={title} ownerName={ownerName} totalQuestions={totalQuestions} players={players} gamePin ={pin} image={image}/>
      )}
    </Container>
  );
};

export default HostingMode;
