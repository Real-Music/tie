import { create } from "zustand";

interface TimerState {
	time: number; // Seconds
	isRunning: boolean;
	startTimer: () => void;
	stopTimer: () => void;
	resetTimer: () => void;
}

const useTimerStore = create<TimerState>((set) => ({
	time: 0,
	isRunning: false,
	startTimer: () => set({ isRunning: true }),
	stopTimer: () => set({ isRunning: false }),
	resetTimer: () => set({ time: 0, isRunning: false }),
}));

export default useTimerStore;