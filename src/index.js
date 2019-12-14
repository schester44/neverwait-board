import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './App'
import client from './apollo-client'

import './index.css'

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        width: 100%;
        height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`

const theme = {}

render(
	<ApolloProvider client={client}>
		<GlobalStyles />
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</ApolloProvider>,
	document.getElementById('root')
)
