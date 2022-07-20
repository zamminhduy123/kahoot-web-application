/** @format */

import {
	Box,
	Button,
	Center,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	HStack,
	Input,
	useDisclosure,
	VStack,
} from "@chakra-ui/react"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../hook"
import { IQuestion } from "../../model/interface"
import { editQuestionAtIndex } from "../../model/reducers/newQuiz.reducer"
import CAnswerList from "./AnswerList"
import NewQuestionList from "./NewQuestionList"
import QuestionInformation from "./QuestionInformation"

interface MainDisplayProps {
	question?: IQuestion
}

const MainDisplay = ({}: MainDisplayProps) => {
	const { list, selected } = useAppSelector((state) => state.newQuiz)
	const question = { ...list[selected] }
	const dispatch = useAppDispatch()

	const { isOpen, onOpen, onClose } = useDisclosure()
	const {
		isOpen: isQListOpen,
		onOpen: onQListOpen,
		onClose: onQListClose,
	} = useDisclosure()
	const btnRef = React.useRef()
	const btnQListRef = React.useRef()

	return (
		<HStack>
			<VStack
				h="100%"
				minHeight="80vh"
				padding={{ sm: "12px", lg: "12px 32px" }}
			>
				<Box w={"90%"} mb="2">
					<Input
						height={"60px"}
						fontSize="1.5em"
						placeholder="Your question title"
						defaultValue={question.question || "Your question title.."}
						textAlign={"center"}
						boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const value = event.target.value.trim()
							if (value) {
								question.question = value
							} else {
								question.question = "Your question title"
							}
							dispatch(editQuestionAtIndex(question))
						}}
					/>
				</Box>
				<HStack>
					<Button
						display={{ base: "flex", md: "none" }}
						ref={btnQListRef as any}
						colorScheme="brand"
						onClick={onQListOpen}
						size="md"
					>
						Questions
					</Button>
					<Button
						display={{ base: "flex", md: "none" }}
						ref={btnRef as any}
						colorScheme="blue"
						onClick={onOpen}
						size="md"
					>
						Settings
					</Button>
				</HStack>

				<Center w="100%" margin="22px 0px">
					<Center
						minH="4rem"
						width="80%"
						h={"20rem"}
						border="1px solid"
						borderRadius={"10px"}
						borderColor={"gray.200"}
						boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
					>
						<Button></Button>
					</Center>
				</Center>
				<CAnswerList question={question} />
			</VStack>
			<Flex
				display={{ base: "none", md: "flex" }}
				width={"fit-content"}
				minWidth="16em"
				height="100%"
				padding="16px"
				direction={"column"}
				boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
			>
				<QuestionInformation question={question} />
			</Flex>

			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef as any}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Settings</DrawerHeader>

					<DrawerBody>
						<QuestionInformation question={question} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			<Drawer
				isOpen={isQListOpen}
				placement="left"
				onClose={onQListClose}
				finalFocusRef={btnQListRef as any}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Questions</DrawerHeader>

					<DrawerBody>
						<NewQuestionList list={list} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</HStack>
	)
}

export default MainDisplay
