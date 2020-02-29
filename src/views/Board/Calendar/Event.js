import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { getCustomerField } from '../../../helpers/getCustomerInfo'

import { isAfter, format, isBefore, addHours, subHours, isWithinInterval } from 'date-fns'
import BlockedTime from './BlockedTime'

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
	onlinecheckin: 'rgba(242, 158, 82, 1.0)',
	walkin: '#CE66AB'
}

const sourceStyles = ({ sourceType }) =>
	sourceType !== 'default' &&
	css`
		padding-left: 10px;

		.jewel {
			background-color: ${sourceColor[sourceType]};
		}
	`

const bigStyles = ({ isBig }) =>
	isBig &&
	css`
		line-height: 34px;

		.duration {
			font-size: 16px;
			font-weight: 500;
			text-align: right;
			font-weight: 100;
			opacity: 0.6;
		}

		.time {
			font-size: 16px;
			margin: 0;
			font-weight: 700;
			line-height: 20px;
		}

		.name {
			font-size: 24px;
			line-height: 27px;
		}

		.service {
			font-weight: 100;
			font-size: 16px;
			white-space: nowrap;
			opacity: 0.6;
		}
	`

const pastStyles = ({ isPast }) =>
	isPast &&
	css`
		opacity: 0.4;
	`

const currentStyles = ({ isCurrent }) =>
	isCurrent &&
	css`
		background: rgba(79, 170, 159, 1);
		color: rgba(0, 80, 69, 1);
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
	background: rgba(101, 110, 222, 1);
	color: rgba(11, 20, 102, 1);
	animation: ${fadeIn} 0.5s ease forwards;

	.details {
		display: flex;
		align-items: center;
		height: 100%;
	}

	.left {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.time {
		font-size: 12px;
		line-height: 15px;
		white-space: nowrap;
		text-transform: lowercase;
	}

	.duration {
		font-size: 12px;
		line-height: 15px;
	}

	.name {
		font-weight: 700;
		font-size: 13px;
		line-height: 17px;

		white-space: nowrap;
	}

	.service {
		font-weight: 100;
		font-size: 12px;
		white-space: nowrap;
		line-height: 15px;
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
	${currentStyles};
`

const CustomEvent = ({ event }) => {
	const isFuture = isBefore(new Date(event.startTime), addHours(new Date(), 2))
	const isPast = isAfter(subHours(new Date(), 1), new Date(event.endTime))

	if (event.__typename === 'BlockedTime') return <BlockedTime event={event} />

	const name = event.customer
		? `${getCustomerField(event.customer, 'firstName') || '(No Name)'} ${
				!isFuture && !isPast ? '' : getCustomerField(event.customer, 'lastName') || ''
		  }`
		: '(No Name)'

	const sourceType = event?.source?.type || 'default'

	return (
		<Container
			isCurrent={isWithinInterval(new Date(), {
				start: new Date(event.startTime),
				end: new Date(event.endTime)
			})}
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
						<div className="service">
							{event.services.length > 1 ? 'Multiple Services' : event.services?.[0]?.name}
						</div>
					)}
				</div>
			</div>
			<div className="time">
				{format(new Date(event.startTime), 'h:mm a')} - {format(new Date(event.endTime), 'h:mm a')}
				<div className="duration">
					{event.price && <span>${event.price} - </span>}{' '}
					{event.duration && <span>{event.duration} mins</span>}
				</div>
			</div>
		</Container>
	)
}

export default CustomEvent
