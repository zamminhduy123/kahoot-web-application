/** @format */

import { Box, Image, Text } from "@chakra-ui/react"
import { FunctionComponent } from "react"

interface QuizItemProps {
	title: string
	author: string
	totalQuestions: number
	image: string
}

const QuizItem: FunctionComponent<QuizItemProps> = (props) => {
	return (
		<Box
			bg="white"
			p={4}
			display={"flex"}
			maxW={{ md: "md" }}
			borderRadius="lg"
			overflow="hidden"
		>
			<Box flexShrink={0}>
				<Image
					borderRadius="lg"
					maxH='250px'
					maxW='250px'
					src={props.image || "https://bit.ly/2jYM25F"}
					alt="Woman paying for a purchase"
				/>
			</Box>
			<Box ml="6">
				<Text
					fontWeight="bold"
					textTransform="uppercase"
					fontSize="sm"
					letterSpacing="wide"
					color="brand.700"
					maxW="200px"
					noOfLines={1}
				>
					Hosted by {props.author}
				</Text>
				<Text mt={2} color="black" noOfLines={2}>
					{props.title}
				</Text>
			</Box>
		</Box>
	)
}

export default QuizItem
