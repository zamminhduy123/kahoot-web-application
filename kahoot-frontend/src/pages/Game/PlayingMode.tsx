/** @format */

import {
	Box,
	Circle,
	Square,
	Container,
	FormControl,
	FormLabel,
	Input,
	Button,
	useBoolean,
} from "@chakra-ui/react"
import { Children, FunctionComponent } from "react"
import { Link } from "react-router-dom"
import ViewQuestionPage from "./ViewQuestionPage/ViewQuestionPage"
import WaitingRoom from "./WaitingRoom"

const PlayingMode = (props: any) => {
	const [isPlaying, setIsPlaying] = useBoolean(true)
	const quiz = {
		title:
			"How Well Do You Know the U.S. Census Bureau? (Middle/high school version)",
		author: "ngduytkim",
		totalQuestions: 24,
		maxPlayers: 50,
	}
	return (
		<Container
			bg="black"
			minWidth="100vw"
			minHeight="100vh"
			py="6"
			centerContent
		>
			{isPlaying ? <ViewQuestionPage /> : <WaitingRoom quiz={quiz} />}
		</Container>
	)
}

export default PlayingMode
