import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ShopistuffApi implements ICredentialType {
	name = 'shopitrucApi';
	displayName = 'Shopitruc API';
	documentationUrl = 'https://shopify.dev';
	properties: INodeProperties[] = [
		{
			displayName: 'Shop Subdomain',
			name: 'shopSubdomain',
			required: true,
			type: 'string',
			default: '',
			description: 'Only the subdomain without .myshopify.com',
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			required: true,
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'APP Secret Key',
			name: 'appSecretKey',
			required: true,
			type: 'string',
			default: '',
			description: 'Secret key needed to verify the webhook when using Shopify Trigger node',
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Shopify-Access-Token': '={{$credentials?.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '=https://{{$credentials?.shopSubdomain}}.myshopify.com/admin/api/2023-01',
			url: '/shop.json',
		},
	};
}
