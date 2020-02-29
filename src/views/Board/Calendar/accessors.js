export const startAccessor = event => new Date(event.startTime)
export const endAccessor = event => new Date(event.endTime)

export const resourceAccessor = event => {
	// employeeId is for blocked times
	return event.employeeId || event?.employee?.id
}


export const eventPropGetter = _ => {
	return {
		style: {
			background: 'transparent'
		}
	}
}