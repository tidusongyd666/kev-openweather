export interface weather {
	description?: string;
}
export interface Country {
	country: string;
}

export interface PagedCountries {
	page: number;
	count: number;
	size: number;
	countries: Country[];
}

export interface City {
	id: string;
	name: string;
	country: string;
}

export interface PagedCities {
	page: number;
	count: number;
	size: number;
	cities: City[];
}



export interface ApiError {
	userMessage: string;
	internalMessage: string;
	code: number;
}