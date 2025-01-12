
export const formatDateTime = (dateTime: string) => {
	if (dateTime == 'null' || !dateTime) return "";

	return new Date(dateTime).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
	})
}



