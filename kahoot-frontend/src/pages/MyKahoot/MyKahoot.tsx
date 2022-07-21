/** @format */

import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Hide,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Show,
	Toast,
	useToast,
	VStack,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import Socket from "../../api/socket"
import QuestionList from "../../components/QuestionList"
import { useAppDispatch } from "../../hook"
import { setNewGame } from "../../model/reducers/game.reducer"
import logo from "../../assets/logo.png"
import { getGameById } from "../../api"
import { ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { deleteGame } from "../../api/api"
interface MyKahootProps {}

const MyKahoot = ({}: MyKahootProps) => {
	const { id } = useParams()
	const [game, setGame] = useState<any>([])
	const [title, setTitle] = useState<string>("")
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [gameId, setGameId] = useState<any>("")
	const toast = useToast()

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

		const fetchQuestions = async () => {
			const res = await getGameById(id as string)

			console.log(res)
			setGame(res.game)
			setTitle(res.title)
			setGameId(res._id)
		}
		if (id) {
			fetchQuestions()
		}
	}, [id])

	//delete
	const deleteItem = async () => {
		try {
			const res = await deleteGame(gameId)
			console.log(res)

			toast({
				title: "Deleted",
				description: "Game deleted.",
				status: "success",
				duration: 9000,
				isClosable: true,
			})
			navigate("/my-library", { replace: true })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Flex w={"100%"} h="100%" direction={"row"}>
			<Show above="md">
				<Flex
					w="23rem"
					h={"100%"}
					boxShadow={"rgb(0 0 0 / 5%) 0.25rem 0px 0.5rem 0px"}
					direction={"column"}
				>
					<Center margin="4">
						<img style={{ width: "16rem" }} src={logo} alt="logo" />
					</Center>
					<Flex
						p={2}
						w="100%"
						justify={"flex-start"}
						direction="column"
						flexGrow={"1"}
					>
						<Heading margin="10px 0px">{title}</Heading>
						<HStack margin="10px 0px">
							<Button
								variant="solid"
								colorScheme={"brand"}
								onClick={() => startGame()}
							>
								START
							</Button>
							<Menu>
								<MenuButton
									as={IconButton}
									aria-label="Options"
									icon={<ChevronDownIcon />}
									variant="outline"
								/>
								<MenuList>
									<MenuItem icon={<EditIcon />}>Edit</MenuItem>
									<MenuItem icon={<DeleteIcon />} onClick={() => deleteItem()}>
										Delete
									</MenuItem>
								</MenuList>
							</Menu>
						</HStack>
						{/* 
					<Box margin="10px 0px" color={"gray.500"}>
						Status
					</Box>
					<Box margin="10px 0px" color={"gray.500"}>
						Updated ...
					</Box> */}
					</Flex>
				</Flex>
			</Show>
			<VStack
				w="100%"
				bg={"gray.100"}
				p={"16px"}
				style={{ height: "calc(100%-60px)" }}
			>
				<Hide above="md">
					<VStack>
						<img style={{ width: "10rem" }} src={logo} alt="logo" />
						<Heading margin="10px 0px">{title}</Heading>
						<HStack margin="10px 0px">
							<Button
								variant="solid"
								colorScheme={"brand"}
								onClick={() => startGame()}
							>
								START
							</Button>
							<Menu>
								<MenuButton
									as={IconButton}
									aria-label="Options"
									icon={<ChevronDownIcon />}
									variant="outline"
								/>
								<MenuList>
									<MenuItem icon={<EditIcon />}>Edit</MenuItem>
									<MenuItem icon={<DeleteIcon />}>Delete</MenuItem>
								</MenuList>
							</Menu>
						</HStack>
					</VStack>
				</Hide>
				<QuestionList questions={game} />
			</VStack>
		</Flex>
	)
}

export default MyKahoot
