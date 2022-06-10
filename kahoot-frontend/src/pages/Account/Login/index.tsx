
import { Box, Heading, Center, SlideFade } from '@chakra-ui/react';
import LoginForm from './LoginForm';
import AccountPageLayout from '../AccountPageLayout'


export interface LoginProps {}

const Login = (props: LoginProps) => {
  return (
    <AccountPageLayout>
        <Box w={{ base: '80%', md: '400px' }} maxW="400px">
        <Center width="80px" height="80px" p={4} bg="mainBg" borderRadius="25px" mb={6}>
          <img src="" alt="Logo" />
        </Center>

        <Heading color="semiHeading" lineHeight={1.5} fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }} mb={10}>
          Sign in to QuizShare
        </Heading>

        <SlideFade in={true} offsetY={100} unmountOnExit={true}>
          <LoginForm />
        </SlideFade>
      </Box>
      </AccountPageLayout>
  );
};

export default Login;
