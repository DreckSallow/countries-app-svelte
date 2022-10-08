import type { FilterContent, FilterStore } from '$lib/types/filters';
import { writable } from 'svelte/store';

type updater = <T>(v: T) => T;
export const createFilterStore = <T extends FilterStore>(filterState: T, updateFn?: updater) => {
	const { subscribe, update, set } = writable(filterState);
	if (updateFn) {
		return {
			subscribe,
			customUpdate: (prop: string, fn: (v: FilterContent) => FilterContent) => {
				update((prev) => {
					return {
						...updateFn(prev),
						[prop]: { ...prev[prop], ...fn(prev[prop]) }
					};
				});
			},
			update
		};
	}
	return {
		subscribe,
		update,
		set
	};
};
