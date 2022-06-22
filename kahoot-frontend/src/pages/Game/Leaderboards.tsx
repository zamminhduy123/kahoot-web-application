/** @format */

import { Box, Image, Text } from "@chakra-ui/react"
import { FunctionComponent } from "react"
import { IUser } from "../../model/interface/user.model"

interface User {
	username: string
	points: number
}

interface LeaderboardsProps {
	question: string
	users: User[] //3rd place, 2ndplace, 1st place
}

const Leaderboards: FunctionComponent<LeaderboardsProps> = (props) => {
	return (
		<>
			<Box
				h="100vh"
				w="100%"
				maxW="80vmin"
				display="flex"
				flexDirection="column"
				justifyContent="flex-end"
			>
				<Text
					textColor="white"
					fontWeight="bold"
					fontSize="3xl"
					textAlign="center"
					my="10"
				>
					Leaderboards
				</Text>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="flex-end"
					h="calc(100% - 20vmin)"
					flex="0 1 calc(100% - 20vmin)"
					textColor="white"
					fontWeight="bold"
					fontSize="xl"
				>
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
						13/13
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
						13/13
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
						zIndex="0"
						flex="0 1 33%"
						borderRadius="2xl"
					>
						<Image
							src="https://assets-cdn.kahoot.it/challenge/assets/3.4820f935.svg"
							w="100%"
							h="12.5vmin"
							m="3vmin auto 1.5vmin"
						/>
						13/13
					</Box>
				</Box>
				<Box
					position="fixed"
					zIndex="4"
					h="calc(20vh - 1rem)"
					w="100%"
					bg="black"
				></Box>
			</Box>
		</>
	)
}

export default Leaderboards
