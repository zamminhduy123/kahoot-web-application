/** @format */

import axios, { Axios, AxiosRequestConfig } from "axios"
import { AxiosResponse, AxiosError } from "axios"
import { IUser } from "../model/interface"

const DEFAULT_URL = "http://localhost:5000/api/v1"

const requestHeader = () => {
	const acc = window.localStorage.getItem("accessToken"),
		ref = window.localStorage.getItem("refreshToken")
	console.log(acc, ref)
	return {
		authorization: `Bearer ${acc || ""}`,
		refresh: ref || "",
	}
}

export const login = async (
	email: string,
	password: string
): Promise<AxiosResponse> => {
	return new Promise<AxiosResponse>(async (resolve, reject) => {
		const requestOptions = {
			method: "POST",
			url: `${DEFAULT_URL}/auth/login`,
			data: {
				email,
				password,
			},
		}
		axios(requestOptions)
			.then((response: AxiosResponse) => {
				resolve(response)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

export const autoLogin = async (): Promise<AxiosResponse> => {
	return new Promise<AxiosResponse>(async (resolve, reject) => {
		const requestOptions: AxiosRequestConfig = {
			method: "GET",
			url: `${DEFAULT_URL}/auth/auto-login`,
			headers: requestHeader(),
		}
		axios(requestOptions)
			.then((response: AxiosResponse) => {
				resolve(response)
			})
			.catch((err: AxiosError) => {
				reject(err)
			})
	})
}

export const signUp = async (
	email: string,
	password: string,
	name: string
): Promise<AxiosResponse> => {
	return new Promise<AxiosResponse>(async (resolve, reject) => {
		const requestOptions = {
			method: "POST",
			url: `${DEFAULT_URL}/auth/register`,
			data: {
				email,
				password,
				name,
			},
		}
		axios(requestOptions)
			.then((response: AxiosResponse) => {
				resolve(response)
			})
			.catch((err: AxiosError) => {
				reject(err)
			})
	})
}

export const addNewGame = async (
	title: string,
	gameQuestions: any[],
	image: string
): Promise<AxiosResponse> => {
	return new Promise<AxiosResponse>(async (resolve, reject) => {
		const requestOptions = {
			method: "POST",
			url: `${DEFAULT_URL}/game`,
			data: {
				title,
				game: gameQuestions,
				image,
			},
			headers: requestHeader(),
		}
		axios(requestOptions)
			.then((response: AxiosResponse) => {
				resolve(response)
			})
			.catch((err: AxiosError) => {
				reject(err)
			})
	})
}

export const getAllGames = async (): Promise<AxiosResponse> => {
	return new Promise<AxiosResponse>(async (resolve, reject) => {
		const requestOptions = {
			method: "GET",
			url: `${DEFAULT_URL}/game`,
			headers: requestHeader(),
		}
		axios(requestOptions)
			.then((response: AxiosResponse) => {
				resolve(response)
			})
			.catch((err: AxiosError) => {
				reject(err)
			})
	})
}

export const uploadFile = async (
	file: File | Blob,
	extraConfig?: AxiosRequestConfig<File>
) => {
	const axiosClient = axios.create({
		baseURL: `${DEFAULT_URL}/s3`,
	})

	const getSignedUrl = () => {
		const url = `/upload`
		return axiosClient.get(url)
	}

	const responseData = await axios({
		method: "GET",
		url: `${DEFAULT_URL}/s3/upload`,
	})

	const { url } = responseData.data
	const signedURL = url

	const config: AxiosRequestConfig<File> = {
		...extraConfig,
		headers: {
			"Content-Type": file.type,
		},
	}
	await axiosClient.put(signedURL, file, config)
	return url
}

export const getGameById = async (id: string) => {
	console.log("get game by id ", id)
	const res = await getAllGames()
	const gameAtId = res?.data?.games[id]
	return gameAtId
}

export const deleteGame = async (id: string): Promise<AxiosResponse> => {
	console.log("deleting game ", id)
	return new Promise<AxiosResponse>(async (resolve, reject) => {
		const requestOptions = {
			method: "DELETE",
			url: `${DEFAULT_URL}/game/${id}`,
			headers: requestHeader(),
		}
		axios(requestOptions)
			.then((response: AxiosResponse) => {
				resolve(response)
			})
			.catch((err: AxiosError) => {
				reject(err)
			})
	})
}
