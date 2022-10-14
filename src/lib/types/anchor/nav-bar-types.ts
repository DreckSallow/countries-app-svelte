export enum SvelteKitFetch {
	noscroll = 'noscroll',
	prefetch = 'prefetch',
	reload = 'reload'
}
export interface NavigatorOpt {
	[key: string]: {
		path: string;
		text: string;
		svelteKit?: SvelteKitFetch;
	};
}
