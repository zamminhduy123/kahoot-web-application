/** @format */

import { Box, Heading, Center, SlideFade, Spinner } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import AccountPageLayout from "../AccountPageLayout";
import logo from "../../../assets/logo.png";
import React from "react";

import * as API from "../../../api";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { useNavigate } from "react-router-dom";
import {
  authFailure,
  authStart,
  authSuccess,
} from "../../../model/reducers/auth.reducer";
import { IUser } from "../../../model/interface";

export interface LoginProps {}

const Login = (props: LoginProps) => {
  const [isAutoLogin, setIsAutoLogin] = React.useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginSuccess = React.useCallback(
    (data: any) => {
      const loginedUser: IUser = {
        id: data._id,
        name: data.name,
        email: data.email,
        refreshToken: data.refreshToken,
      };

      //save accessToken to localstorage
      window.localStorage.setItem("accessToken", data.accessToken);
      window.localStorage.setItem("refreshToken", data.refreshToken);

      //dispatch action login success
      dispatch(
        authSuccess({
          ...loginedUser,
          accessToken: data.accessToken,
          id: data._id,
        })
      );
      navigate("/");
    },
    [navigate]
  );

  const { id, name } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    if (id) {
      navigate("/");
    } else {
      dispatch(authStart());
      console.log("start auto");
      API.autoLogin()
        .then((response) => {
          const data = response.data;
          if (data) {
            loginSuccess(data);
          } else {
            setIsAutoLogin(false);
            dispatch(authFailure());
          }
        })
        .catch((err) => {
          setIsAutoLogin(false);
          dispatch(authFailure());
        });
    }
  }, []);
  return (
    <AccountPageLayout>
      <Box w={{ base: "80%", md: "400px" }} maxW="400px">
        <Center width="80px" height="80px" bg="" borderRadius="25px" mb={6}>
          <img src={logo} alt="Logo" />
        </Center>

        <Heading
          color="semiHeading"
          lineHeight={1.5}
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          mb={10}
        >
          {!isAutoLogin ? "Sign in to QuizShare" : "Auto sign in"}
        </Heading>

        {isAutoLogin ? (
          <Spinner color={"brand.500"}></Spinner>
        ) : (
          <SlideFade in={true} offsetY={100}>
            <LoginForm loginSuccess={loginSuccess} />
          </SlideFade>
        )}
      </Box>
    </AccountPageLayout>
  );
};

export default Login;
