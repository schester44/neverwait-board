import React from 'react'
import styled from 'styled-components'

import AuthScreen from './views/AuthScreen'
import Board from './views/Board'

const Container = styled('div')`
	width: 100%;
	height: 100%;

	background: rgba(252, 252, 252, 1);
`

const App = () => {
	const isAuthed = !!localStorage.getItem('nw-board-sess')

	return <Container>{!isAuthed ? <AuthScreen /> : <Board />}</Container>
}

export default App
