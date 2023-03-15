import type { OptionsWithUri } from 'request';

import type {
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IOAuth2Options,
} from 'n8n-workflow';

import { snakeCase } from 'change-case';

export async function shopifyApiRequest(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: string,
	resource: string,

	body: any = {},
	query: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
): Promise<any> {
	const authenticationMethod = this.getNodeParameter('authentication', 0, 'oAuth2') as string;

	let credentials;
	let credentialType = 'shopitrucOAuth2Api';

	if (authenticationMethod === 'apiKey') {
		credentials = await this.getCredentials('shopitrucApi');
		credentialType = 'shopitrucApi';
	} else if (authenticationMethod === 'accessToken') {
		credentials = await this.getCredentials('shopitrucAccessTokenApi');
		credentialType = 'shopitrucAccessTokenApi';
	} else {
		credentials = await this.getCredentials('shopitrucOAuth2Api');
	}

	const options: OptionsWithUri = {
		method,
		qs: query,
		uri: uri || `https://${credentials.shopSubdomain}.myshopify.com/admin/api/2023-01${resource}`,
		body,
		json: true,
	};

	const oAuth2Options: IOAuth2Options = {
		tokenType: 'Bearer',
		keyToIncludeInAccessTokenHeader: 'X-Shopify-Access-Token',
	};

	if (authenticationMethod === 'apiKey') {
		Object.assign(options, {
			auth: { username: credentials.apiKey, password: credentials.password },
		});
	}

	if (Object.keys(option).length !== 0) {
		Object.assign(options, option);
	}
	if (Object.keys(body as IDataObject).length === 0) {
		delete options.body;
	}
	if (Object.keys(query).length === 0) {
		delete options.qs;
	}

	return this.helpers.requestWithAuthentication.call(this, credentialType, options, {
		oauth2: oAuth2Options,
	});
}

export async function shopifyApiRequestAllItems(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	propertyName: string,
	method: string,
	resource: string,

	body: any = {},
	query: IDataObject = {},
): Promise<any> {
	const returnData: IDataObject[] = [];

	/*
	 	When paginating some parameters
		(e.g. product:getAll -> title ) cannot
		be empty in the query string, so remove
		all the empty ones before paginating.
	*/
	for (const field in query) {
		if (query[field] === '') {
			delete query[field];
		}
	}

	let responseData;

	let uri: string | undefined;

	do {
		responseData = await shopifyApiRequest.call(this, method, resource, body, query, uri, {
			resolveWithFullResponse: true,
		});
		if (responseData.headers.link) {
			uri = responseData.headers.link.split(';')[0].replace('<', '').replace('>', '');
		}
		returnData.push.apply(returnData, responseData.body[propertyName] as IDataObject[]);
	} while (responseData.headers.link?.includes('rel="next"'));
	return returnData;
}

export function keysToSnakeCase(elements: IDataObject[] | IDataObject): IDataObject[] {
	if (elements === undefined) {
		return [];
	}
	if (!Array.isArray(elements)) {
		elements = [elements];
	}
	for (const element of elements) {
		for (const key of Object.keys(element)) {
			if (key !== snakeCase(key)) {
				element[snakeCase(key)] = element[key];
				delete element[key];
			}
		}
	}
	return elements;
}