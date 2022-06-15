/** @format */

import {
	extendTheme,
	withDefaultColorScheme,
	theme as baseTheme,
} from "@chakra-ui/react"

const theme = extendTheme(
	{
		colors: {
			brand: {
				"50": "#FFF0E5",
				"100": "#FFD6B8",
				"200": "#FFBB8A",
				"300": "#FFA05C",
				"400": "#FF862E",
				"500": "#FF6B00",
				"600": "#CC5600",
				"700": "#994000",
				"800": "#662B00",
				"900": "#331500",
			},
			black: "#273151",
			muted: "#A4B0BE",
			bg: "#FAFBFC",
			bgActive: "#EBECF0",
			main: "#243151",
			heading: "#CC5600",
			semiHeading: "#FF6B00",
			subHeading: "#767E86",
			mainBg: "#FF6B00",
			sub: "#727A82",
			ter: "#00c6c0",
			semi: "#e8efff",
			semiActive: "#2222220d",
			active: "#eff6ff",
			secondaryMuted: "#717171",
			info: "#4457f7",
			border: "#E4E4E4",
		},
		fonts: {
			body: "'Poppins', sans-serif",
			heading: "'Poppins', sans-serif",
			mono: "Menlo, monospace",
		},
		components: {
			Button: {
				baseStyle: {
					borderRadius: "4px",
					_focus: {
						boxShadow: "none",
					},
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					fontFamily: "'Poppins', sans-serif",
					fontWeight: "semi-bold",
					transition: "all .2s",
				},
			},
			Heading: {
				baseStyle: {
					color: "heading",
					fontWeight: "semibold",
				},
			},
			IconButton: {
				baseStyle: {
					_focus: {
						boxShadow: "none",
					},
				},
			},
			Link: {
				baseStyle: {
					_focus: {
						boxShadow: "none",
					},
				},
			},
			Input: {
				baseStyle: {
					border: "1px",
					borderStyle: "solid",
					borerColor: "#E4E4E4",
					borderRadius: "10px",
					_focus: {
						boxShadow: "none",
					},
				},
			},
			NumberInput: {
				baseStyle: {
					_focus: {
						boxShadow: "none",
					},
				},
			},
			NumberInputField: {
				baseStyle: {
					_focus: {
						boxShadow: "none",
					},
				},
			},
			Text: {
				baseStyle: {
					color: "black",
				},
			},
		},
		shadows: {
			base: "0 15px 35px rgb(0 0 0 / 7%)",
		},
	},
	withDefaultColorScheme({ colorScheme: "brand" })
)

export default theme
