type TextPropertyFilters = {
	equals: string;
	does_not_equal: string;
	contains: string;
	does_not_contain: string;
	starts_with: string;
	ends_with: string;
	is_empty: true;
	is_not_empty: true;
};

type NumberPropertyFilters = {
	equals: number;
	does_not_equals: number;
	greater_than: number;
	less_than: number;
	greater_than_or_equal_to: number;
	less_than_or_equal_to: number;
	is_empty: true;
	is_not_empty: true;
};

type CheckBoxPropertyFilters = {
	equals: boolean;
	does_not_equal: boolean;
};

type SelectPropertyFilters = {
	equals: string;
	does_not_equal: string;
	is_empty: true;
	is_not_empty: true;
};

type MultiSelectPropertyFilters = {
	contains: string;
	does_not_contain: string;
	is_empty: true;
	is_not_empty: true;
};

export type FilterOptions = {
	text: TextPropertyFilters;
	title: TextPropertyFilters;
	number: NumberPropertyFilters;
	checkbox: CheckBoxPropertyFilters;
	select: SelectPropertyFilters;
	multi_select: MultiSelectPropertyFilters;
	url: string;
};

type SingleFilter<T extends Record<string, keyof FilterOptions>> = {
	[Property in keyof T]?: Partial<FilterOptions[T[Property]]>;
};
// & { [OtherProperty in keyof T]? : OtherProperty extends never } ;

type CompoundFilters<T extends Record<string, keyof FilterOptions>> = {
	and?: Array<SingleFilter<T> | CompoundFilters<T>>;
	or?: Array<SingleFilter<T> | CompoundFilters<T>>;
};
export type Query<T extends Record<string, keyof FilterOptions>> = {
	filter?: SingleFilter<T> | CompoundFilters<T>;
	sort?: [];
};
