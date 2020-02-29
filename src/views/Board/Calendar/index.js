import React from 'react'

import { Calendar as BigCalendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Container from './Container'

import Header from './Header'
import Event from './Event'

import { subMinutes } from 'date-fns/esm'
import { localizer } from './localizer'

import { resourceAccessor, startAccessor, endAccessor, eventPropGetter } from './accessors'

const noop = () => null

const components = {
	toolbar: noop,
	event: Event,
	header: Header
}

const Calendar = ({ currentTime, employees, appointments }) => {
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
				dayLayoutAlgorithm="no-overlap"
				view="day"
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
