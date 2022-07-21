import { Box, Center, Flex, SlideFade, VStack } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import FallbackUI from "../../components/FallbackUI";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import { useAppSelector } from "../../hook";
import AuthGuard from "../AuthGuard";

interface LayoutProps {
  header?: Boolean;
  children: React.ReactElement | React.ReactElement[];
}

const Layout = ({ children, header = true }: LayoutProps) => {
  const user = useAppSelector((state) => state.auth);

  return (
    <AuthGuard>
      <VStack transition=".3s ease" w={"100%"} h='100vh'>
        {header && <Header user={user}></Header>}

        <Suspense fallback={<FallbackUI />}>{children}</Suspense>

        <Footer />
      </VStack>
    </AuthGuard>
  );
};

export default React.memo(Layout);
