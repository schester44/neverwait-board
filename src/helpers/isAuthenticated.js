import decode from 'jwt-decode'

const isAuthenticated = () => {
	try {
		decode(localStorage.getItem('AuthToken'))
	} catch (error) {
		return false
	}

	return true
}

export default isAuthenticated
