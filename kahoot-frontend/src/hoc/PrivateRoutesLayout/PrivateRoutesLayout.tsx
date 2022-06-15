import { Box, Flex, SlideFade } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import FallbackUI from "../../components/FallbackUI";
import Header from "../../components/Header";
import PageTransition from "../../components/PageTransition";
import { IUser } from "../../model/interface";
import Home from "../../pages/Home";
import { Library } from "../../pages/Library";
import MyKahoot from "../../pages/MyKahoot";
import AuthGuard from "../AuthGuard";

interface LayoutProps {
  children: React.ReactElement | React.ReactElement[];
}

const Layout = ({ children }: LayoutProps) => {
  const user: IUser = {
    id: "US01",
    fullName: "Duy Nguyen",
    lastName: "Duy",
    firstName: "Nguyen",
    email: "ntminhduy@yahoo.com",
  };
  const location = useLocation();
  const [activePath, setActivePath] = React.useState("");

  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <AuthGuard>
      <Header user={user} activePath={activePath}></Header>
      <Box
        ml={{ base: 0, lg: 80 }}
        transition=".3s ease"
        px={{ base: 3, lg: 6 }}
        flex={1}
      >
        <Box minH={"100vh"}>
          <PageTransition>
            <Suspense fallback={<FallbackUI />}>
              {children}
            </Suspense>
          </PageTransition>
        </Box>
      </Box>
    </AuthGuard>
  );
};

export default React.memo(Layout);
