import { getNameOfDay, dateFromTimeString, dayNameToNumber } from './time'
import addDays from 'date-fns/addDays'

export function getScheduledStaff({ date, employeeSchedules, employees }) {
	const dateName = getNameOfDay(date)

	const schedules = employeeSchedules.reduce((acc, employee) => {
		acc[employee.id] = employee.schedule_ranges.reduce((sch, range) => {
			const dayNumber = dayNameToNumber[range.day_of_week]
			const differenceInDays = dayNumber - new Date(date).getDay()

			// All we have is a time eg 9:00 to work with. we need real dates to do calculations so here we're converting the time string into an accurate date given the day.
			sch[range.day_of_week] = range.schedule_shifts.map(shift => ({
				...shift,
				start_time: dateFromTimeString(shift.start_time, addDays(date, differenceInDays)),
				end_time: dateFromTimeString(shift.end_time, addDays(date, differenceInDays))
			}))

			return sch
		}, {})

		return acc
	}, {})

	return employees.filter(({ id }) => !!schedules[id]?.[dateName])
}
