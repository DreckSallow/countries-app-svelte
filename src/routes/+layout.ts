import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
	return {
		pathName: url.pathname
	};
};
