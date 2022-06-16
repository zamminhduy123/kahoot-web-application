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
} from "@chakra-ui/react"
import { FunctionComponent } from "react"
import { Link } from "react-router-dom"

interface JoinRoomPageProps {}

const JoinRoomPage: FunctionComponent<JoinRoomPageProps> = () => {
	return (
		<div>
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
							<FormLabel htmlFor="first-name">Enter Your Pin Code</FormLabel>
							<Input id="first-name" placeholder="Pin Code" />
							<Link to="/play">
								<Button colorScheme="orange" type="submit" mt="4" mx="auto">
									Join
								</Button>
							</Link>
						</FormControl>
					</Box>
				</Container>
			</Box>
		</div>
	)
}

export default JoinRoomPage
