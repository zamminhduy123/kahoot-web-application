import { Box, Flex, SlideFade } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import FallbackUI from "../../components/FallbackUI";
import Header from "../../components/Header";
import PageTransition from "../../components/PageTransition";
import { useAppSelector } from "../../hook";
import { IUser } from "../../model/interface";
import Home from "../../pages/Home";
import { Library } from "../../pages/Library";
import MyKahoot from "../../pages/MyKahoot";
import AuthGuard from "../AuthGuard";

interface LayoutProps {
  children: React.ReactElement | React.ReactElement[];
}

const Layout = ({ children }: LayoutProps) => {
  const user = useAppSelector((state) => state.auth);
  const location = useLocation();
  const [activePath, setActivePath] = React.useState("");

  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <AuthGuard>
      <Header user={user} activePath={activePath}></Header>
      <Box transition=".3s ease" flex={1}>
        <Flex minH={"100vh"} justify="center" align={"center"}>
          <Suspense fallback={<FallbackUI />}>{children}</Suspense>
        </Flex>
      </Box>
    </AuthGuard>
  );
};

export default React.memo(Layout);
