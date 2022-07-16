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
import React from "react"
import { Children, FunctionComponent } from "react"
import { Link } from "react-router-dom"
import Socket from "../../api/socket"
import { useAppDispatch, useAppSelector } from "../../hook"
import { setPlayers } from "../../model/reducers/players.reducer"
import Leaderboards from "./Leaderboards"
import ViewQuestionPage from "./ViewQuestionPage/ViewQuestionPage"
import WaitingRoom from "./WaitingRoom"

const PlayingMode = (props: any) => {
	const [isPlaying, setIsPlaying] = useBoolean(false)
	const quiz = {
		title:
			"How Well Do You Know the U.S. Census Bureau? (Middle/high school version)",
		author: "ngduytkim",
		totalQuestions: 24,
		maxPlayers: 50,
	}
	const { players } = useAppSelector((state) => state.player);
	const dispatch = useAppDispatch();
	React.useEffect(()=> {
		Socket.getInstance().registerListener(
			"updatePlayerLobby",
			(playersInGame: any) => {
			  dispatch(
				setPlayers(
				  playersInGame.map((p: any) => {
					return {
					  name: p.name,
					  score: p.score,
					};
				  })
				)
			  );
			}
		  );
		  return () => {
			  Socket.getInstance().removeRegisteredListener("updatePlayerLobby")
		  }
	},[])
	return (
		<Container
			bg="black"
			minWidth="100vw"
			minHeight="100vh"
			py="6"
			centerContent
		>
			{isPlaying ? <ViewQuestionPage /> : <WaitingRoom quiz={quiz} players={players} />}
			{/* <Leaderboards question={""} users={[]}></Leaderboards> */}
		</Container>
	)
}

export default PlayingMode
