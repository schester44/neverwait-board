import React from 'react'
import { format } from 'date-fns'

const Clock = () => {
	const [time, setTime] = React.useState(new Date())

	React.useEffect(() => {
		const timer = window.setInterval(() => {
			setTime(new Date())
		}, 60 * 1000)

		return () => window.clearInterval(timer)
	}, [])

	return (
		<span
			style={{
				textTransform: 'lowercase',
				fontFamily: 'sans-serif',
				color: 'white',
				fontSize: 14,
				fontWeight: 700
			}}
		>
			{format(time, 'h:mm a')}
		</span>
	)
}

export default Clock
