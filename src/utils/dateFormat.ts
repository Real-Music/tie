export default function dateFormat(dateString: string): string | undefined {
	if (!dateString) return undefined;
	const date = new Date(dateString);
	return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}