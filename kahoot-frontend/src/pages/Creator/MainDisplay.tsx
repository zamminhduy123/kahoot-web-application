import { Box, Button, Center, Flex, Input } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { IQuestion } from "../../model/interface";
import { editQuestionAtIndex } from "../../model/reducers/newQuiz.reducer";

interface MainDisplayProps {
  question?: IQuestion;
}

const MainDisplay = ({}: MainDisplayProps) => {
  const {list,selected} = useAppSelector((state) => state.newQuiz)
  const question = {...list[selected]};
  const dispatch = useAppDispatch();
  return (
    <Flex w="100%" h="100%" padding="12px 32px">
      <Flex flexGrow={1} direction="column">
        <Box  w={"100%"}>
          <Input
            margin="0px 10px"
            height={"60px"}
            fontSize="30px"
            value={question.question || "Start typing your question"}
            textAlign={"center"}
            boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
            onChange={(event : React.ChangeEvent<HTMLInputElement>) => {
              const value = event.target.value.trim();
              if (value) {
                question.question = value;
              }
              dispatch(editQuestionAtIndex(question))
            }}
          />
        </Box>
        <Center w="100%" margin="22px 0px">
          <Center
            minH={"9.875rem"}
            minW="14.8125rem"
            width="600px"
            h={"400px"}
            border="1px solid"
            borderRadius={'10px'}
            borderColor={'gray.200'}
            boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
          >
            <Button></Button>
          </Center>
        </Center>
        <Flex flex={"4 1 auto"}>
          <Box w='100%'></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MainDisplay;
