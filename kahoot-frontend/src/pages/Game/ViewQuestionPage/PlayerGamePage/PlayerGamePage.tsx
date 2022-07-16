/** @format */

import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { FunctionComponent, useState } from "react";
import Socket from "../../../../api/socket";
import {
  IMultipleChoice,
  IQuestion,
} from "../../../../model/interface/question.model";
import AnswerList from "../AnswerList";
import ReadyState from "./ReadyState";

interface ViewQuestionPageProps {}

const PlayerGamePage: FunctionComponent<ViewQuestionPageProps> = () => {
  const [answers, setAnswers] = useState<IMultipleChoice | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const handleTimeOut = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    
  };

  const handleClick = () => {
    
  };

  React.useEffect(() => {
    Socket.getInstance().registerListener(
      "question",
      ({ question, answers }: any) => {
        console.log(answers)
        setAnswers(answers);
      }
    );

    return () => Socket.getInstance().removeRegisteredListener('question')
  }, []);
  return (
    <>
      {answers ? (
        <AnswerList
          answers={answers}
          correct={-1}
          handleClick={handleClick}
          isPlaying={isPlaying}
        />
      ) : (
        <ReadyState />
      )}
    </>
  );
};

export default PlayerGamePage;
