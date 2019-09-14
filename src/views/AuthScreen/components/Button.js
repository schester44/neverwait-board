import styled from 'styled-components'

const disabledStyles = ({ disabled }) =>
	disabled &&
	`
    opacity: 0.5;
    filter: grayscale(40%);
`

const Button = styled('button')`
	padding: 10px 20px;
	color: black;
	border-radius: 4px;
	background: rgba(237, 209, 129, 1);
	border: none;
	font-size: 18px;
	font-weight: 700;

	@media (min-width: 768px) {
		font-size: 30px;
		padding: 20px 60px;
	}

	${disabledStyles};
`

export default Button
