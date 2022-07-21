import {
  Box,
  Button,
  Center,
  HStack,
  ScaleFade,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Socket from "../../../../api/socket";

import congratulation from "../../../../assets/congratulation.png";

interface GameResultProps {
  score: number;
  rank: number;
  behindScore: number;
  behindName: number;
}

const GameResult = ({
  score,
  rank,
  behindName,
  behindScore,
}: GameResultProps) => {
  return (
    <VStack>
      <ScaleFade initialScale={0.5} in={true}>
        <img src={congratulation} />
      </ScaleFade>
      <ScaleFade initialScale={1} in={true}>
        <Box
          width={"fit-content"}
          fontSize={"5xl"}
          textAlign={"center"}
          padding="20px 30px"
          borderRadius={"10px"}
          fontWeight={900}
          bgColor="white"
        >
          You finished {rank} place
        </Box>

        <Box
          mt="2"
          w="100%"
          bgColor="white"
          color="black"
          fontWeight="700"
          fontSize={"xl"}
          textAlign={"center"}
          padding="10px 10px"
          borderRadius="10px"
        >
          <HStack justify={"space-between"}>
            <Box>Score</Box>
            <Box>{score.toFixed(0)}</Box>
          </HStack>
          {rank !== 1 ? (
            <Box textAlign={"center"} color="blue">
              Just behind {behindName}{" "}
              {Math.abs(behindScore - score).toFixed(0)} score
            </Box>
          ) : (
            <Box textAlign={"center"} color="green">
              No one can beat you in this contest!
            </Box>
          )}
        </Box>
        <Center w="100%" mt="3">
          <Link to="/join">
            <Button minW={'200px'} bgColor="green" _hover={{ backgroundColor: "green.500" }} onClick={()=>{Socket.getInstance().disconnect();Socket.remove();}}>
              Back
            </Button>
          </Link>
        </Center>
      </ScaleFade>
    </VStack>
  );
};

export default GameResult;
