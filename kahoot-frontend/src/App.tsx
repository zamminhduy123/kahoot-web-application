/** @format */

import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import FallbackUI from "./components/FallbackUI"
import NotFound from "./components/NotFound"
import Layout from "./hoc/PrivateRoutesLayout"
import Login from "./pages/Account/Login"
import Register from "./pages/Account/Register"
import Home from "./pages/Home"
import { Library } from "./pages/Library"
import MyKahoot from "./pages/MyKahoot"
import { ViewQuestionPage, JoinRoomPage, HostingMode } from "./pages/Game"
import AuthGuard from "./hoc/AuthGuard"
import PrivateRoutesLayout from "./hoc/PrivateRoutesLayout"
import {Creator} from "./pages/Creator"
import GameEnter from "./hoc/GameEnter/GameEnter"
import PlayingMode from "./pages/Game/ViewQuestionPage/PlayerGamePage"

function App() {
	return (
		<>
			<Suspense fallback={<FallbackUI />}>
				<Routes>
					<Route
						path="/"
						element={<PrivateRoutesLayout children={<Home />} />}
					/>
					<Route
						path="my-library"
						element={<PrivateRoutesLayout children={<Library />} />}
					/>
					<Route
						path="details/:id"
						element={<PrivateRoutesLayout children={<MyKahoot />} />}
					/>
					<Route
						path="creator"
						element={<PrivateRoutesLayout header={false} children={<Creator />} />}
					/>
					<Route
						path="host"
						element={<PrivateRoutesLayout header={false} children={<HostingMode />} />}
					/>
					
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route
						path="play"
						element={<GameEnter children={<PlayingMode />} />}
					/>
					
					<Route path="join" element={<JoinRoomPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</>
	)
}

export default App
