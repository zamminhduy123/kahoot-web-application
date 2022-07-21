/** @format */

import {
	Box,
	Button,
	Center,
	Checkbox,
	Flex,
	HStack,
	Icon,
	Spacer,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react"
import React from "react"
import { RiPencilFill, RiMore2Fill } from "react-icons/ri"
import { IQuestion } from "../../model/interface"

interface QIProps {
	question: IQuestion
}

const QuestionItem = ({question}: QIProps) => {
	console.log(question.multipleChoice[0])
	return (
		<Flex
			w="100%"
			direction={"column"}
			borderRadius={"4px"}
			bg="white"
			boxShadow={"rgb(0 0 0 / 15%) 0px 2px 4px 0px"}
			margin={"5px 0px"}
			padding={"4px"}
			transition={"all .2s ease-in-out"}
			_hover={{
				cursor: "pointer",
				transform: "scale(1.01)",
			}}
		>
			<Flex direction={"row"}>
				<Flex grow={"1"} direction={"column"}>
					<Flex
						width={"100%"}
						alignSelf={"flex-start"}
						align="center"
						direction={"row"}
						minH={"52px"}
					>
						<Center>
							<Box margin={"16px"} fontWeight={"bold"}>
								{question.question}
							</Box>
						</Center>
					</Flex>
					<Spacer />
					<Flex
						width={"100%"}
						alignSelf={"flex-start"}
						align="center"
						direction={"row"}
						minH={"52px"}
					>
						<Center>
							<Box margin={"16px"} fontWeight={"bold"}>
								Time: {question.time} seconds
							</Box>
						</Center>
					</Flex>
				</Flex>
				<Flex w="170px" marginRight={"5px"}>
					<img
						style={{ width: "170px" }}
						src={
							question.image ||
							"https://assets-cdn.kahoot.it/builder/v2/assets/placeholder-cover-kahoot.dca23b0a.png"
						}
						alt="question cover"
					/>
				</Flex>
			</Flex>
			<Flex h={"30"} direction={"row"} flex="1" padding="16px">
				<Flex flex="1">{`A. ${question.multipleChoice[0]}`}</Flex>
				<Flex flex="1">{`B. ${question.multipleChoice[1]}`}</Flex>
			</Flex>
			<Flex h={"30"} direction={"row"} flex="1" padding="16px">
				<Flex flex="1">{`C. ${question.multipleChoice[2]}`}</Flex>
				<Flex flex="1">{`D. ${question.multipleChoice[3]}`}</Flex>
			</Flex>
		</Flex>
	)
}

export default QuestionItem
