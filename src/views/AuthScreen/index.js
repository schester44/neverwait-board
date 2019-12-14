import React from 'react'
import Input from './components/Input'
import Button from './components/Button'

import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const Container = styled('div')`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	.box {
		width: 100%;
		max-width: 500px;
		display: flex;

		button {
			margin-left: 14px;
		}

		@media (min-width: 768px) {
			max-width: 1024px;
		}
	}
`

export const authWithToken = gql`
	mutation authWithToken($key: String!) {
		authWithToken(key: $key)
	}
`

const Error = styled('div')`
	background: tomato;
	padding: 20px;
	color: white;
	font-size: 22px;
	margin-bottom: 14px;
`

const AuthScreen = () => {
	const [login, { loading, error }] = useMutation(authWithToken)

	const [code, setCode] = React.useState('')

	const handleSubmit = async () => {
		if (code.length === 0) return false

		await login({
			variables: {
				key: code
			}
		})

		localStorage.setItem('nw-board-sess', true)
		window.location.reload()
	}

	return (
		<Container>
			{error && error.graphQLErrors.length > 0 && <Error>{error.graphQLErrors[0].message}</Error>}

			<div className="box">
				<Input
					type="password"
					onChange={({ target: { value } }) => setCode(value)}
					placeholder="Enter auth code"
				/>

				<Button onClick={handleSubmit} disabled={code.length === 0 || loading}>
					Submit
				</Button>
			</div>
		</Container>
	)
}

export default AuthScreen
