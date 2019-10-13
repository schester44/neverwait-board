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

	return <div style={{ position: 'absolute', top: 10, right: 10, fontSize: 32 }}>{format(time, 'h:mm a')}</div>
}

export default Clock
