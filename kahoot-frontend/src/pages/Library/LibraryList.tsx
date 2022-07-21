/** @format */

import {
	border,
	Box,
	Container,
	Flex,
	Heading,
	HStack,
	Icon,
	Input,
	InputGroup,
	InputLeftAddon,
	InputLeftElement,
	Spacer,
	Stack,
	useRadioGroup,
	Text,
	Center,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import RadioCard from "../../components/RadioCard"
import LibraryItem from "./LibraryItem"
import { RiSearchLine } from "react-icons/ri"
import { SearchIcon } from "@chakra-ui/icons"
import { IQuestion } from "../../model/interface/question.model"
import { getAllGames } from "../../api/api"
import { useAppDispatch, useAppSelector } from "../../hook"
import { setNewLibrary } from "../../model/reducers/library.reducer"

interface LibraryListProps {}

const LibraryList = ({}: LibraryListProps) => {
	const { games } = useAppSelector((state) => state.library)
	const dispatch = useAppDispatch()

	const [searchKeyWord, setSearchKeyWord] = React.useState("")

	//fetch data here
	useEffect(() => {
		getAllGames()
			.then((res: any) => {
				console.log(res)
				if (res && res.data) {
					console.log("HI ?")
					dispatch(
						setNewLibrary(
							res.data.games.map((d: any) => {
								console.log(d.image)
								return {
									_id: d._id,
									title: d.title,
									image: d.image,
									owner: d.onwer,
									questionList: d.game.map((question: any) => {
										return {
											id: question._id,
											question: question.question,
											answer: +question.answer,
											multipleChoice: [...question.solution],
											time: question.timeUp,
											image: question.image,
										}
									}),
								}
							})
						)
					)
				}
			})
			.catch((err) => {})
	}, [])

	const options = ["Recents", "Favorite"]

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: "Filter",
		defaultValue: "Recents",
		onChange: console.log,
	})
	const group = getRootProps()

	const [displayGames, setDisplayGames] = React.useState(games)
	React.useEffect(() => {
		setDisplayGames(games)
	}, [games])

	React.useEffect(() => {
		if (searchKeyWord)
			setDisplayGames(
				games.filter((d) =>
					d.title.toLowerCase().startsWith(searchKeyWord.toLowerCase())
				)
			)
		else setDisplayGames(games)
	}, [searchKeyWord])

	return (
		<Container maxW="container.lg" w="100%" flex={1}>
			<Stack justifyContent="center">
				<Flex direction={"row"} margin="10px 0px">
					<Text fontSize="2xl" fontWeight={"600"}>
						My Library
					</Text>
					{/* 
					<HStack {...group} p="0">
						{options.map((value, index) => {
							const radio = getRadioProps({ value })
							return (
								<RadioCard key={index} radioProps={radio}>
									{value}
								</RadioCard>
							)
						})}
					</HStack> */}
					<Spacer />
					<Box>
						<InputGroup>
							<InputLeftElement
								pointerEvents="none"
								children={<SearchIcon color="gray.300" />}
							/>
							<Input
								focusBorderColor="brand.500"
								variant="outline"
								placeholder={`Search`}
								onChange={(e: any) => {
									setSearchKeyWord(e.target.value)
								}}
							/>
						</InputGroup>
					</Box>
				</Flex>
				{displayGames.length ? (
					displayGames.map((data: any, index: number) => {
						return (
							<LibraryItem
								id={data._id}
								key={`${data._id}-${index}`}
								name={data.title}
								image={data.image}
								totalQuestion={data.questionList.length}
							/>
						)
					})
				) : (
					<Center width="100%">
						<img
							width={"400px"}
							src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?t=st=1658418266~exp=1658418866~hmac=e403902abc854ef3f33d8ca6043dac4fb68a8687335b727a3478c23aab132f49&w=826"
						/>
					</Center>
				)}
			</Stack>
		</Container>
	)
}

export default LibraryList
