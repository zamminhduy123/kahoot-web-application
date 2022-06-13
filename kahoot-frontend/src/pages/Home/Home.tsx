import { Box, Flex, SlideFade } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/Header";
import { IUser } from "../../model/interface/user.model";
import DashBoard from "./DashBoard";
import Library from "./Library";
import MyKahoot from "./MyKahoot";

const Home = () => {
  const [selectedNav, setSelectedNav] = React.useState<"Home" | "Library">(
    "Home"
  );
  const user: IUser = {
    id: "US01",
    fullName: "Duy Nguyen",
    lastName: "Duy",
    firstName: "Nguyen",
    email: "ntminhduy@yahoo.com",
  };
  let components;
  switch (selectedNav) {
    case "Home":
      components = <DashBoard />;
      break;
    case "Library":
      components = <Library />;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <Header
        user={user}
        selectedNav={selectedNav}
        onNavClick={setSelectedNav}
      />
      <Box style={{ flexGrow: "1" }}>
        <Flex justify={"center"} h="100%">
          <MyKahoot />
        </Flex>
      </Box>
    </div>
  );
};

export default Home;
