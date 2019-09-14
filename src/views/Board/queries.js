import gql from 'graphql-tag'

export const appointmentsSubscription = gql`
	subscription onAppointmentsChange($locationId: ID!) {
		AppointmentsChange(locationId: $locationId) {
			employeeId
			isNewRecord
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
					type
				}

				customer {
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
	query location($startTime: String!, $endTime: String!) {
		location {
			company {
				name
			}
			id
			name

			appointments(
				input: { where: { status: { not: "completed" }, startTime: { gte: $startTime }, endTime: { lte: $endTime } } }
			) {
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
					type
				}

				customer {
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
