import gql from 'graphql-tag'

export const appointmentsSubscription = gql`
	subscription onAppointmentsChange($locationId: ID!) {
		SchedulingChange(locationId: $locationId) {
			action
			employeeId
			locationId
			payload {
				blockedTime {
					id
					startTime
					endTime
					employeeId
				}
				appointment {
					id
					status
					price
					duration
					startTime
					endTime

					employee {
						id
					}

					services {
						id
						name
					}

					source {
						id
						type
					}

					customer {
						id
						firstName
						lastName
						profile {
							firstName
							lastName
							phoneNumber
						}
					}
				}
			}
		}
	}
`

export const locationQuery = gql`
	query location($startTime: DateTime!, $endTime: DateTime!) {
		location {
			id
			name
			company {
				id
				name
			}
			blockedTimes(
				input: { where: { startTime: { gte: $startTime }, endTime: { lte: $endTime } } }
			) {
				id
				startTime
				endTime
				employeeId
			}
			appointments(
				input: {
					where: {
						status: { eq: confirmed }
						startTime: { gte: $startTime }
						endTime: { lte: $endTime }
					}
				}
			) {
				id
				status
				price
				duration
				startTime
				endTime

				employee {
					id
				}

				services {
					id
					name
				}

				source {
					id
					type
				}

				customer {
					id
					firstName
					lastName
					profile {
						firstName
						lastName
						phoneNumber
					}
				}
			}

			employees(input: { where: { bookingEnabled: true } }) {
				id
				firstName
			}
		}
	}
`

export const employeeSchedulesQuery = gql`
	query employees($locationId: ID!, $startDate: DateTime!, $endDate: DateTime!) {
		employees(input: { where: { locationId: $locationId, bookingEnabled: true } }) {
			id
			schedule_ranges(
				input: { locationId: $locationId, where: { start_date: $startDate, end_date: $endDate } }
			) {
				day_of_week
				schedule_shifts {
					start_time
					end_time
					acceptingAppointments
					acceptingWalkins
					acceptingCheckins
				}
			}
		}
	}
`
