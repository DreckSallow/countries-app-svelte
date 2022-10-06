import type { Country } from '$lib/types/country';
import type { PageLoad } from './$types';

interface CountryResponse extends Country {
	region: {
		name: string;
	};
}
const query = `
	query countries {
		countries {
			image
			id
			name
			region{
				name
			}
			capital
		}
	}
`;

export const load: PageLoad = async ({ fetch }) => {
	const dataFetch = await fetch(' http://localhost:4000/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ query: query })
	});
	const { data }: { data: { countries: CountryResponse[] } } = await dataFetch.json();
	return {
		countries: data?.countries.map(({ region, ...rest }) => ({ ...rest, region: region?.name }))
	};
};
