import { Flex } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/Header";
import { IUser } from "../../model/interface/user.model";

interface HomePageLayoutProps {
  children: React.ReactElement | React.ReactElement[];
}

const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  const [selectedNav, setSelectedNav] = React.useState<"Home" | "Library">("Home");
  const user: IUser = {
    id: "US01",
    fullName: "Duy Nguyen",
    lastName: "Duy",
    firstName: "Nguyen",
    email: "ntminhduy@yahoo.com",
  };
  return (
    <div>
      <Header user={user} selectedNav={selectedNav} onNavClick={setSelectedNav}/>
      <Flex align={"flex-start"} justify={"center"}>
        {children}
      </Flex>
    </div>
  );
};

export default HomePageLayout;
