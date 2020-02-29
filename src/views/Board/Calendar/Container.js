import styled from 'styled-components'

export default styled('div')`
	width: 100%;
	height: 100vh;
	overflow: hidden;

	color: black;

	.rbc-header {
		padding: 5px;
		font-size: 28px;
		font-family: Domus;
	}

	.rbc-row-resource .rbc-header {
		border: none !important;
	}

	.rbc-header + .rbc-header {
		border-left: none !important;
	}

	.rbc-time-header-content > .rbc-row.rbc-row-resource {
		box-shadow: none;
		border-bottom: none;
	}

	.rbc-allday-cell {
		display: none;
	}

	.rbc-overflowing {
		border-right: 0 !important;
	}

	.rbc-today {
		background: transparent;
	}

	.rbc-time-content {
		border-top: none;
		overflow-x: hidden;
	}

	.rbc-current-time-indicator {
		height: 2px;
		background-color: rgba(100, 208, 149, 1);
	}

	.rbc-timeslot-group {
		min-height: 200px !important;
	}

	.rbc-today .rbc-timeslot-group {
		border-bottom: 1px solid rgba(230, 230, 230, 0.8) !important;
	}

	.rbc-time-content > * + * > * {
		border-left: 1px solid rgba(230, 230, 230, 1);
	}

	.rbc-time-view-resources .rbc-time-gutter {
		z-index: inherit;
		border-right: 1px solid rgba(230, 230, 230, 1) !important;
	}

	.rbc-time-header-gutter,
	.rbc-time-header-content,
	.rbc-time-view {
		border: none !important;
	}

	.rbc-time-header-gutter,
	.rbc-time-gutter {
		background-color: transparent !important;
	}

	.rbc-time-gutter .rbc-timeslot-group {
		border: none;
		padding: 0 5px 0 10px;
	}

	.rbc-time-gutter .rbc-timeslot-group .rbc-label {
		position: relative;
		top: -12px;
		font-weight: 500;
		font-size: 18px;
	}

	.rbc-time-gutter .rbc-timeslot-group:first-of-type .rbc-label {
		display: none;
	}

	.rbc-day-slot .rbc-time-slot {
		border-top: 1px solid rgba(230, 230, 230, 1);
	}

	.rbc-time-slot {
		min-height: 1px !important;
	}

	.rbc-event {
		min-height: 1px !important;
		border: none !important;
		margin: 0 2px;
		border-radius: 4px;
		border: none;
	}

	.rbc-event-label {
		display: none;
	}

	.rbc-day-slot .rbc-events-container {
		margin-right: 2px;
	}
`
