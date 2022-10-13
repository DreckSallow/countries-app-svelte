import { error } from '@sveltejs/kit';
import { Net } from '$lib/utils/fetch/fetch';
import type { PageLoad } from './$types';
import type { CountryData, CountryResponse } from '$lib/types/country';

const getCountry = `
	query GetCountryById($id: Int!) {
  	getCountryById(id: $id) {
    	name
    	image
    	capital
    	fifa
    	area,
    	borders {
     	 initials
    	}
    	independent
  	  languages {
   	   name
    	}
   	 population
   	 region {
   	   name
   	 }
   	 fifa
   	 icon_flag
  	}
	}
`;

export const load: PageLoad = async ({ params, fetch }): Promise<CountryData> => {
	const { existError, content, status } = await Net.post<{
		data: { getCountryById: CountryResponse };
	}>(
		{
			url: 'http://localhost:4000/',
			body: JSON.stringify({
				query: getCountry,
				variables: {
					id: Number(params.id)
				}
			})
		},
		fetch
	);

	if (existError || content === null) {
		throw error(status as number, 'Error');
	}
	const { borders, languages, region, icon_flag, ...rest } = content.data.getCountryById;
	return {
		...rest,
		iconFlag: icon_flag,
		region: region?.name ?? '',
		borders: borders ? borders.map(({ initials }) => initials) : [],
		languages: languages ? languages.map(({ name }) => name) : []
	};
};
