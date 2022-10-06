export interface Country {
	image: string;
	id: string;
	name: string;
	capital: string;
}

export interface CountryData extends Country {
	region: string;
}
