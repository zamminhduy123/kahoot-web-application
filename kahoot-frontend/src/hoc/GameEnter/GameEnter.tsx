import { Box, Flex, SlideFade } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import FallbackUI from "../../components/FallbackUI";
import { useAppSelector } from "../../hook";

interface GameGuardProps {
  children: React.ReactElement | React.ReactElement[];
}

const GameGuard = ({ children }: GameGuardProps) => {
  const {pin} = useAppSelector(state => state.play)
  console.log("GAME ID" ,pin);

  if (pin) return <>{children}</>;
  else {
    return <Navigate to={"/join"} />;
  }
};

interface LayoutProps {
  header?: Boolean;
  children: React.ReactElement | React.ReactElement[];
}

const GameLayout = ({ children, header = true }: LayoutProps) => {
  const location = useLocation();
  const [activePath, setActivePath] = React.useState("");

  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <GameGuard>
      <Box transition=".3s ease" flex={1} minW="100%" minH={'100vh'}>
        <Flex minH={"100vh"} minW="100%" justify="center" align={"center"}>
          <Suspense fallback={<FallbackUI />}>{children}</Suspense>
        </Flex>
      </Box>
    </GameGuard>
  );
};

export default React.memo(GameLayout);
