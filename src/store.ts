import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

type History = { date: string; duration: number }

interface Store {
	history: History[];
	profileImg?: string;
	name?: string | null;

	reset: () => void;
	setHistory: (data: History) => void;
	setName: (name: string | null) => void;
	setProfileImg: (profileImg: string | undefined) => void;
}

const useAppStore = create(persist<Store>((set, get) => ({
	name: "",
	history: [],
	profileImg: undefined,

	setName: (name) => set({ name }),
	setProfileImg: (profileImg) => set({ profileImg }),
	setHistory: (data) => set({ history: [data, ...get().history] }),
	reset: () => set(store => {
		const initState: { [key: string]: unknown } = {};
		const propsToKeep = ["name"];

		Object.keys(store).forEach(key => {
			const isFunction = typeof store[key as keyof Store] === 'function';
			const isToKeep = propsToKeep.includes(key);

			if (isFunction || isToKeep) initState[key] = store[key as keyof Store]
			else initState[key] = undefined
		});

		return initState
	})
}), { name: 'tie', version: 1 }));

if (import.meta.env.MODE === "development") {
	mountStoreDevtool("TIE CONFERENCE", useAppStore);
}

export default useAppStore;