import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(error => {
			if (error.name === 'AuthenticationError') {
				localStorage.removeItem('nw-board-sess')
			}
		})
	}

	if (networkError?.result?.errors) {
		networkError.result.errors.forEach(console.error)
	}
})

const subClient = new SubscriptionClient(process.env.REACT_APP_SUBSCRIPTION_URI, {
	credentials: 'include',
	reconnect: true,
	lazy: true
})

subClient.on('connected', () => console.log('socket connected'))
subClient.on('disconnected', () => console.log('socket disconnected'))
subClient.on('reconnecting', () => console.log('socket reconnecting'))
subClient.on('reconnected', () => console.log('socket reconnected'))

export const wsLink = new WebSocketLink(subClient)

export const httpLink = ApolloLink.from([
	onErrorLink,
	new HttpLink({
		credentials: 'include',
		uri: process.env.REACT_APP_API_ENDPOINT
	})
])

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query)
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	httpLink
)

const cache = new InMemoryCache()
const client = new ApolloClient({ link, cache })

export default client
