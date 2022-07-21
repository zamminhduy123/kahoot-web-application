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
import { FunctionComponent, useRef, useState } from "react"
import { BsFillFileEarmarkImageFill } from "react-icons/bs"
import { IQuestion } from "../../model/interface"
import { uploadFile } from "../../api/api"

interface ImageInputProps {
	question: IQuestion
}

const ImageInput: FunctionComponent<ImageInputProps> = (props) => {
	const imageInput = useRef<HTMLInputElement>(null)

	const [image, setImage] = useState<null | ArrayBuffer | string>("")
	const [error, setError] = useState("")
	const [imgPrev, setImgPrev] = useState("")

	const handleChange = async (e: any) => {
		const file = e.target.files[0]

		if (!file.type.startsWith("image/")) {
			setError("File must be a picture!")
			return
		}

		const url = URL.createObjectURL(file)
		setImgPrev(url)

		console.log(url)
		const reader = new FileReader()
		reader.readAsDataURL(file)

		/* 
		reader.onload = () => {
			setImage(reader.result)

			console.log(reader.result)
		} */
		try {
			const res = await uploadFile(file)

			console.log(res)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<VStack gap="4">
				<Button
					colorScheme={"teal"}
					onClick={() => {
						imageInput.current?.click()
					}}
					leftIcon={<Icon as={BsFillFileEarmarkImageFill} />}
				>
					Upload an image
				</Button>
				<Input
					name="image"
					display="none"
					id={"image"}
					key={props.question.id + "image"}
					type="file"
					onChange={(e) => handleChange(e)}
					accept="image/*"
					ref={imageInput}
				/>

				{imgPrev && (
					<Image
						className="preview-image"
						src={imgPrev as string}
						alt="Preview"
						boxSize="100%"
						maxH="400px"
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
