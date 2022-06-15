/** @format */

import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import FallbackUI from "./components/FallbackUI"
import NotFound from "./components/NotFound"
import AuthGuard from "./hoc/AuthGuard"
import Layout from "./hoc/Layout"
import Login from "./pages/Account/Login"
import Register from "./pages/Account/Register"
import Home from "./pages/Home"
import { Library } from "./pages/Library"
import MyKahoot from "./pages/MyKahoot"
import { ViewQuestionPage, JoinRoomPage } from "./pages/Game"

function App() {
	return (
		<Suspense fallback={<FallbackUI />}>
			<AuthGuard>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="my-library" element={<Library />} />
						<Route path="details/:id" element={<MyKahoot />} />
						<Route path="play" element={<ViewQuestionPage />} />
						<Route path="join" element={<JoinRoomPage />} />
					</Routes>
				</Layout>
			</AuthGuard>
			<Routes>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	)
}

export default App
