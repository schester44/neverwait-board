import React from 'react'
import styled from 'styled-components'
import { produce } from 'immer'
import { useQuery } from '@apollo/react-hooks'
import { startOfDay, endOfDay } from 'date-fns'

import Calendar from './Calendar/index'
import Clock from './Clock'

import { locationQuery, employeeSchedulesQuery, appointmentsSubscription } from './queries'

import { getScheduledStaff } from '../../helpers/getScheduledStaff'
import { playNewSound, playDeletedSound } from '../../helpers/sound'

const Container = styled('div')`
	color: white;

	.signature {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background: rgba(80, 80, 80, 1);
		border-radius: 8px;
		font-family: Domus;
		color: rgba(255, 255, 255, 1);
		font-size: 18px;
		padding: 10px 30px;
		text-align: right;
		line-height: 1;
		z-index: 9999;
		box-shadow: 0px 5px 8px -4px rgba(32, 32, 32, 0.2);
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

	// TODO: Could this possibly cause the useSubscription to miss an update?
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

	const { data, loading, subscribeToMore } = useQuery(locationQuery, {
		variables: {
			startTime,
			endTime
		}
	})

	const location = data?.location
	const locationEmployees = location?.employees

	React.useEffect(() => {
		if (!location) return

		const unsubscribeFromSubscription = subscribeToMore({
			document: appointmentsSubscription,
			variables: {
				locationId: location.id
			},
			updateQuery: (previousQueryResult, { subscriptionData }) => {
				if (!subscriptionData.data?.SchedulingChange) return

				const { payload, action } = subscriptionData.data.SchedulingChange
				const { appointment, blockedTime } = payload

				const isDeleted = appointment
					? appointment.status === 'deleted' ||
					  appointment.status === 'canceled' ||
					  appointment.status === 'noshow'
					: action === 'DELETED'

				if (appointment && action === 'CREATED') {
					playNewSound()
				}

				if (appointment && isDeleted) {
					playDeletedSound()
				}

				// No need to do anything since Apollo handles updates
				if (action === 'UPDATED' && !isDeleted) return

				return produce(previousQueryResult, draftState => {
					const appointments = draftState.location.appointments
					const blockedTimes = draftState.location.blockedTimes

					if (appointment) {
						if (isDeleted) {
							const indexOfDeletedAppointment = appointments.findIndex(
								appt => Number(appt.id) === Number(appointment.id)
							)

							appointments.splice(indexOfDeletedAppointment, 1)
						} else {
							appointments.push(appointment)
						}
					}

					if (blockedTime) {
						if (isDeleted) {
							const indexOfDeletedBlockedTime = blockedTimes.findIndex(
								({ id }) => Number(id) === Number(blockedTime.id)
							)

							blockedTimes.splice(indexOfDeletedBlockedTime, 1)
						} else {
							blockedTimes.push(blockedTime)
						}
					}
				})
			}
		})

		return () => {
			unsubscribeFromSubscription()
		}
	}, [subscribeToMore, location])

	console.log({
		skip: !location?.id,
		fetchPolicy: 'cache-and-network',
		variables: {
			locationId: location?.id,
			startDate: startTime,
			endDate: endTime
		}
	})

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

			{scheduledStaff ? (
				<Calendar
					currentTime={currentTime}
					startTime={startTime}
					endTime={endTime}
					locationId={location.id}
					employees={scheduledStaff}
					appointments={[...location.blockedTimes, ...location.appointments]}
				/>
			) : (
				<Placeholder>No Scheduled Staff</Placeholder>
			)}
		</Container>
	)
}

export default Board
