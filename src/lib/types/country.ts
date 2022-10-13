import type { Border, Language } from './filters/filter-types';

export interface Country {
	image: string;
	id: string;
	name: string;
	capital: string;
	area: number | null;
	fifa: string | null;
	population: string;
	iconFlag: string | null;
}

export interface CountryData extends Country {
	region: string;
	borders: string[];
	languages: string[];
}

export interface CountryResponse extends Country {
	region: {
		name: string;
	} | null;
	borders: Border[] | null;
	languages: Language[] | null;
	icon_flag: string | null;
}
