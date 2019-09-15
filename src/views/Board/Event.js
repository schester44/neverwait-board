import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { getCustomerField } from '../../helpers/getCustomerInfo'

import { isAfter, format, isBefore, addHours, subHours } from 'date-fns'

const fadeIn = keyframes`
	from {
		transform: scale(0.2);
	}

	to {
		transform: scale(1);
	}
`

const sourceColor = {
	default: '#E9CF4B',
	onlineappointment: '#66ce89',
	onlinecheckin: '#66ce89',
	walkin: '#CE66AB'
}

const sourceStyles = ({ sourceType }) =>
	sourceType !== 'default' &&
	`
	padding-left: 10px;

	.jewel {
		background-color: ${sourceColor[sourceType]};
	}
`

const bigStyles = ({ isBig }) =>
	isBig &&
	`
	line-height: 34px;

	.duration {
		font-size: 16px;
		font-weight: 500;
		opacity: 1;
		text-align: right;
		font-weight: 100;
	}
	
	.details {
		line-height: 1.2;
	}
	
	.time {
		font-size: 16px;
		margin: 0;
		font-weight: 700;
		opacity: 1;
		line-height: 1.2;
	}

	.name {
		font-size: 24px;
	}

	.service {
		font-weight: 100;
		font-size: 16px;
		white-space: nowrap;
	}
`

const pastStyles = ({ isPast }) =>
	isPast &&
	css`
		background: rgba(55, 59, 60, 1);
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
	background: rgba(85, 82, 181, 1);
	animation: ${fadeIn} 1s ease forwards;
	border-radius: 4px;

	.details {
		display: flex;
		align-items: center;
	}

	.left {
		display: flex;
		align-items: center;
	}

	.time {
		font-size: 12px;
		white-space: nowrap;
		text-transform: lowercase;
	}

	.duration {
		font-size: 12px;
		opacity: 0.5;
		line-height: 1;
	}

	.name {
		font-weight: 700;
		font-size: 14px;
		white-space: nowrap;
		${({ blurName }) =>
			blurName &&
			`
			filter: blur(5px);
		`}
	}

	.service {
		font-weight: 100;
		font-size: 12px;
		white-space: nowrap;
		line-height: 1;
	}

	.jewel {
		margin-right: 10px;
		left: 0;
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	${sourceStyles};
	${bigStyles};
	${pastStyles};
`

const CustomEvent = ({ event }) => {
	const isFuture = isBefore(new Date(event.startTime), addHours(new Date(), 2))
	const isPast = isAfter(subHours(new Date(), 1), new Date(event.endTime))

	const name = event.customer
		? `${getCustomerField(event.customer, 'firstName') || '(No Name)'} ${
				!isFuture && !isPast ? '' : getCustomerField(event.customer, 'lastName') || ''
		  }`
		: '(No Name)'

	const sourceType = event?.source?.type || 'default'

	return (
		<Container
			isPast={isAfter(new Date(), new Date(event.endTime))}
			isBig={event.duration >= 15}
			duration={event.duration}
			sourceType={sourceType}
		>
			<div className="left">
				{sourceType !== 'default' && <div className="jewel" />}

				<div>
					<div className="details">
						<div className="name">{name}</div>
					</div>
					{event.duration > 10 && event.services?.[0] && (
						<div className="service">{event.services.length > 1 ? 'Multiple Services' : event.services?.[0]?.name}</div>
					)}
				</div>
			</div>
			<div className="time">
				{format(new Date(event.startTime), 'h:mm a')} - {format(new Date(event.endTime), 'h:mm a')}
				{event.duration > 10 && <div className="duration">{event.duration} mins</div>}
			</div>
		</Container>
	)
}

export default CustomEvent
