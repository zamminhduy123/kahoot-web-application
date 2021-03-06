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
import { Link } from "react-router-dom";
import Socket from "../../../api/socket";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { IQuestion } from "../../../model/interface/question.model";
import { setPlayerLists } from "../../../model/reducers/game.reducer";
import Leaderboards from "../Leaderboards";
import AnswerList from "./AnswerList";
import CurrentResult from "./CurrentResult";
import ReadyState from "./PlayerGamePage/ReadyState";
import PlayerList from "./PlayerList";

interface ViewQuestionPageProps {}

const ViewQuestionPage: FunctionComponent<ViewQuestionPageProps> = () => {

  const dispatch = useAppDispatch();

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const [timeLeft, setTimeLeft] = React.useState(0);

  const [answered, setAnswered] = React.useState(0);
  const [correctAnswer, setCorrectAnswer] = React.useState(-1);

  const handleTimeOut = () => {};

  const handleNext = () => {
    Socket.getInstance().emit("next-question", {});
  };

  const handleClick = (num: number) => {};
  const [currentQuestion, setCurrentQuestion] =
    React.useState<IQuestion | null>(null);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    Socket.getInstance().registerListener(
      "question",
      ({ question, answers, timeUp ,image}: any) => {
        setCorrectAnswer(-1);
        setIsPlaying(true);
        setCurrentQuestion({
          id: "",
          question: question,
          multipleChoice: answers,
          answer: -1,
          time: timeUp,
          image: image || ""
        });
        console.log(image);
        setTimeLeft(timeUp);
      }
    );
    Socket.getInstance().registerListener(
      "updatePlayersAnswered",
      ({ playersInGame, playersAnswered }: any) => {
        setAnswered(playersAnswered);
      }
    );

    Socket.getInstance().registerListener("gameOver", ({ playerData }: any) => {
      console.log("playerData", playerData);
      setIsPlaying(false);
      setGameOver(true);
      dispatch(
        setPlayerLists(
          playerData.map((player: any) => {
            return {
              name: player.name,
              score: player.gameData.score,
            };
          })
        )
      );
    });

    Socket.getInstance().registerListener(
      "questionOver",
      ({ playerData, correctAnswer }: any) => {
        if (!gameOver) {
          setIsPlaying(false);
          dispatch(
            setPlayerLists(
              playerData.map((player: any) => {
                return {
                  name: player.name,
                  score: player.gameData.score,
                };
              })
            )
          );
          console.log(playerData, correctAnswer);
          setCorrectAnswer(correctAnswer);
        }
      }
    );
    return () => {
      clearInterval(interval);
      Socket.getInstance().removeRegisteredListener("question");
      Socket.getInstance().removeRegisteredListener("questionOver");
      Socket.getInstance().removeRegisteredListener("updatePlayersAnswered");
    };
  }, []);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (timeLeft > 0) {
      timeout = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      if (!gameOver) Socket.getInstance().emit("time-up", {});
    }
    return () => clearTimeout(timeout);
  }, [timeLeft]);

  const { players } = useAppSelector((state) => state.game);

  return (
    <Box h="100vh" w="100%">
      {gameOver ? (
        <Flex
          w={"100%"}
          h="100%"
          justifyContent={"center"}
          align="center"
          direction={"column"}
        >
          <Box
            fontSize={"3xl"}
            fontWeight="600"
            color="white"
            width={"100%"}
            textAlign="center"
          >
            GAME OVER
          </Box>
          <Link to="/login">
            <Button position={'absolute'} right='50' width={'100px'} onClick={()=>{Socket.remove()}}>Back</Button>
          </Link>

          <Leaderboards users={players}></Leaderboards>
        </Flex>
      ) : currentQuestion ? (
        <Flex
          h="100%"
          w="100%"
          justify={"center"}
          direction="column"
          align={"center"}
        >
          {correctAnswer >= 0 ? (
            <Flex
              w="100%"
              maxH={"70%"}
              align={"center"}
              justify={"center"}
              flex={"1 0 70%"}
              marginBottom="20px"
              direction={"column"}
            >
              {/* <Box
                fontSize={"3xl"}
                fontWeight="600"
                color="white"
                width={"100%"}
                textAlign="center"
              >
                SCORE BOARD
              </Box> */}
              <Leaderboards users={players}></Leaderboards>
              {/* <Box
                h="fit-content"
                w="100%"
                bgColor="brand.500"
                borderRadius={"10px"}
                padding="20px 10px"
                maxH={'60%'}
              >
                { <PlayerList list={players}></PlayerList>}
               
              </Box> */}
              <Button mt="6" minW="100px" onClick={handleNext}>
                Next
              </Button>
            </Flex>
          ) : (
            <>
              <Box bg="white" w="100%" boxShadow="base">
                <Heading
                  size="lg"
                  color="black"
                  mx="4"
                  my="8"
                  textAlign="center"
                >
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
                    style={{maxWidth:'300px',maxHeight: '300px',minHeight: '100px'}}
                    src={currentQuestion.image || "https://images.ctfassets.net/hrltx12pl8hq/1fR5Y7KaK9puRmCDaIof7j/09e2b2b9eaf42d450aba695056793607/vector1.jpg"}
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
            </>
          )}

          <AnswerList
            answers={currentQuestion.multipleChoice}
            correct={correctAnswer}
            handleClick={void 0}
            isPlaying={isPlaying}
            displayAnswer
          />
        </Flex>
      ) : (
        <Center w="100%" h="100vh">
          <ReadyState message="Get Ready!" time={5}/>
        </Center>
      )}
    </Box>
  );
};

export default ViewQuestionPage;
