/** @format */

import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import { FunctionComponent, useState } from "react";
import Socket from "../../../../api/socket";
import { IPlayer } from "../../../../model/interface/player.model";
import {
  IMultipleChoice,
  IQuestion,
} from "../../../../model/interface/question.model";
import AnswerList from "../AnswerList";
import AnswerResult from "./AnswerResult";
import GameResult from "./GameResult";
import ReadyState from "./ReadyState";

interface ViewQuestionPageProps {}

interface IPlayerState {
  points: number;
  rank: number;
}

const PlayerGamePage: FunctionComponent<ViewQuestionPageProps> = () => {
  const [answers, setAnswers] = useState<IMultipleChoice | null>(null);

  const [playerState, setPlayerState] = useState<IPlayerState>({
    points: 0,
    rank: -1,
  });
  
  const [frontPlayerState,setFrontPlayerState] = React.useState<any>({
    name: '',
    points: -1,
  })
  const lastAnswer = useRef<number>(0);
  const [right, setRight] = useState<boolean>(false);

  /**
   * 0: selecting
   * 1: waiting for other player
   * 2: view result
   * 3: game over
   */
  const [phase, setPhase] = useState<number>(0);

  const handleTimeOut = () => {
    // setPhase(false);
  };

  const handleNext = () => {};

  const handleClick = (num: number) => {
    setPhase(1);
    lastAnswer.current = num;
    Socket.getInstance().emit("player-answer", { num });
  };

  React.useEffect(() => {
    console.log("hi");
  }, [phase]);

  React.useEffect(() => {
    Socket.getInstance().registerListener(
      "question",
      ({ question, answers }: any) => {
        lastAnswer.current = -1;
        setPhase(0);
        setAnswers(answers);
      }
    );

    Socket.getInstance().registerListener(
      "questionOver",
      ({ playerData, correctAnswer }: any) => {
        const playerIndex = playerData.findIndex(
          (data: any) => data.playerId === Socket.getInstance().getId()
        );
        setRight(+correctAnswer === +lastAnswer.current);
        setPlayerState({
          points: playerData[playerIndex].gameData.score,
          rank: playerIndex + 1,
        });
        if (playerIndex >0) {
          setFrontPlayerState({
            points: playerData[playerIndex-1].gameData.score,
            name: playerData[playerIndex-1].name,
          });
        }
        setPhase(2);
      }
    );

    Socket.getInstance().registerListener(
      "gameOver",
      ({ playerData }: any) => {
        setPhase(3);
        const playerIndex = playerData.findIndex(
          (data: any) => data.playerId === Socket.getInstance().getId()
        );
        setPlayerState({
          points: Number(playerData[playerIndex].gameData.score),
          rank: playerIndex + 1,
        });
        if (playerIndex >0) {
          setFrontPlayerState({
            points: playerData[playerIndex-1].gameData.score,
            name: playerData[playerIndex-1].name,
          });
        }
      }
    );

    return () => Socket.getInstance().removeRegisteredListener("question");
  }, []);

  let component;
  switch (phase) {
    case 0:
      if (answers)
        component = (
          <>
            <AnswerList
              answers={answers}
              correct={-1}
              handleClick={handleClick}
              isPlaying={phase === 0}
              displayAnswer={false}
            />
          </>
        );
      break;
    case 1:
      component = <ReadyState message="Waiting for other player!" />;
      break;
    case 2:
      component = (
        <AnswerResult
          points={playerState.points}
          right={right}
          rank={playerState.rank}
          behindName={frontPlayerState.points}
          behindPoint={frontPlayerState.points}
        />
      );
      break;
    case 3:
      component = (
        <GameResult score={playerState.points} rank={playerState.rank} behindScore={frontPlayerState.points} behindName={frontPlayerState.rank} />
      )
      break;
  }
  return <>{answers ? component : <ReadyState message="Get Ready!" />}</>;
};

export default PlayerGamePage;
