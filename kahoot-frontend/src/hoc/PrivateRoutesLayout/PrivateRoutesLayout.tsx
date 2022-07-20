import { Box, Flex, SlideFade } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import FallbackUI from "../../components/FallbackUI";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import PageTransition from "../../components/PageTransition";
import { useAppSelector } from "../../hook";
import { IUser } from "../../model/interface";
import Home from "../../pages/Home";
import { Library } from "../../pages/Library";
import MyKahoot from "../../pages/MyKahoot";
import AuthGuard from "../AuthGuard";

interface LayoutProps {
  header?: Boolean;
  children: React.ReactElement | React.ReactElement[];
}

const Layout = ({ children, header = true }: LayoutProps) => {
  const user = useAppSelector((state) => state.auth);

  return (
    <AuthGuard>
      <Box transition=".3s ease" h="100vh" overflowY={"scroll"}>
        {header && <Header user={user}></Header>}

        <Suspense fallback={<FallbackUI />}>{children}</Suspense>

        <Footer />
      </Box>
    </AuthGuard>
  );
};

export default React.memo(Layout);
