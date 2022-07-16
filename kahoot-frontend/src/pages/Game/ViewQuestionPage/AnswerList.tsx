/** @format */

import { Box, Flex } from "@chakra-ui/react"
import { FunctionComponent, useState } from "react"
import { IMultipleChoice } from "../../../model/interface"

interface AnswerListProps {
	answers: IMultipleChoice
	correct: number
	handleClick: any
	isPlaying: any
}

interface AnswerProp {
	value: string
	isCorrect: boolean
	color: string
	onClick: any
	isPlaying: boolean
}

const Answer: FunctionComponent<AnswerProp> = (props) => {
	const { value, isCorrect, color, onClick, isPlaying } = props
	const onAnswerClick = () => {
		console.log("click answer")
		onClick()
	}
	return (
		<Box
			as="button"
			position="relative"
			display="flex"
			flex={"1 0 auto"}
			width="calc(50% - 3rem)"
			minH="2.25rem"
			maxW="100%"
			mr="0.5rem"
			mb="0.5rem"
			color="white"
			p="2"
			bg={isPlaying ? color : isCorrect ? "green.600" : "red.500"}
			fontSize="2xl"
			alignItems="center"
			onClick={onAnswerClick}
			disabled={!isPlaying}
			boxShadow="inner"
		>
			<Box flex="1">{value}</Box>
		</Box>
	)
}

const AnswerList: FunctionComponent<AnswerListProps> = (props) => {
	const { correct, isPlaying } = props
	const handleClickAnswer = () => {
		console.log("clicked")
		props.handleClick()
	}

	return (
		<Flex
			width="100%"
			height="100%"
			flex="4 1 0%"
			wrap="wrap"
			alignItems="stretch"
			alignContent="stretch"
			py="4"
		>
			<Answer
				value={props.answers[0]}
				color="red.400"
				onClick={handleClickAnswer}
				isCorrect={correct === 0}
				isPlaying={isPlaying}
			></Answer>
			<Answer
				value={props.answers[1]}
				color="yellow.600"
				onClick={handleClickAnswer}
				isCorrect={correct === 1}
				isPlaying={isPlaying}
			></Answer>
			<Answer
				value={props.answers[2]}
				color="blue.400"
				onClick={handleClickAnswer}
				isCorrect={correct === 2}
				isPlaying={isPlaying}
			></Answer>
			<Answer
				value={props.answers[3]}
				color="green.500"
				onClick={handleClickAnswer}
				isCorrect={correct === 3}
				isPlaying={isPlaying}
			></Answer>
		</Flex>
	)
}

export default AnswerList
