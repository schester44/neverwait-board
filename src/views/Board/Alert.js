import React from 'react'
import styled, { keyframes } from 'styled-components'
import format from 'date-fns/format'
import { getCustomerField } from '../../helpers/getCustomerInfo'

const slideIn = keyframes`
    from {
        transform: scale(0);
    }
    
    to {
        transform: scale(1)
    }
`

const Container = styled('div')`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 99999;
	background: rgba(45, 48, 49, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;

	.box {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 70vw;
		height: 200px;
		background: #000;
		box-shadow: 0px 2px 3px rgba(32, 32, 32, 0.5);
		border-radius: 10px;
		padding: 20px;
		transform: scale(0);
		animation: ${slideIn} 0.5s ease forwards;

		h1 {
			margin-bottom: 14px;
			color: rgba(128, 205, 154, 1);
		}

		.details {
			font-size: 28px;
		}
	}
`

const readable = {
	onlineappointment: 'Appointment',
	onlinecheckin: 'Check-in',
	walkin: 'Walk-in'
}

const Alert = ({ appointment, onClose }) => {
	const [closing, setClosing] = React.useState(false)

	React.useEffect(() => {
		let innerTimer

		const timer = window.setTimeout(() => {
			// at 8, set state, 1 second later close it...
			// call onClose

			setClosing(true)

			innerTimer = window.setTimeout(onClose, 2000)
		}, 8000)

		return () => {
			window.clearTimeout(timer)
			window.clearTimeout(innerTimer)
		}
	}, [onClose])

	const sourceType = appointment?.source?.type || 'default'

	const name = appointment.customer
		? `${getCustomerField(appointment.customer, 'firstName') || '(No Name)'} ${getCustomerField(
				appointment.customer,
				'lastName'
		  ) || ''}`
		: '(No Name)'

	const source = readable[sourceType]

	if (!source) return null

	return (
		<Container isClosing={closing}>
			<div className="box">
				<h1>New {source}</h1>

				{appointment.services?.[0] && (
					<div className="details">
						<div className="name">{name}</div>
						{appointment.services.length > 1 ? 'Multiple Services' : appointment.services?.[0]?.name} on{' '}
						{format(new Date(appointment.startTime), 'MMM, do')} at {format(new Date(appointment.startTime), 'h:mm a')}
					</div>
				)}
			</div>
		</Container>
	)
}

export default Alert
