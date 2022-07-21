/** @format */

import {
	Box,
	Flex,
	Stack,
	Link,
	useColorModeValue,
	useDisclosure,
	Image,
	Spacer,
	Center,
	Button,
	Icon,
	HStack,
	IconButton,
	Show,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Input,
} from "@chakra-ui/react"
import { Link as ReachLink, useLocation, useNavigate } from "react-router-dom"
import RightSideDrawer from "./RightSideDrawer"
import { IUser } from "../../model/interface/user.model"
import {
	RiAddCircleLine,
	RiGamepadLine,
	RiHome4Line,
	RiListUnordered,
} from "react-icons/ri"
import logo from "../../assets/logo.png"

import "./Header.scss"
import { IconType } from "react-icons"
import { Dispatch, SetStateAction } from "react"
import { HamburgerIcon } from "@chakra-ui/icons"
import React from "react"

interface DesktopNavProps {
	activePath: string
}

const DesktopNav = ({ activePath }: DesktopNavProps) => {
	const linkColor = useColorModeValue("gray.900", "brand.200")
	const linkHoverColor = useColorModeValue("brand.600", "white")
	return (
		<Stack display={{ base: "none", sm: "flex" }} direction={"row"} h="100%">
			{NAV_ITEMS.map((navItem) => {
				const className = [
					"nav-item-link",
					activePath == navItem.href && "selected",
				].join(" ")
				return (
					<Box className={className} key={navItem.label}>
						<Flex h="100%" alignItems="center">
							{navItem.icon && <Icon h="100%" w="25%" as={navItem.icon} />}
							<Link
								as={ReachLink}
								px={2}
								fontSize={"sm"}
								fontWeight={"semibold"}
								color={linkColor}
								style={{ textDecoration: "none" }}
								to={navItem.href ?? "#"}
							>
								{navItem.label}
							</Link>
						</Flex>
					</Box>
				)
			})}
		</Stack>
	)
}

interface NavItem {
	label: string
	icon?: IconType
	href?: string
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: "Home",
		icon: RiHome4Line,
		href: "/",
	},
	{
		label: "Library",
		icon: RiListUnordered,
		href: "/my-library",
	},
]

export interface PublicHeaderProps {
	user: IUser | null
}

const Header = (props: PublicHeaderProps) => {
	const navigate = useNavigate()
	const location = useLocation()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = React.useRef()
	const activePath = location.pathname

	const MobileDrawer = () => {
		return (
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef as any}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Create your account</DrawerHeader>

					<DrawerBody>
						<Input placeholder="Type here..." />
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme="blue">Save</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<HStack
			borderBottom={1}
			borderStyle={"solid"}
			borderColor={useColorModeValue("gray.200", "gray.900")}
			bg={useColorModeValue("white", "gray.800")}
			color={useColorModeValue("gray.600", "white")}
			zIndex={100}
			position="relative"
			top="0"
			flexWrap="wrap"
			px="2"
		>
			<Flex
				w="100%"
				minH="60px"
				flex={{ base: 1 }}
				justify={{ base: "center", md: "start" }}
			>
				<Link href="/">
					<Center h="100%" display={{ base: "none", md: "flex" }}>
						<Image minW="80px" maxW="100px" p="4" src={logo} />
					</Center>
				</Link>
				<Flex justifyContent="center" alignItems="center" ml={{ md: "10" }}>
					<DesktopNav activePath={activePath} />
				</Flex>

				<HStack ml={{ md: "auto" }}>
					<Button
						w="120px"
						variant="solid"
						colorScheme="green"
						fontSize={"m"}
						fontWeight={"bold"}
						onClick={() => {
							navigate("/join")
						}}
						rightIcon={<Icon as={RiGamepadLine} />}
					>
						Play
					</Button>
					<Button
						w="120px"
						variant="solid"
						colorScheme="brand"
						fontSize={"m"}
						fontWeight={"bold"}
						onClick={() => {
							navigate("/creator")
						}}
						rightIcon={<Icon as={RiAddCircleLine} />}
					>
						Create
					</Button>

					<IconButton
						ref={btnRef as any}
						onClick={onOpen}
						aria-label="Menu"
						icon={<HamburgerIcon />}
						display={{ base: "flex", md: "none" }}
					/>

					<MobileDrawer />

					<Flex display={{ base: "none", md: "flex" }}>
						<RightSideDrawer user={props.user} />{" "}
					</Flex>
				</HStack>
			</Flex>
		</HStack>
	)
}

export default Header
