/** @format */

import {
	Box,
	Button,
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Heading,
	Icon,
	Input,
	Select,
	useDisclosure,
} from "@chakra-ui/react"
import React, { RefObject } from "react"
import { RiQuestionnaireLine, RiTimerLine, RiMedalLine } from "react-icons/ri"
import { IQuestion } from "../../model/interface/question.model"

import { useAppDispatch, useAppSelector } from "../../hook"
import { editQuestionAtIndex } from "../../model/reducers/newQuiz.reducer"

interface QInfoProps {
	question: IQuestion
}

const QuestionInformation = (props: QInfoProps) => {
	const dispatch = useAppDispatch()
	const { time } = props.question
	const question = { ...props.question }

	const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value.trim()
		if (value) {
			console.log(value)
		}
		question.time = value
		console.log(question)
		dispatch(editQuestionAtIndex(question))
	}

	return (
		<>
			<Flex direction={"column"}>
				{/** 
			<Flex direction={"column"}>
        
				<Heading as="h5" size="sm" color="gray.700">
					<Icon marginRight={"5px"} as={RiQuestionnaireLine}></Icon>Question
					Type
				</Heading>
				<Select marginTop="10px">
					<option value="option1">Quiz</option>
					<option value="option2">Option 2</option>
					<option value="option3">Option 3</option>
				</Select>
				<Divider
					margin={"20px 0px"}
					justifySelf="center"
					orientation="horizontal"
				/>
			</Flex>
      */}
				<Flex direction={"column"}>
					<Heading as="h5" size="sm" color="gray.700">
						<Icon marginRight={"5px"} as={RiTimerLine}></Icon>Time limit
					</Heading>
					<Select marginTop="10px" onChange={handleTimeChange} value={time}>
						<option value="10">10 seconds</option>
						<option value="20">20 seconds</option>
						<option value="30">30 seconds</option>
						<option value="60">60 seconds</option>
					</Select>
				</Flex>
				<Flex direction={"column"} marginTop="20px">
					<Heading as="h5" size="sm" color="gray.700">
						<Icon marginRight={"5px"} as={RiMedalLine}></Icon>Points
					</Heading>
					<Select marginTop="10px">
						<option value="option1">100</option>
						<option value="option2">200</option>
						<option value="option3">300</option>
					</Select>
				</Flex>
			</Flex>
		</>
	)
}

export default QuestionInformation
