/** @format */

import { StarIcon, TriangleUpIcon } from "@chakra-ui/icons"
import {
	Box,
	Circle,
	Flex,
	Input,
	Radio,
	RadioGroup,
	Square,
} from "@chakra-ui/react"
import { FunctionComponent, useState } from "react"
import { BiTargetLock } from "react-icons/bi"
import { useAppDispatch } from "../../hook"
import { IMultipleChoice, IQuestion } from "../../model/interface"
import { editQuestionAtIndex } from "../../model/reducers/newQuiz.reducer"
import cloneDeep from "lodash/cloneDeep"
import React from "react"
import { useEffect } from "react"

interface AnsListProps {
	question: IQuestion
}

const Answer = (props: any) => {
	const { color } = props

	return (
		<Box
			position="relative"
			display="flex"
			flex={"1 0 auto"}
			width={{ sm: "90%", lg: "calc(50% - 3rem)" }}
			height={"100%"}
			minH="7rem"
			maxW="100%"
			mr="0.5rem"
			mb="0.5rem"
			color="white"
			p="2"
			bg={color}
			fontSize="2xl"
			alignItems="center"
			boxShadow="inner"
			borderRadius={"10px"}
			transition={"transform 0.3s ease-in-out"}
			_hover={{
				transform: "scale(1.02)",
				zIndex: 99,
			}}
		>
			{props.children}
		</Box>
	)
}

const CAnswerList: FunctionComponent<AnsListProps> = (props) => {
	const { multipleChoice } = props.question

	const dispatch = useAppDispatch()

	const question = { ...props.question }

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const value = event.target.value.trim()
		if (value) {
			console.log(value)
			const arr = [...multipleChoice]
			arr[index] = value
			question.multipleChoice = arr
		}

		dispatch(editQuestionAtIndex(question))
	}

	const [value, setValue] = React.useState("0")

	useEffect(() => {
		console.log("change value to" + value)
		question.answer = Number(value)
		dispatch(editQuestionAtIndex(question))
	}, [value])

	return (
		<RadioGroup
			key={question.id + "radiogroup"}
			width="100%"
			height="100%"
			onChange={setValue}
			value={question?.answer?.toString()}
			p="4"
			colorScheme={"blackAlpha"}
		>
			<Flex
				width="100%"
				height="100%"
				flex="4 1 0%"
				wrap="wrap"
				alignItems="stretch"
				alignContent="stretch"
				py="4"
			>
				<Answer key="inp1" question={props.question} color="red.400">
					<Radio key={question.id + "radio0"} value="0"></Radio>
					<Flex flex="1" justifyContent={"center"} alignItems="center">
						<TriangleUpIcon width={"32px"} height={"40px"} marginX="8px" />
					</Flex>
					<Input
						key={question.id + "0"}
						defaultValue={multipleChoice[0] || undefined}
						onChange={(event) => handleChange(event, 0)}
					></Input>
				</Answer>
				<Answer key="inp2" question={props.question} color="yellow.600">
					<Radio key={question.id + "radio1"} value="1"></Radio>
					<Flex flex="1" justifyContent={"center"} alignItems="center">
						<Square size={"24px"} marginX="10px" bgColor="#FFF" />
					</Flex>
					<Input
						key={question.id + "0"}
						defaultValue={multipleChoice[1] || undefined}
						onChange={(event) => handleChange(event, 1)}
					></Input>
				</Answer>
				<Answer key="inp3" question={props.question} color="blue.400">
					<Radio key={question.id + "radio2"} value="2"></Radio>
					<Flex flex="1" justifyContent={"center"} alignItems="center">
						<Circle size={"24px"} marginX="10px" bgColor="#FFF" />
					</Flex>
					<Input
						key={question.id + "0"}
						defaultValue={multipleChoice[2] || undefined}
						onChange={(event) => handleChange(event, 2)}
					></Input>
				</Answer>
				<Answer key="inp4" question={props.question} color="green.500">
					<Radio key={question.id + "radio3"} value="3"></Radio>
					<Flex flex="1" justifyContent={"center"} alignItems="center">
						<StarIcon width={"24px"} height={"24px"} marginX="10px" />
					</Flex>
					<Input
						key={question.id + "0"}
						defaultValue={multipleChoice[3]}
						onChange={(event) => handleChange(event, 3)}
					></Input>
				</Answer>
			</Flex>
		</RadioGroup>
	)
}

export default CAnswerList
