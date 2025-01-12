export default function exportToCSV<T extends object>(filename: string, data: T[]): void {
	// Get the unique set of property names from all objects
	const propertyNames = new Set<keyof T>();
	data.forEach(obj => Object.keys(obj).forEach(key => propertyNames.add(key as keyof T)));

	// Create a CSV string with headers
	let csv = "";
	csv += Array.from(propertyNames).join(",");
	csv += "\n";

	// Create rows with corresponding values
	csv += data.map(row => {
		return Array.from(propertyNames.values()).map(propName => row[propName] || "").join(","); // Use empty string for missing properties
	}).join("\n");

	// Create a temporary link to trigger the download
	const link = document.createElement("a");
	link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
	link.download = `${filename}.csv`;
	link.style.display = "none";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}



