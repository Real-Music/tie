
export default function isNumber(value: string) {
	return typeof value === "string" && !isNaN(Number(value));
}
