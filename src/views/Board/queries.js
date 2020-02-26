import gql from 'graphql-tag'

export const appointmentsSubscription = gql`
	subscription onAppointmentsChange($locationId: ID!) {
		SchedulingChange(locationId: $locationId) {
			action
			employeeId
			locationId
			blockedTime {
				id
				startTime
				endTime
			}
			appointment {
				id
				status
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
`

export const locationQuery = gql`
	query location($startTime: DateTime!, $endTime: DateTime!) {
		location {
			company {
				name
			}
			id
			name
			blockedTimes(
				input: { where: { startTime: { gte: $startTime }, endTime: { lte: $endTime } } }
			) {
				id
				startTime
				endTime
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
