import React, { useState } from "react";
import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Text,
  Center,
  Flex,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { HiArrowNarrowRight, HiOutlineMail } from "react-icons/hi";

import { login } from "../../../api";
import { useAppDispatch } from "../../../hook";
import { authStart, authSuccess } from "../../../model/reducers/auth.reducer";
import { IUser } from "../../../model/interface";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm: React.FunctionComponent = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();
  const navigate = useNavigate();
  const toast = useToast();
  const [loginFailure, setLoginFailure] = useState("");
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    setLoginFailure("");
    try {
      dispatch(authStart());
      const response = await login(email, password);
      const data = response.data;
      if (data) {
        toast({
          title: "Login successfully!",
          status: "success",
          isClosable: true,
        });

        const loginedUser: IUser = {
          id: data._id,
          name: data.name,
          email: data.email,
          refreshToken: data.refreshToken,
        };

        //save accessToken to localstorage
        window.localStorage.setItem("accessToken", data.accessToken);

        //dispatch action login success
        dispatch(
          authSuccess({ ...loginedUser, accessToken: data.accessToken })
        );
        navigate("/");
      } else {
        console.log(data);
        throw new Error("Login failed!");
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401) {
          setLoginFailure("Wrong email or password");
        }
      } else {
        setLoginFailure(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={6}>
        <FormControl id="account-email" isInvalid={!!errors.email} isRequired>
          <FormLabel fontSize="sm" color="muted" fontWeight="normal" pl={2}>
            EMAIL
          </FormLabel>
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={HiOutlineMail} boxSize={6} color="black" />}
            />
            <Input
              type="text"
              placeholder="firstname.lastname@mail.com"
              color={"black"}
              isDisabled={isSubmitting}
              _focus={{ boxShadow: "none", borderColor: "semiHeading" }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please input a valid email address",
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="account-password"
          isInvalid={!!errors.password}
          isRequired
        >
          <FormLabel fontSize="sm" color="muted" fontWeight="normal" pl={2}>
            PASSWORD
          </FormLabel>
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={
                <Icon as={RiShieldKeyholeLine} boxSize={6} color="black" />
              }
            />
            <Input
              type="password"
              placeholder="Don't share your password with anyone!"
              color={"black"}
              _focus={{ boxShadow: "none", borderColor: "semiHeading" }}
              isDisabled={isSubmitting}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters.",
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        {!!loginFailure && (
          <Alert status="error">
            <AlertIcon />
            {loginFailure}
          </Alert>
        )}

        <Flex justify="flex-end" pt={8}>
          <Link to="#">
            <Text
              color="semiHeading"
              fontWeight="semibold"
              borderBottom="1px solid transparent"
              textDecoration="none"
            >
              Forgot password?
            </Text>
          </Link>
        </Flex>

        <Box style={{ marginTop: "10px" }}>
          <Button
            type="submit"
            variant="solid"
            colorScheme="brand"
            isLoading={isSubmitting}
            w="full"
            rightIcon={<Icon as={HiArrowNarrowRight} />}
          >
            SIGN IN
          </Button>
        </Box>

        <Center>
          <Text pr={4}>
            New to Kahoot?{" "}
            <Text
              as="span"
              color="semiHeading"
              fontWeight="semibold"
              borderBottom="1px solid transparent"
              _hover={{ borderBottom: "1px solid" }}
            >
              <Link to="/register">Register</Link>
            </Text>
          </Text>
        </Center>
      </Stack>
    </form>
  );
};

export default LoginForm;
