/** @format */

import { Box, Flex } from "@chakra-ui/react"
import { FunctionComponent, useState } from "react"

interface AnswerListProps {
	answers: any[]
	correct: number
}

interface AnswerProp {
	value: string
	isCorrect: boolean
	color: string
	onClick: any
	isClicked?: boolean
}

const Answer: FunctionComponent<AnswerProp> = (props) => {
	const { value, isCorrect, color, onClick, isClicked } = props
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
			bg={isClicked ? (isCorrect ? "green.600" : "red.500") : color}
			fontSize="2xl"
			alignItems="center"
			onClick={onAnswerClick}
			disabled={isClicked}
		>
			<Box flex="1">{value}</Box>
		</Box>
	)
}

const AnswerList: FunctionComponent<AnswerListProps> = (props) => {
	const [isClicked, setIsClicked] = useState<boolean>(false)

	const handleClickAnswer = () => {
		console.log("clicked")
		setIsClicked(true)
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
				isCorrect={props.correct === 0}
				isClicked={isClicked}
			></Answer>
			<Answer
				value={props.answers[1]}
				color="yellow.600"
				onClick={handleClickAnswer}
				isCorrect={props.correct === 1}
				isClicked={isClicked}
			></Answer>
			<Answer
				value={props.answers[2]}
				color="blue.400"
				onClick={handleClickAnswer}
				isCorrect={props.correct === 2}
				isClicked={isClicked}
			></Answer>
			<Answer
				value={props.answers[3]}
				color="green.500"
				onClick={handleClickAnswer}
				isCorrect={props.correct === 3}
				isClicked={isClicked}
			></Answer>
		</Flex>
	)
}

export default AnswerList
