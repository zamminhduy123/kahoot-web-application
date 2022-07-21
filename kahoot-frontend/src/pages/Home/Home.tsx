import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  SlideFade,
  VStack,
} from "@chakra-ui/react";

import features from "../../assets/feature.png";
import { Link } from "react-router-dom";

const Achievement = (props: any) => {
  return (
    <Center
      flex="1"
      bgColor={props.color}
      mr="4"
      borderRadius={"10px"}
      color="white"
      fontWeight={600}
      fontSize="xl"
      boxShadow={
        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
      }
      textAlign={"center"}
    >
      {props.text}
    </Center>
  );
};

const Home = () => {
  return (
    <Box paddingTop='20px' flex={1} w='100%'>
      <Flex direction={"column"} justify={"flex-start"} align="center">
        <Box fontWeight={"900"} textAlign="center" fontSize={"3xl"}>
          New Quiz Features
        </Box>
        <img src={features} />

        <Button
          width={"20%"}
          padding="20px 10px"
          fontWeight={"900"}
          mb="4"
          bgColor="green"
          transition={"transform 0.2s ease-in-out"}
          _hover={{ transform: "scale(1.05)" }}
        >
          <Link to="/join">Play now</Link>
        </Button>

        <VStack
          justify={"center"}
          bgColor="#f2f2f2"
          w={"100%"}
          mt="2"
          pt="2"
          pb="8"
        >
          <Box
            margin="0"
            fontWeight={"900"}
            textAlign="center"
            fontSize={"3xl"}
          >
            <Box fontWeight={"500"} textAlign="center" fontSize={"xl"}>
              More than
            </Box>
            100,000
            <Box fontWeight={"500"} textAlign="center" fontSize={"xl"}>
              players a year
            </Box>
          </Box>
          <Flex w="60%" h="100px">
            <Achievement text="Easy to create!" color="red" />
            <Achievement text="Easy to host!" color="blue" />
            <Achievement text="Let make quiz more fun" color="orange" />
            <Achievement text="And it's free" color="green" />
          </Flex>
          <Box h='10px'></Box>
          <Button
            width={"20%"}
            padding="20px 10px"
            fontWeight={"900"}
            marginTop="10px"
            transition={"transform 0.2s ease-in-out"}
            _hover={{ transform: "scale(1.05)" }}
          >
            <Link to="/creator">Create your own quiz</Link>
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Home;
