/** @format */

import { Box, Button, Flex, Heading, HStack, VStack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import Socket from "../../api/socket"
import QuestionList from "../../components/QuestionList"
import { useAppDispatch } from "../../hook"
import { setNewGame } from "../../model/reducers/game.reducer"
import logo from "../../assets/logo.png"
import { getGameById } from "../../api"
interface MyKahootProps {}

const MyKahoot = ({}: MyKahootProps) => {
	const { id } = useParams()
	const [game, setGame] = useState<any>([])
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const gameHostSuccess = (payload: {
		pin: string
		title: string
		ownerName: string
		totalQuestions: number
	}) => {
		console.log("GAME CREATED")
		dispatch(setNewGame({ ...payload, players: [] }))
		navigate("../../host")
		console.log("NAVIGATED")
	}

	//host game
	const startGame = () => {
		Socket.getInstance().emit(
			"host-join",
			{ id: "62cdc28797a048b061cc295f" },
			gameHostSuccess
		)
	}

	//fetch data here
	useEffect(() => {
		console.log(id)
		const fetchGames = async () => {
			const res = await getGameById(id as string)

			console.log(res)
			setGame(res.data.games)
		}
		fetchGames()
	}, [id])

	return (
		<Flex w={"100%"} h="100%" direction={"row"}>
			<Flex
				w="23rem"
				h={"100%"}
				boxShadow={"rgb(0 0 0 / 5%) 0.25rem 0px 0.5rem 0px"}
				direction={"column"}
			>
				<img style={{ width: "368px" }} src={logo} alt="logo" />
				<Flex
					p={2}
					w="100%"
					justify={"flex-start"}
					direction="column"
					flexGrow={"1"}
				>
					<Heading margin="10px 0px">Kahoot Name</Heading>
					<HStack margin="10px 0px">
						<Button
							variant="solid"
							colorScheme={"brand"}
							onClick={() => startGame()}
						>
							START
						</Button>
						<Button color={"gray.600"} variant="solid"></Button>
					</HStack>
					<Box margin="10px 0px" color={"gray.500"}>
						Status
					</Box>
					<Box margin="10px 0px" color={"gray.500"}>
						Updated ...
					</Box>
				</Flex>
			</Flex>
			<Flex
				flexGrow={1}
				bg={"gray.100"}
				flex="7 1 0px"
				p={"16px"}
				style={{ height: "calc(100%-60px)" }}
			>
				<QuestionList questions={[]} />
			</Flex>
		</Flex>
	)
}

export default MyKahoot
