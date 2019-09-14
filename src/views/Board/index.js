import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { locationQuery } from './queries'
import { startOfDay, endOfDay } from 'date-fns'
import Calendar from './Calendar'

const Container = styled('div')`
	color: white;

	.signature {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background: rgba(71, 74, 76, 0.4);
		border-radius: 10px;
		font-family: Domus;
		color: rgba(237, 209, 129, 1);
		font-size: 20px;
		padding: 5px 20px;
		text-align: center;
	}
`

const Placeholder = styled('div')`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
`

const Board = () => {
	const [{ startTime, endTime }, setState] = React.useState({
		startTime: startOfDay(new Date()),
		endTime: endOfDay(new Date())
	})

	const { data: { location } = {}, loading } = useQuery(locationQuery, {
		variables: {
			startTime,
			endTime
		}
	})

	if (loading) return <Placeholder>Loading...</Placeholder>

	return (
		<Container>
			<div className="signature">NeverWait</div>

			{location?.employees ? (
				<Calendar
					startTime={startTime}
					endTime={endTime}
					locationId={location.id}
					employees={location.employees}
					appointments={location.appointments}
				/>
			) : (
				<Placeholder>Error</Placeholder>
			)}
		</Container>
	)
}

export default Board
