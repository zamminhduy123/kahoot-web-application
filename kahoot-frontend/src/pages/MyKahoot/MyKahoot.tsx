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
	Progress,
	Show,
	Toast,
	useToast,
	VStack,
	Image,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import Socket from "../../api/socket"
import QuestionList from "../../components/QuestionList"
import { useAppDispatch, useAppSelector } from "../../hook"
import { setNewGame } from "../../model/reducers/game.reducer"
import logo from "../../assets/logo.png"
import { getGameById } from "../../api"
import { ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { deleteGame } from "../../api/api"
import { deleteGameById } from "../../model/reducers/library.reducer"
import { Game } from "../../model/interface/game.model"

interface MyKahootProps {}

const MyKahoot = ({}: MyKahootProps) => {
	const { games } = useAppSelector((state) => state.library)
	const navigate = useNavigate()
	const { id } = useParams()
	const [progress, setProgress] = useState("none")

	const toast = useToast()

	const dispatch = useAppDispatch()
	const data: Game | undefined = games.find((g) => g._id === id)
	console.log(data)
	if (data === undefined) {
		navigate("../login")
		return <></>
	}
	const { _id, questionList, title, image } = data

	const gameHostSuccess = (payload: {
		pin: string
		title: string
		ownerName: string
		totalQuestions: number
		image: string
	}) => {
		console.log("GAME CREATED", payload)
		dispatch(setNewGame({ ...payload, players: [] }))
		setTimeout(() => {
			navigate("../../host")
			console.log("NAVIGATED")
		}, 2400)
	}

	//host game
	const startGame = () => {
		setProgress("flex")
		Socket.getInstance().emit("host-join", { id: id }, gameHostSuccess)
	}

	//delete
	const deleteItem = async () => {
		try {
			const res = await deleteGame(id!)
			console.log(res)
			dispatch(deleteGameById(id!))
			toast({
				title: "Deleted",
				description: "Game deleted.",
				status: "success",
				duration: 2000,
				isClosable: true,
			})
			navigate("/my-library", { replace: true })
		} catch (error) {
			console.log(error)
			toast({
				title: "Deleted Error",
				description: "Something went wrong!",
				status: "error",
				duration: 2000,
				isClosable: true,
			})
		}
	}

	return (
		<>
			<Progress
				size="md"
				w="100%"
				minH="8px"
				colorScheme="pink"
				isIndeterminate
				display={progress}
			/>
			<Flex w={"100%"} h="100%" direction={"row"}>
				<Show above="md">
					<Flex
						w="23rem"
						h={"100%"}
						boxShadow={"rgb(0 0 0 / 5%) 0.25rem 0px 0.5rem 0px"}
						direction={"column"}
					>
						<Center>
							<Image
								style={{ width: "16rem" }}
								maxH="10rem"
								src={
									image ||
									"https://assets-cdn.kahoot.it/builder/v2/assets/placeholder-cover-kahoot.dca23b0a.png"
								}
								alt="logo"
								objectFit={"cover"}
							/>
						</Center>
						<Flex
							p={4}
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
										<MenuItem
											icon={<DeleteIcon />}
											onClick={() => deleteItem()}
										>
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
							<Image
								style={{ width: "10rem" }}
								maxH="10rem"
								src={
									image ||
									"https://assets-cdn.kahoot.it/builder/v2/assets/placeholder-cover-kahoot.dca23b0a.png"
								}
								alt="logo"
								objectFit={"cover"}
							/>
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
					<QuestionList questions={questionList} />
				</VStack>
			</Flex>
		</>
	)
}

export default MyKahoot
