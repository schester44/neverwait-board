export const getCustomerField = (customer, field) => {
	return customer?.[field] || customer?.profile?.[field]
}
