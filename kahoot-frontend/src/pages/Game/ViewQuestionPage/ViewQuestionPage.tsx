import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FunctionComponent, useState } from "react";
import Socket from "../../../api/socket";
import { IQuestion } from "../../../model/interface/question.model";
import AnswerList from "./AnswerList";
import ReadyState from "./PlayerGamePage/ReadyState";

interface ViewQuestionPageProps {}

const ViewQuestionPage: FunctionComponent<ViewQuestionPageProps> = () => {
  let data: any[] = [
    {
      id: "1",
      question:
        "Surveys help gather information about groups of people. How many surveys does the U.S. Census Bureau conduct each year?",
      time: "20",
      multipleChoice: "yes",
      answer: 1,
      answers: [
        "this is not the correct answer",
        "this is the correct answer",
        "answer 3 very longg dummy omg",
        "answer 4 very longg dummy omg",
      ],
    },
    {
      id: "1",
      question: "Next question",
      time: "20",
      multipleChoice: "yes",
      answer: 2,
      answers: [
        "this is not the correct answer",
        "this is not the correct answer",
        "this is the correct answer",
        "answer 4 very longg dummy omg",
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const [timeLeft, setTimeLeft] = React.useState(0);

  const [answered, setAnswered] = React.useState(0);

  const handleTimeOut = () => {};

  const handleNext = () => {};

  const handleClick = (num: number) => {};
  const [currentQuestion, setCurrentQuestion] =
    React.useState<IQuestion | null>(null);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    Socket.getInstance().registerListener(
      "question",
      ({ question, answers, timeUp }: any) => {
        setCurrentQuestion({
          id: "",
          question: question,
          multipleChoice: answers,
          answer: -1,
          time: timeUp,
        });
        setTimeLeft(20);
      }
    );
    Socket.getInstance().registerListener(
      "updatePlayersAnswered",
      ({ playersInGame, playersAnswered }: any) => {
        setAnswered(playersAnswered);
      }
    );
    return () => {
      clearInterval(interval);
      Socket.getInstance().removeRegisteredListener("question");
      Socket.getInstance().removeRegisteredListener("updatePlayersAnswered");
    };
  }, []);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (timeLeft > 0) {
      timeout = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [timeLeft]);
  return (
    <>
      {currentQuestion ? (
        <>
          <Box bg="white" w="100%" boxShadow="base">
            <Heading size="lg" color="black" mx="4" my="8" textAlign="center">
              {currentQuestion.question}
            </Heading>
          </Box>
          <Box width={"100%"}>
            <Flex mt={1} position="relative">
              <Flex
                direction={"column"}
                width={"100%"}
                alignItems="center"
                justify={"center"}
              >
                <Heading size="lg" color="white" textAlign="center">
                  {timeLeft}
                </Heading>
                <Box color={"white"} margin="0">
                  Second
                </Box>
              </Flex>

              <img
                alt="background"
                width={"400px"}
                height="20px"
                src="https://images.ctfassets.net/hrltx12pl8hq/1fR5Y7KaK9puRmCDaIof7j/09e2b2b9eaf42d450aba695056793607/vector1.jpg"
              />

              <Flex
                direction={"column"}
                width={"100%"}
                alignItems="center"
                justify={"center"}
              >
                <Heading size="lg" color="white" textAlign="center">
                  {answered}
                </Heading>
                <Box color={"white"} margin="0">
                  Answered
                </Box>
              </Flex>
              <Button
                right={0}
                position="absolute"
                mt="4"
                minW="100px"
                onClick={handleNext}
              >
                Next
              </Button>
            </Flex>
          </Box>

          <AnswerList
            answers={currentQuestion.multipleChoice}
            correct={currentQuestion.answer}
            handleClick={void 0}
            isPlaying={isPlaying}
            displayAnswer
          />
        </>
      ) : (
        <Center w="100%" h="100vh">
          <ReadyState message="Get Ready!" />
        </Center>
      )}
    </>
  );
};

export default ViewQuestionPage;
