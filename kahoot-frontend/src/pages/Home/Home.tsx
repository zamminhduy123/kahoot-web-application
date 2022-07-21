/** @format */

import {
	Box,
	Button,
	Center,
	Flex,
	HStack,
	SlideFade,
	Spacer,
	Stack,
	VStack,
} from "@chakra-ui/react"

import features from "../../assets/feature.png"
import { Link } from "react-router-dom"

const Achievement = (props: any) => {
	return (
		<Center
			flex="1"
			bgColor={props.color}
			borderRadius={"10px"}
			color="white"
			fontWeight={600}
			fontSize="lg"
			boxShadow={
				"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
			}
			overflowWrap={"normal"}
			textAlign={"center"}
			p={{ base: "4", lg: "0" }}
		>
			{props.text}
		</Center>
	)
}

const Home = () => {
	return (
		<VStack paddingTop="20px" w="100%">
			<Box fontWeight={"900"} textAlign="center" fontSize={"3xl"}>
				New Quiz Features
			</Box>
			<img src={features} />

			<Button
				padding="20px 10px"
				fontWeight={"900"}
				mb="4"
				bgColor="green"
				transition={"transform 0.2s ease-in-out"}
				_hover={{ transform: "scale(1.05)" }}
			>
				<Link to="/join">Play now</Link>
			</Button>

			<VStack
				justify={"center"}
				bgColor="#f2f2f2"
				w={"100%"}
				mt="2"
				pt="2"
				pb="8"
			>
				<Box margin="0" fontWeight={"900"} textAlign="center" fontSize={"3xl"}>
					<Box fontWeight={"500"} textAlign="center" fontSize={"xl"}>
						More than
					</Box>
					100,000
					<Box fontWeight={"500"} textAlign="center" fontSize={"xl"}>
						players a year
					</Box>
				</Box>
				<Stack
					w="80%"
					minH="100px"
					direction={["column", "row"]}
					spacing="24px"
				>
					<Achievement text="Easy to create!" color="red" />
					<Achievement text="Easy to host!" color="blue" />
					<Achievement text="Let make quiz more fun" color="orange" />
					<Achievement text="And it's free" color="green" />
				</Stack>
				<Spacer />
				<Button
					padding="20px 10px"
					fontWeight={"900"}
					marginTop="10px"
					transition={"transform 0.2s ease-in-out"}
					_hover={{ transform: "scale(1.05)" }}
				>
					<Link to="/creator">Create your own quiz</Link>
				</Button>
			</VStack>
		</VStack>
	)
}

export default Home
