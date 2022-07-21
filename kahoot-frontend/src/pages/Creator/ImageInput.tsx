/** @format */

import { CloseIcon } from "@chakra-ui/icons"
import {
	Center,
	Text,
	Input,
	Image,
	VStack,
	FormControl,
	Button,
	Icon,
} from "@chakra-ui/react"
import { FunctionComponent, useEffect, useRef, useState } from "react"
import { BsFillFileEarmarkImageFill } from "react-icons/bs"
import { IQuestion } from "../../model/interface"
import { uploadFile } from "../../api/api"
import { useAppDispatch } from "../../hook"
import { editQuestionAtIndex } from "../../model/reducers/newQuiz.reducer"

interface ImageInputProps {
	question: IQuestion
}

const ImageInput: FunctionComponent<ImageInputProps> = (props) => {
	const question = { ...props.question }
	const imageInput = useRef<HTMLInputElement>(null)

	const [image, setImage] = useState<null | ArrayBuffer | string>("")
	const [error, setError] = useState("")
	const dispatch = useAppDispatch()

	const handleChange = async (e: any) => {
		const file = e.target.files[0]

		if (!file.type.startsWith("image/")) {
			setError("File must be a picture!")
			return
		}

		/* 
		const url = URL.createObjectURL(file)
		setImgPrev(url) */
		try {
			const res = await uploadFile(file)

			const imageUrl = res.split("?")[0]
			/* 
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			//setImage(reader.result)
			//question.image = image as string
			
		} */

			question.image = imageUrl
			console.log(question)
			dispatch(editQuestionAtIndex(question))
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<VStack
				gap="4"
				minH="250px"
				boxShadow="rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px"
				borderRadius="10px"
			>
				<Button
					position={"absolute"}
					top="300"
					bottom="0"
					colorScheme={"teal"}
					onClick={() => {
						imageInput.current?.click()
					}}
					boxShadow='2xl'
					leftIcon={<Icon as={BsFillFileEarmarkImageFill} />}
				>
					Upload an image
				</Button>
				<Input
					display="none"
					name="image"
					id={"image"}
					key={props.question.id + "image"}
					type="file"
					onChange={(e) => handleChange(e)}
					accept="image/*"
					ref={imageInput}
				/>

				{question.image && (
					<Image
						className="preview-image"
						src={question.image as string}
						alt="Preview"
						boxSize="100%"
						maxH="16rem"
						objectFit={"cover"}
						border="1px solid"
						borderRadius={"10px"}
						borderColor={"gray.200"}
						boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
					/>
				)}
			</VStack>
		</>
	)
}

export default ImageInput
