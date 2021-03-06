/** @format */

import { Box, Button, Flex, Spacer } from "@chakra-ui/react"
import React, { FunctionComponent } from "react"
import { useParams } from "react-router-dom"
import { IQuestion } from "../../model/interface"
import QuestionItem from "../QuestionItem"
interface QuestionListProps {
	questions: IQuestion[]
}

const QuestionList: FunctionComponent<QuestionListProps> = (props) => {
	const { questions } = props
	console.log(questions	)
	return (
		<Flex direction={"column"} w={"100%"} h="100%">
			<Flex
				direction={"row"}
				height="fit-content"
				margin="4px 0px"
				align={"center"}
			>
				<Box fontWeight={"600"} fontSize="16px">
					Question ({questions.length})
				</Box>
			</Flex>
			<Flex
				flex={"1"}
				minH="0"
				direction="column"
				padding={"8px"}
				overflowY="scroll"
			>
				<Box>
					{questions.map((q, id) => {
						return <QuestionItem key={"q.id" + id} question={q}/>
					})}
				</Box>
			</Flex>
		</Flex>
	)
}

export default QuestionList
