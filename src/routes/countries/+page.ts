import type { Language } from '$lib/types/filters/filter-types';
import { error } from '@sveltejs/kit';
import type { Country } from '$lib/types/country';
import { Net } from '$lib/utils/fetch/fetch';
import type { PageLoad } from './$types';

interface CountryResponse extends Country {
	region: {
		name: string;
	};
}
interface GetTypes {
	data: {
		countries: CountryResponse[];
		getLanguages: Language[];
	};
}

const query = `
	query types {
		countries {
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
	}
`;

export const load: PageLoad = async ({ fetch }) => {
	const { existError, status, content } = await Net.post<GetTypes>(
		{
			url: 'http://localhost:4000/',
			body: JSON.stringify({ query })
		},
		fetch
	);
	if (existError || content === null) {
		throw error(status as number, 'Error');
	}
	console.log(content?.data);
	return {
		countries: content.data.countries.map(({ region, ...rest }) => ({
			...rest,
			region: region?.name
		})),
		languages: content.data.getLanguages
	};
};
