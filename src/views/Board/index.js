import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { startOfDay, endOfDay } from 'date-fns'

import Calendar from './Calendar'
import Clock from './Clock'

import { locationQuery, employeeSchedulesQuery } from './queries'

import { getScheduledStaff } from '../../helpers/getScheduledStaff'

const Container = styled('div')`
	color: white;

	.signature {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background: rgba(45, 48, 49, 0.4);
		border-radius: 10px;
		font-family: Domus;
		color: rgba(237, 209, 129, 1);
		font-size: 18px;
		padding: 10px;
		text-align: right;
		line-height: 1;
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
	const [{ currentTime, startTime, endTime, scheduledStaff }, setState] = React.useState({
		currentTime: new Date(),
		startTime: startOfDay(new Date()),
		endTime: endOfDay(new Date()),
		scheduledStaff: []
	})

	// TODO: This could cause the useSubscription to miss an update
	React.useEffect(() => {
		const timer = window.setInterval(() => {
			let date = new Date()

			setState({
				currentTime: date,
				startTime: startOfDay(date),
				endTime: endOfDay(date)
			})
		}, 60 * 1000 * 5)

		return () => window.clearInterval(timer)
	}, [])

	const { data, loading } = useQuery(locationQuery, {
		variables: {
			startTime,
			endTime
		}
	})

	const location = data?.location
	const locationEmployees = location?.employees

	const { data: scheduleData, loading: schedulesLoading } = useQuery(employeeSchedulesQuery, {
		skip: !location?.id,
		fetchPolicy: 'cache-and-network',
		variables: {
			locationId: location?.id,
			startDate: startTime,
			endDate: endTime
		}
	})

	React.useEffect(() => {
		if (!locationEmployees || !scheduleData) return

		setState(prev => ({
			...prev,
			scheduledStaff: getScheduledStaff({
				date: currentTime,
				employeeSchedules: scheduleData.employees,
				employees: locationEmployees
			})
		}))
	}, [scheduleData, locationEmployees, currentTime])

	if (loading || !location || !scheduleData || schedulesLoading) {
		return <Placeholder>Loading...</Placeholder>
	}

	const logout = () => {
		localStorage.removeItem('nw-board-sess')
		window.location.reload()
	}

	return (
		<Container>
			<div onClick={logout} className="signature">
				NeverWait
				<div>
					<Clock />
				</div>
			</div>

			{location?.employees ? (
				<Calendar
					currentTime={currentTime}
					startTime={startTime}
					endTime={endTime}
					locationId={location.id}
					employees={scheduledStaff}
					appointments={[...location.blockedTimes, ...location.appointments]}
				/>
			) : (
				<Placeholder>Error</Placeholder>
			)}
		</Container>
	)
}

export default Board
