import React from 'react'
import { produce } from 'immer'
import { useSubscription } from '@apollo/react-hooks'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Container from './CalendarContainer'

import Header from './Header'
import Event from './Event'
import { subMinutes } from 'date-fns/esm'

import { appointmentsSubscription, locationQuery } from './queries'

const localizer = momentLocalizer(moment)

const startAccessor = event => new Date(event.startTime)
const endAccessor = event => new Date(event.endTime)

const resourceAccessor = event => {
	// employeeId is for blocked times
	return event.employeeId || event?.employee?.id
}

const noop = () => null

const components = {
	toolbar: noop,
	event: Event,
	header: Header
}

const eventPropGetter = _ => {
	return {
		style: {
			background: 'transparent'
		}
	}
}

const playSound = () => {
	const context = new AudioContext()
	const o = context.createOscillator()
	const g = context.createGain()
	o.connect(g)
	g.connect(context.destination)
	o.start(0)
	o.type = 'sine'
	o.frequency.value = 630.6

	g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.5)
}

const Calendar = ({ currentTime, startTime, endTime, locationId, employees, appointments }) => {
	useSubscription(appointmentsSubscription, {
		variables: { locationId },
		shouldResubscribe: true,
		onSubscriptionData: ({ client, subscriptionData }) => {
			if (!subscriptionData.data?.SchedulingChange) return

			const { payload, action } = subscriptionData.data.SchedulingChange

			const { appointment, blockedTime } = payload

			const cache = client.readQuery({
				query: locationQuery,
				variables: {
					startTime,
					endTime
				}
			})

			const isDeleted = appointment
				? appointment.status === 'deleted' ||
				  appointment.status === 'canceled' ||
				  appointment.status === 'noshow'
				: action === 'DELETED'

			// if we're updating the record then do nothing, let apollo handle it
			if (action === 'UPDATED' && !isDeleted) return

			playSound()

			client.writeQuery({
				query: locationQuery,
				variables: { startTime, endTime },
				data: produce(cache, draft => {
					const { appointments, blockedTimes } = draft.location

					if (appointment) {
						if (isDeleted) {
							draft.location.appointments = appointments.filter(({ id }) => id !== appointment.id)
						} else {
							draft.location.appointments.push(appointment)
						}
					}

					if (blockedTime) {
						if (isDeleted) {
							draft.location.blockedTimes = blockedTimes.filter(({ id }) => id !== blockedTime.id)
						} else {
							draft.location.blockedTimes.push(blockedTime)
						}
					}
				})
			})
		}
	})

	return (
		<Container>
			<BigCalendar
				eventPropGetter={eventPropGetter}
				localizer={localizer}
				events={appointments}
				startAccessor={startAccessor}
				endAccessor={endAccessor}
				scrollToTime={subMinutes(currentTime, 30)}
				resources={employees}
				resourceAccessor={resourceAccessor}
				resourceIdAccessor="id"
				resourceTitleAccessor="firstName"
				view={'day'}
				onNavigate={noop}
				onView={noop}
				date={currentTime}
				timeslots={12}
				step={5}
				formats={{ timeGutterFormat: 'h:mm a' }}
				components={components}
			/>
		</Container>
	)
}

export default Calendar
