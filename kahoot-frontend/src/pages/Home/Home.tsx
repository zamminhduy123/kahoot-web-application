import { Box, Flex, SlideFade } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/Header";
import { IUser } from "../../model/interface/user.model";
import { Library } from "../Library";
import MyKahoot from "../MyKahoot";

const Home = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Flex justify={"center"}>Home</Flex>
    </div>
  );
};

export default Home;
