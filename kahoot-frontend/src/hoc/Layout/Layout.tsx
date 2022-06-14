import { Flex, SlideFade } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";
import FallbackUI from "../../components/FallbackUI";
import Header from "../../components/Header";
import { IUser } from "../../model/interface";

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
    <>
      <Header user={user} activePath={activePath}></Header>
      <div style={{ minHeight: "100vh" }}>
        <Suspense fallback={<FallbackUI />}>
          <SlideFade in={true} offsetY="20px">
            <Flex w={"100%"} h="100%" justify="center">{children}</Flex>
          </SlideFade>
        </Suspense>
      </div>
    </>
  );
};

export default React.memo(Layout);
