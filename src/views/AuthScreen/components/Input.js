import styled from 'styled-components'

const Input = styled('input')`
	border: none;
	padding: 10px 20px;
	border-radius: 4px;
	background: rgba(249, 249, 249, 0.05);
	color: white;
	font-size: 18px;
	font-weight: 700;
	width: 100%;

	@media (min-width: 768px) {
		font-size: 40px;
		padding: 20px 40px;
	}
`

export default Input
