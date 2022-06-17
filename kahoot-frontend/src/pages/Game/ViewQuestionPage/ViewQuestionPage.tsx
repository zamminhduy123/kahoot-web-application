/** @format */

import { Box, Button, Center, Heading, Text } from "@chakra-ui/react"
import { FunctionComponent, useState } from "react"
import { IQuestion } from "../../../model/interface/question.model"
import AnswerList from "./AnswerList"

interface ViewQuestionPageProps {}

const ViewQuestionPage: FunctionComponent<ViewQuestionPageProps> = () => {
	let data: any[] = [
		{
			id: "1",
			question:
				"Surveys help gather information about groups of people. How many surveys does the U.S. Census Bureau conduct each year?",
			time: "20",
			multipleChoice: "yes",
			answer: 1,
			answers: [
				"this is not the correct answer",
				"this is the correct answer",
				"answer 3 very longg dummy omg",
				"answer 4 very longg dummy omg",
			],
		},
		{
			id: "1",
			question: "Next question",
			time: "20",
			multipleChoice: "yes",
			answer: 2,
			answers: [
				"this is not the correct answer",
				"this is not the correct answer",
				"this is the correct answer",
				"answer 4 very longg dummy omg",
			],
		},
	]

	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const [isPlaying, setIsPlaying] = useState<boolean>(true)

	const handleTimeOut = () => {
		setIsPlaying(false)
	}

	const handleNext = () => {
		if (currentIndex < data.length - 1) {
			setCurrentIndex(currentIndex + 1)
			setIsPlaying(true)
		} else {
			console.log("game end. leaderboards")
		}
	}

	const handleClick = () => {
		setIsPlaying(false)
		console.log("clicked on parent")
	}

	return (
		<>
			<Box bg="white" w="100%" boxShadow="base">
				<Heading size="lg" color="black" mx="4" my="8" textAlign="center">
					{data[currentIndex].question}
				</Heading>
			</Box>
			<Button mt="4" hidden={isPlaying} onClick={handleNext}>
				Next
			</Button>
			<AnswerList
				answers={data[currentIndex].answers}
				correct={data[currentIndex].answer}
				handleClick={handleClick}
				isPlaying={isPlaying}
			/>
		</>
	)
}

export default ViewQuestionPage
