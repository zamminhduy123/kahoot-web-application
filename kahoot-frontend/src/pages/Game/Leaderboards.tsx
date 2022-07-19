/** @format */

import { Box, Image, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { IPlayer } from "../../model/interface/player.model";
import { IUser } from "../../model/interface/user.model";

interface LeaderboardsProps {
  question: string;
  users: IPlayer[]; //3rd place, 2ndplace, 1st place
}

const Leaderboards: FunctionComponent<LeaderboardsProps> = ({
  question,
  users,
}: LeaderboardsProps) => {
  return (
    <>
      <Box
        h="100%"
        w="80%"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
		mb='2'
      >
        <Text
          textColor="white"
          fontWeight="bold"
          fontSize="2xl"
          textAlign="center"
		  mb='2'
        >
          Leaderboards
        </Text>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          h="calc(80%)"
          flex="0 1 calc(100% - 20vmin)"
          textColor="white"
          fontWeight="bold"
          fontSize="xl"
        >
          <Box
            bg="purple.500"
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            mb="-3vmin"
            height="calc(100% - 25vh)"
            order="4"
            zIndex="4"
            flex="0 1 33%"
            borderRadius="2xl"
          >
            {users.length >= 4 ? (
              <span>
                {`${users[3].name}`}
                <br />
                {`${Number(users[3].score).toFixed(0)} points`}{" "}
              </span>
            ) : (
              ""
            )}
          </Box>
          <Box
            bg="red.500"
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            mb="-3vmin"
            height="calc(100% + 3vh)"
            order="2"
            zIndex="2"
            flex="0 1 33%"
            shadow="dark-lg"
            borderRadius="2xl"
          >
            <Image
              src="https://assets-cdn.kahoot.it/challenge/assets/1.2791ea0f.svg"
              w="100%"
              h="12.5vmin"
              m="3vmin auto 1.5vmin"
            />
            {users.length >= 1 ? (
              <span>
                {`${users[0].name}`}
                <br />
                {`${Number(users[0].score).toFixed(0)} points`}{" "}
              </span>
            ) : (
              ""
            )}
          </Box>

          <Box
            bg="yellow.500"
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            mb="-3vmin"
            height="calc(100% - 5vh)"
            order="1"
            flex="0 1 33%"
            zIndex="1"
            borderRadius="2xl"
          >
            <Image
              src="https://assets-cdn.kahoot.it/challenge/assets/2.998bb15b.svg"
              w="100%"
              h="12.5vmin"
              m="3vmin auto 1.5vmin"
            />
            {users.length >= 2 ? (
              <span>
                {`${users[1].name}`}
                <br />
                {`${Number(users[1].score).toFixed(0)} points`}{" "}
              </span>
            ) : (
              ""
            )}
          </Box>
          <Box
            bg="blue.500"
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            mb="-3vmin"
            height="calc(100% - 15vh)"
            order="3"
            zIndex="3"
            flex="0 1 33%"
            borderRadius="2xl"
          >
            <Image
              src="https://assets-cdn.kahoot.it/challenge/assets/3.4820f935.svg"
              w="100%"
              h="12.5vmin"
              m="3vmin auto 1.5vmin"
            />
            {users.length >= 3 ? (
              <span>
                {`${users[2].name}`}
                <br />
                {`${Number(users[2].score).toFixed(0)} points`}{" "}
              </span>
            ) : (
              ""
            )}
          </Box>

          <Box
            bg="pink.500"
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            mb="-3vmin"
            height="calc(100% - 35vh)"
            order="5"
            zIndex="5"
            flex="0 1 33%"
            borderRadius="2xl"
          >
            {users.length >= 5 ? (
              <span>
                {`${users[4].name}`}
                <br />
                {`${Number(users[4].score).toFixed(0)} points`}{" "}
              </span>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Leaderboards;
