/** @format */

import { FunctionComponent } from "react"
import React, { useState, useEffect } from "react"
import { IQuestion } from "../../model/interface"
import QuestionItem from "../../components/QuestionItem/QuestionItem"
import QuizItem from "./QuizItem"
import { Container, Box, Badge, Center, Wrap } from "@chakra-ui/react"

interface WaitingRoomProps {
	quiz: any //need model for quiz
}

const WaitingRoom: FunctionComponent<WaitingRoomProps> = (props) => {
	const [players, setPlayers] = useState<any>([])
	const newPlayer = true

	const handleAddPlayer = (newPlayer: any) => {
		console.log("add new player")
		const newPlayerArr = [...(players ?? []), newPlayer]
		setPlayers(newPlayerArr)
	}

	const renderPlayers = () => {
		return (
			<>
				{players.map((person: any, index: number) => (
					<Box
						bg="blackAlpha.400"
						key={index}
						py="4"
						px="10"
						fontSize="2xl"
						fontWeight="bold"
						color="white"
					>
						{person.name}
					</Box>
				))}
			</>
		)
	}

	useEffect(() => {
		handleAddPlayer({ name: "Kim" })
	}, [])

	return (
		<Box
			display="flex"
			flexDirection="column"
			maxW="lg"
			justifyContent="center"
			alignItems="center"
		>
			<Box
				display="flex"
				flexDirection="column"
				maxW="md"
				justifyContent="center"
				alignItems="center"
			>
				<QuizItem {...props.quiz}></QuizItem>
				<Badge
					borderRadius="full"
					px="2"
					colorScheme="orange"
					fontSize="lg"
					my="4"
					textAlign="center"
				>
					{props.quiz.totalQuestions} Questions
				</Badge>
			</Box>
			<Wrap width="100%" mt="8" spacing="8" justify="center">
				{renderPlayers()}
			</Wrap>
		</Box>
	)
}

export default WaitingRoom
