import type { Language, Region } from '$lib/types/filters/filter-types';
import { error } from '@sveltejs/kit';
import type { Country } from '$lib/types/country';
import { Net } from '$lib/utils/fetch/fetch';
import type { PageLoad } from './$types';
import { ENDPOINT } from '$lib/config/fetch';

interface CountryResponse extends Country {
	region: {
		name: string;
	};
}
interface GetTypes {
	data: {
		countries: CountryResponse[];
		getLanguages: Language[];
		getRegions: Region[];
	};
}

const query = `
	query types($sort: SortCountry) {
		countries(sort: $sort) {
			image
			id
			name
			region{
				name
			}
			capital
		}
		getLanguages {
    	name,
    	id
  	}
		getRegions {
    	name
    	id
  	}
	}
`;

export const load: PageLoad = async ({ fetch }) => {
	const { existError, status, content } = await Net.post<GetTypes>(
		{
			url: ENDPOINT.url,
			body: JSON.stringify({
				query,
				variables: {
					sort: {
						alpha: true
					}
				}
			})
		},
		fetch
	);
	if (existError || content === null) {
		throw error(status as number, 'Error');
	}
	return {
		countries: content.data.countries.map(({ region, ...rest }) => ({
			...rest,
			region: region?.name
		})),
		languages: content.data.getLanguages,
		regions: content.data.getRegions
	};
};
