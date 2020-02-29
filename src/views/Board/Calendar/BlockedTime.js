import React from 'react'
import styled, { keyframes, css } from 'styled-components'

import { isAfter, subHours } from 'date-fns'

const fadeIn = keyframes`
	from {
		transform: scale(0.2);
	}

	to {
		transform: scale(1);
	}
`

const pastStyles = ({ isPast }) =>
	isPast &&
	css`
		opacity: 0.5;
	`

const Container = styled('div')`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	padding: 0 20px;
	overflow: hidden;
	line-height: 28px;
	animation: ${fadeIn} 0.5s ease forwards;

	background: rgba(80, 80, 80, 0.8);

	background-image: linear-gradient(
		45deg,
		rgba(49, 49, 59, 1) 25%,
		rgba(69, 69, 69, 1) 25%,
		rgba(69, 69, 69, 1) 50%,
		rgba(49, 49, 59, 1) 50%,
		rgba(49, 49, 59, 1) 75%,
		rgba(69, 69, 69, 1) 75%,
		rgba(69, 69, 69, 1) 100%
	);

	background-size: 12px 12px;
	border-radius: 4px;

	${pastStyles};
`

const CustomEvent = ({ event }) => {
	const isPast = isAfter(subHours(new Date(), 1), new Date(event.endTime))

	return <Container isPast={isPast} />
}

export default CustomEvent
