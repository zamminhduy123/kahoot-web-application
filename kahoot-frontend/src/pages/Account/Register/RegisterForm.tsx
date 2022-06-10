import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { RiAccountPinCircleLine, RiShieldKeyholeLine, RiShieldUserLine } from 'react-icons/ri';
import { VscReferences } from 'react-icons/vsc';

interface IFormInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  referralCode: string;
}

const registerFailureMessage = {
  default: 'Sorry, we are unable to complete your register now please try again later.',
  emailExited: 'The email has already been taken!',
};

const RegisterForm: React.FunctionComponent = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const refCode = query.get('ref');

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: {
      referralCode: refCode || '',
    },
  });

  const navigate = useNavigate();
  const toast = useToast();
  const [failureMessage, setFailureMessage] = useState('');

  const onSubmit: SubmitHandler<IFormInput> = async (formValue) => {
    setFailureMessage('');
    // const { status, data } = await registerApi(formValue);
    let status = 200, data = {id: 1};
    if (status === 200 && data.id) {
      toast({
        title: 'Register successfully!',
        status: 'success',
        isClosable: true,
      });
    } else if (status === 409) {
      setFailureMessage(registerFailureMessage.emailExited);
    } else {
      setFailureMessage(registerFailureMessage.default);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4}>
        {!!failureMessage && (
          <Alert status="error">
            <AlertIcon />
            {failureMessage}
          </Alert>
        )}

        <FormControl id="register-first-name" isInvalid={!!errors.firstName} isRequired>
          <FormLabel fontSize="sm" color="muted" fontWeight="normal" pl={2}>
            FIRST NAME
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<Icon as={RiShieldUserLine} color="black" />} />
            <Input
              type="text"
              placeholder="John"
              color={'black'}
              _focus={{ boxShadow: 'none', borderColor: 'semiHeading' }}
              isDisabled={isSubmitting}
              {...register('firstName', {
                required: 'First name is required',
              })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="register-last-name" isInvalid={!!errors.lastName} isRequired>
          <FormLabel fontSize="sm" color="muted" fontWeight="normal" pl={2}>
            LAST NAME
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<Icon as={HiOutlineMail} color="black" />} />
            <Input
              type="text"
              placeholder="Doe"
              color={'black'}
              _focus={{ boxShadow: 'none', borderColor: 'semiHeading' }}
              isDisabled={isSubmitting}
              {...register('lastName', {
                required: 'Last name is required',
              })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="register-email" isInvalid={!!errors.email} isRequired>
          <FormLabel fontSize="sm" color="muted" fontWeight="normal" pl={2}>
            EMAIL
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<Icon as={HiOutlineMail} color="black" />} />
            <Input
              type="text"
              placeholder="firstname.lastname@mail.com"
              color={'black'}
              _focus={{ boxShadow: 'none', borderColor: 'semiHeading' }}
              isDisabled={isSubmitting}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please input a valid email address',
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="register-password" isInvalid={!!errors.password} isRequired>
          <FormLabel fontSize="sm" color="muted" fontWeight="normal" pl={2}>
            PASSWORD
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<Icon as={RiShieldKeyholeLine} color="black" />} />
            <Input
              type="password"
              placeholder="Don't share your password with anyone!"
              color={'black'}
              _focus={{ boxShadow: 'none', borderColor: 'semiHeading' }}
              isDisabled={isSubmitting}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password should be at least 6 characters.',
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>

        <Box pt={4}>
          <Button
            type="submit"
            variant="solid"
            colorScheme="brand"
            isLoading={isSubmitting}
            w="full"
            rightIcon={<Icon as={RiAccountPinCircleLine} />}
          >
            SIGN UP
          </Button>
        </Box>
        <Text pr={4}>
          Already registered?{' '}
          <Text
            as="span"
            color="semiHeading"
            fontWeight="semibold"
            borderBottom="1px solid transparent"
            _hover={{ borderBottom: '1px solid' }}
          >
            <Link to="/login">Log In</Link>
          </Text>
        </Text>
      </Stack>
    </form>
  );
};

export default RegisterForm;
