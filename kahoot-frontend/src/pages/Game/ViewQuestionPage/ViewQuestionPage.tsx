/** @format */

import { Box, Center, Heading, Text } from "@chakra-ui/react"
import { FunctionComponent } from "react"
import { IQuestion } from "../../../model/interface/question.model"

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
	return (
		<>
			<Center bg="white" boxShadow="base">
				<Heading size="lg" color="black" mx="56" my="8" textAlign="center">
					{data.question}
				</Heading>
			</Center>
		</>
	)
}

export default ViewQuestionPage
