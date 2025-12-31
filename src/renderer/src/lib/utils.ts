export function formatDuration(milliseconds: number) {
	let totalSeconds = Math.floor(milliseconds / 1000);

	let seconds = totalSeconds % 60;
	let minutes = Math.floor(totalSeconds / 60) % 60;
	let hours = Math.floor(totalSeconds / 3600);

	let formattedHours = hours.toString().padStart(2, "0");
	let formattedMinutes = minutes.toString().padStart(2, "0");
	let formattedSeconds = seconds.toString().padStart(2, "0");

	if (hours > 0) {
		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	} else {
		return `${minutes}:${formattedSeconds}`;
	}
}
