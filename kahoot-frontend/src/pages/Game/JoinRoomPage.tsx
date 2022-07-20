/** @format */

import {
  Box,
  Button,
  Center,
  Circle,
  Container,
  FormControl,
  FormLabel,
  Input,
  Square,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FunctionComponent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Socket from "../../api/socket";
import { useAppDispatch } from "../../hook";
import { IPlayer } from "../../model/interface/player.model";
import { setNewGame } from "../../model/reducers/game.reducer";
import { joinGame } from "../../model/reducers/play.reducer";

interface JoinRoomPageProps {}

interface IFormInput {
  pincode: string;
  name: string;
}

const JoinRoomPage: FunctionComponent<JoinRoomPageProps> = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onJoinRoomSuccess = (payload: any) => {
    toast.closeAll();
    toast({
      title: "Joined!",
      status: "success",
      isClosable: true,
      duration: 2000,
    });
    dispatch(joinGame(payload))
    console.log("JOINED",payload)
    navigate("/play");
  };

  const onSubmit: SubmitHandler<IFormInput> = async ({ pincode, name }) => {
    Socket.getInstance().emit(
      "player-join",
      { pincode, name },
      onJoinRoomSuccess
    );
  };

  const gamePinNotFound = () => {
    toast.closeAll();
    toast({
      title: "Pin Not Found!",
      description: "No game was found with given pin code",
      status: "error",
      isClosable: false,
      duration: 2000,
    });
  };
  // join room submit
  React.useEffect(() => {
    Socket.getInstance().registerListener("noGameFound", () => {
      gamePinNotFound();
    });

    return () => {
      Socket.getInstance().removeRegisteredListener("noGameFound");
    };
  }, []);

  const toast = useToast();
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box bg="orange.800" minWidth="100vw" minHeight="100vh">
        <Circle
          position="fixed"
          bg="white"
          opacity="0.1"
          minWidth="75vmin"
          minHeight="75vmin"
          top="-40"
          left="-40"
        />
        <Square
          position="fixed"
          bg="white"
          opacity="0.1"
          minWidth="75vmin"
          minHeight="75vmin"
          bottom="-40"
          right="-40"
        />
        <Container
          width="100%"
          height="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          zIndex="1"
          pb="20"
        >
          <Text fontSize="4xl" fontWeight="bold" color="white" mb="2">
            QuizShare
          </Text>
          <Box bg="white" padding="5" borderRadius="lg">
            <FormControl colorScheme="brand" isRequired>
              <Box marginBlockEnd={"10px"}>
                <FormLabel htmlFor="name">Your Name</FormLabel>
                <Input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  textAlign="center"
                  id="name"
                  placeholder="Your NAME"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="pin-code">Enter Pin Code</FormLabel>
                <Input
                  {...register("pincode", {
                    required: "PinCode is required",
                  })}
                  textAlign="center"
                  id="pin-code"
                  placeholder="Game PIN"
                />
              </Box>
              <Button
                colorScheme="orange"
                fontWeight={600}
                type="submit"
                mt="4"
                mx="auto"
                w={"100%"}
              >
                Join
              </Button>
            </FormControl>
            <Box marginBlockStart={"10px"} textAlign="center">
              Create your own Game?
              <Link to="/login">
                <Text fontWeight={600}>QuizShare.com</Text>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </form>
  );
};

export default JoinRoomPage;
