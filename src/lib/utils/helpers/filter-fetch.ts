import type { CountryResponse } from '$lib/types/country';
import type { SortFilter } from '$lib/types/filters/index';
import { Net } from '../fetch/fetch';

const query = `
	query getCountries($sort: SortCountry,$languages: [String], $regions: [String]) {
		countries(sort: $sort,languages: $languages, regions: $regions) {
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

type SortProps = {
	[p in SortFilter]?: boolean | null;
};
type filters = { languages?: string[]; regions?: string[] };

export const filterFetch = async (sort: SortProps, { languages, regions }: filters) => {
	const { content, existError, status } = await Net.post<{
		data: { countries: CountryResponse[] };
	}>({
		url: 'http://localhost:4000/',
		body: JSON.stringify({
			query,
			variables: {
				sort: sort,
				languages,
				regions
			}
		})
	});
	if (existError) {
		throw new Error('Exist error' + status);
	}
	return {
		countries: content?.data.countries ?? []
	};
};
