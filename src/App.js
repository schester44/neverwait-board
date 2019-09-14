import React from 'react'
import styled from 'styled-components'

import isAuthenticated from './helpers/isAuthenticated'
import AuthScreen from './views/AuthScreen'
import Board from './views/Board'

const Container = styled('div')`
	width: 100%;
	height: 100%;

	background: rgba(26, 30, 32, 1);
`

const App = () => {
	const isAuthed = isAuthenticated()

	return <Container>{!isAuthed ? <AuthScreen /> : <Board />}</Container>
}

export default App
