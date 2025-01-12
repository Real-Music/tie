import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";


interface Store {
	isLoggedIn: boolean;
	reset: () => void;
	setIsLoggedIn: (mode: boolean) => void;
}

const useAdminStore = create(persist<Store>((set) => ({
	isLoggedIn: false,

	setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
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
}), { name: 'tie-admin', version: 1 }));

if (import.meta.env.MODE === "development") {
	mountStoreDevtool("TIE CONFERENCE ADMIN", useAdminStore);
}

export default useAdminStore;