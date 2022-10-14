import { writable, type Subscriber, type Unsubscriber, type Updater } from 'svelte/store';

type updater = <T>(v: T) => T;
export type createFilterReturn<T> = {
	subscribe: (this: void, run: Subscriber<T>) => Unsubscriber;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	customUpdate?: (prop: keyof T, fn: (v: any) => any) => void;
	update: (this: void, updater: Updater<T>) => void;
	set: (this: void, value: T) => void;
};
export const createFilterStore = <T>(filterState: T, updateFn?: updater): createFilterReturn<T> => {
	const { subscribe, update, set } = writable(filterState);
	if (updateFn) {
		return {
			subscribe,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			customUpdate: (prop: keyof T, fn: (v: any) => any) => {
				update((prev) => {
					return {
						...updateFn(prev),
						[prop]: { ...prev[prop], ...fn(prev[prop]) }
					};
				});
			},
			update,
			set
		};
	}
	return {
		subscribe,
		update,
		set
	};
};
