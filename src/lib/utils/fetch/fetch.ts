export interface ParamsFetch {
	url: string;
	headers?: HeadersInit;
	body?: BodyInit;
}

export interface DataFetch<T> {
	existError: boolean;
	status?: number;
	content: T | null;
}

export class Net {
	public static async get<T>(
		{ url, headers }: ParamsFetch,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		customFetch?: any
	): Promise<DataFetch<T>> {
		const fetchFn = customFetch ?? fetch;
		const response = await fetchFn(url, {
			method: 'GET',
			headers: headers ?? {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});
		if (response.ok) {
			const content = await response.json();
			return { content, existError: false };
		}
		return { existError: true, status: response.status, content: null };
	}
	public static async post<T>(
		{ url, headers, body }: ParamsFetch,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		customFetch?: any
	): Promise<DataFetch<T>> {
		const fetchFn = customFetch ?? fetch;
		const response = await fetchFn(url, {
			method: 'POST',
			headers: headers ?? {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: body ?? null
		});
		if (response.ok) {
			const content = await response.json();
			return { content, existError: false };
		}
		return { existError: true, status: response.status, content: null };
	}
}
