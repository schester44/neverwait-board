import React from 'react'

import styled from 'styled-components'

import { parseISO, format, isSameDay } from 'date-fns'

const Header = styled('div')`
	align-items: center;
	font-size: 18px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 3px;

	.date {
		text-align: center;
		line-height: 1;

		.light {
			font-weight: 100;
			padding-right: 5px;
		}
	}

	.same-day-indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		margin-left: 5px;
		background: rgba(76, 102, 243, 1);
	}
`
const now = new Date()

const TimelineHeader = props => {
	const isToday = isSameDay(now, parseISO(props.date))

	return (
		<Header>
			<div className="date">
				<span className="light">{format(props.date, 'ddd')}</span>
				<span>{format(props.date, 'dd')}</span>
			</div>
			{isToday && <div className="same-day-indicator" />}
		</Header>
	)
}

export default TimelineHeader
