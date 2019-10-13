import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { locationQuery } from './queries'
import { startOfDay, endOfDay } from 'date-fns'
import Calendar from './Calendar'
import Clock from './Clock'

const Container = styled('div')`
	color: white;

	.signature {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background: rgba(45, 48, 49, 1);
		border-radius: 10px;
		font-family: Domus;
		color: rgba(237, 209, 129, 1);
		font-size: 20px;
		padding: 5px 20px;
		text-align: center;
		z-index: 9999;
		box-shadow: 0px 2px 3px rgba(32, 32, 32, 0.2);
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
	const [{ currentTime, startTime, endTime }, setState] = React.useState({
		currentTime: new Date(),
		startTime: startOfDay(new Date()),
		endTime: endOfDay(new Date())
	})

	// TODO: This could cause the useSubscription to miss an update
	React.useEffect(() => {
		const timer = window.setInterval(() => {
			setState({
				currentTime: new Date(),
				startTime: startOfDay(new Date()),
				endTime: endOfDay(new Date())
			})
		}, 60 * 1000 * 5)

		return () => window.clearInterval(timer)
	}, [])

	const { data: { location } = {}, loading } = useQuery(locationQuery, {
		variables: {
			startTime,
			endTime
		}
	})

	if (loading) return <Placeholder>Loading...</Placeholder>

	console.log('refreshing,', currentTime)

	return (
		<Container>
			<Clock />
			<div className="signature">NeverWait</div>

			{location?.employees ? (
				<Calendar
					currentTime={currentTime}
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
