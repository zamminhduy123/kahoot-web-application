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
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import RadioCard from "../../components/RadioCard"
import LibraryItem from "./LibraryItem"
import { RiSearchLine } from "react-icons/ri"
import { SearchIcon } from "@chakra-ui/icons"
import { IQuestion } from "../../model/interface/question.model"
import { getAllGames } from "../../api/api"

interface LibraryListProps {}

const LibraryList = ({}: LibraryListProps) => {
	const [games, setGames] = useState<any>([])

	//fetch data here
	useEffect(() => {
		const fetchGames = async () => {
			const res = await getAllGames()
			setGames(res.data.games)
		}
		fetchGames()
	}, [])

	const fakeData = [
		{
			name: "Kahoot_1",
			totalQuestion: 5,
		},
	]

	const options = ["Recents", "Favorite"]

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: "Filter",
		defaultValue: "Recents",
		onChange: console.log,
	})
	const group = getRootProps()

	return (
		<Container maxW="container.lg">
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
							/>
						</InputGroup>
					</Box>
				</Flex>
				{games.map((data: any, index: number) => {
					return (
						<LibraryItem
							id={index}
							key={`${data._id}-${index}`}
							name={data.title}
							totalQuestion={data.game.length}
						/>
					)
				})}
			</Stack>
		</Container>
	)
}

export default LibraryList
