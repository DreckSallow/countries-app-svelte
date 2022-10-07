interface InputCommon {
	text: string;
	value: string;
}

export const enum TypeInput {
	radioInput,
	checkBoxInput
}

export interface FilterRadioInput extends InputCommon {
	group: string;
	name: string;
}
export interface FilterCheckInput extends InputCommon {
	selected: boolean;
}
export type FilterInputType = FilterRadioInput | FilterCheckInput;

export interface FilterContent {
	type: TypeInput;
	childs: FilterInputType[];
}

export interface FilterStore {
	[key: string]: FilterContent;
}
