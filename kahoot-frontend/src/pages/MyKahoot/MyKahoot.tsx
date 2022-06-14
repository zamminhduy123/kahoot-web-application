import { Box, Button, Flex, HStack, VStack } from "@chakra-ui/react";
import QuestionList from "../../components/QuestionList";

interface MyKahootProps {}

const MyKahoot = ({}: MyKahootProps) => {
  //fetch data here
  return (
    <Flex w={"100%"} direction={"row"}>
      <Flex w="23rem" h={"100%"} boxShadow={"rgb(0 0 0 / 5%) 0.25rem 0px 0.5rem 0px"} direction={'column'}>
        <img
          style={{ width: "368px" }}
          src="https://assets-cdn.kahoot.it/builder/v2/assets/placeholder-cover-kahoot.dca23b0a.png"
        />
        <Flex p={2} w="100%" justify={"flex-start"} direction="column" flexGrow={"1"}>
          <Box>Kahoot Name</Box>
          <HStack>
            <Button color={"brand.600"} variant="solid"></Button>
            <Button color={"gray.600"} variant="solid"></Button>
          </HStack>
          <Box>Status</Box>
          <Box>Updated ...</Box>
        </Flex>
      </Flex>
      <Flex flexGrow={1} bg={"gray.100"} flex="7 1 0px" p={"16px"} style={{height: "calc(100%-60px)"}}>
        <QuestionList />
      </Flex>
    </Flex>
  );
};

export default MyKahoot;
