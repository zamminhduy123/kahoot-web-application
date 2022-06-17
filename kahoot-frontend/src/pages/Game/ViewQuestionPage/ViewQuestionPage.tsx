/** @format */

import { Box, Center, Heading, Text } from "@chakra-ui/react"
import { FunctionComponent } from "react"
import { IQuestion } from "../../../model/interface/question.model"
import AnswerList from "./AnswerList"

interface ViewQuestionPageProps {}

const ViewQuestionPage: FunctionComponent<ViewQuestionPageProps> = () => {
	let data: IQuestion = {
		id: "1",
		question:
			"Surveys help gather information about groups of people. How many surveys does the U.S. Census Bureau conduct each year?",
		time: "20",
		multipleChoice: "yes",
		answer: 1,
	}

	let data2: IQuestion = {
		id: "1",
		question: "Next question",
		time: "20",
		multipleChoice: "yes",
		answer: 1,
	}

	const answers = [
		"this is not the correct answer",
		"this is the correct answer",
		"answer 3 very longg dummy omg",
		"answer 4 very longg dummy omg",
	]

	return (
		<>
			<Box bg="white" boxShadow="base">
				<Heading size="lg" color="black" mx="4" my="8" textAlign="center">
					{data.question}
				</Heading>
			</Box>
			<AnswerList answers={answers} correct={data.answer} />
		</>
	)
}

export default ViewQuestionPage
