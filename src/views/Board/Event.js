import React from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'

import { getCustomerField } from '../../helpers/getCustomerInfo'
import { parseISO } from 'date-fns'

const sourceColor = {
	default: '#E9CF4B',
	onlineappointment: '#66ce89',
	onlinecheckin: '#66ce89',
	walkin: '#CE66AB'
}

const sourceStyles = ({ sourceType }) =>
	sourceType !== 'default' &&
	`
	.jewel {
		background-color: ${sourceColor[sourceType]};
	}
`

const bigStyles = ({ isBig }) =>
	isBig &&
	`
	line-height: 28px;

	.duration {
		font-size: 22px;
		font-weight: 500;
		opacity: 1;
		text-align: right;
		font-weight: 100;
	}
	
	
	.time {
		font-size: 22px;
		margin: 0;
		font-weight: 700;
		opacity: 1;
	}

	.name {
		font-size: 28px;
	}

	.service {
		font-weight: 100;
		font-size: 24px;
		white-space: nowrap;
		line-height: 28px;
	}
`

const Container = styled('div')`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	padding: 0 10px;
	overflow: hidden;
	line-height: 14px;

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
		margin-right: 4px;
		white-space: nowrap;
		text-transform: lowercase;
	}

	.duration {
		font-size: 12px;
		opacity: 0.5;
	}

	.name {
		font-weight: 700;
		font-size: 14px;
		white-space: nowrap;
	}

	.service {
		font-weight: 100;
		font-size: 12px;
		white-space: nowrap;
	}

	.jewel {
		margin-right: 8px;
		left: 0;
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}

	${sourceStyles};
	${bigStyles};
`

const readable = {
	onlineappointment: 'via Online Appointment',
	onlinecheckin: 'via Online Check-in',
	walkin: 'via Walk-in',
	default: 'manually'
}

const CustomEvent = ({ event }) => {
	const name = event.customer
		? `${getCustomerField(event.customer, 'firstName') || '(No Name)'} ${getCustomerField(event.customer, 'lastName') ||
				''}`
		: '(No Name)'

	const sourceType = event?.source?.type || 'default'

	return (
		<Container isBig={event.duration > 15} duration={event.duration} sourceType={sourceType}>
			<div className="left">
				<div className="jewel" />

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
