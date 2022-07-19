/** @format */

import { Box, Button, Center, Flex, Input } from "@chakra-ui/react"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../hook"
import { IQuestion } from "../../model/interface"
import { editQuestionAtIndex } from "../../model/reducers/newQuiz.reducer"
import CAnswerList from "./AnswerList"
import QuestionInformation from "./QuestionInformation"

interface MainDisplayProps {
	question?: IQuestion
}

const MainDisplay = ({}: MainDisplayProps) => {
	const { list, selected } = useAppSelector((state) => state.newQuiz)
	const question = { ...list[selected] }
	const dispatch = useAppDispatch()
	
	return (
		<Flex w="100%" h="100%" minHeight="80vh" padding="12px 32px">
			<Flex
				flexGrow={1}
				direction="column"
				justifyContent="center"
				alignItems="center"
			>
				<Box w={"90%"}>
					<Input
						height={"60px"}
						fontSize="30px"
						value={question.question || "Start typing your question"}
						textAlign={"center"}
						boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const value = event.target.value.trim()
							if (value) {
								question.question = value
							}
							dispatch(editQuestionAtIndex(question))
						}}
					/>
				</Box>
				<Center w="100%" margin="22px 0px">
					<Center
						minH={"9.875rem"}
						minW="14.8125rem"
						width="600px"
						h={"400px"}
						border="1px solid"
						borderRadius={"10px"}
						borderColor={"gray.200"}
						boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
					>
						<Button></Button>
					</Center>
				</Center>
				<CAnswerList question={question} />
			</Flex>

			<Flex
				width={"fit-content"}
				padding="16px"
				direction={"column"}
				boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
			>
				<QuestionInformation question={question} />
			</Flex>
		</Flex>
	)
}

export default MainDisplay
