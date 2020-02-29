import setSeconds from 'date-fns/setSeconds'
import setMinutes from 'date-fns/setMinutes'
import setHours from 'date-fns/setHours'
import addMinutes from 'date-fns/addMinutes'
import startOfDay from 'date-fns/startOfDay'

export const dayNameToNumber = {
	sunday: 0,
	monday: 1,
	tuesday: 2,
	wednesday: 3,
	thursday: 4,
	friday: 5,
	saturday: 6
}

export const dayNumberToName = {
	0: 'sunday',
	1: 'monday',
	2: 'tuesday',
	3: 'wednesday',
	4: 'thursday',
	5: 'friday',
	6: 'saturday'
}

export const dateFromMinutes = (minutes, date = new Date()) => addMinutes(startOfDay(date), minutes)

export const dateFromTimeString = (time, date = new Date()) => {
	const [hours, minutes] = time.split(':')

	return setSeconds(setHours(setMinutes(date, parseInt(minutes, 10)), parseInt(hours, 10)), 0)
}

export const getNameOfDay = input => {
	const date = input instanceof Date ? input : new Date(input)

	return dayNumberToName[date.getDay()]
}
