import { useState } from "react";

const useWakeLock = () => {
	const [wakeLock, setWakeLock] = useState<null | WakeLockSentinel>(null);

	const requestWakeLock = async () => {
		try {
			if ("wakeLock" in navigator) {
				const lock = await navigator.wakeLock.request("screen");
				setWakeLock(lock);

				// Release wake lock if it becomes unavailable
				lock.addEventListener("release", () => {
					setWakeLock(null);
				});
			} else {
				console.warn("Wake Lock API not supported on this browser.");
			}
		} catch (err) {
			console.error("Failed to request wake lock:", err);
		}
	};

	const releaseWakeLock = async () => {
		if (wakeLock) {
			try {
				await wakeLock.release();
				setWakeLock(null);
			} catch (err) {
				console.error("Failed to release wake lock:", err);
			}
		}
	};

	return { requestWakeLock, releaseWakeLock, wakeLock };
};

export default useWakeLock;
