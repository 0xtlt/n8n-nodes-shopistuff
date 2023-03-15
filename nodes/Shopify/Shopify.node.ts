import type {
	IExecuteFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { shopifyApiRequest, shopifyApiRequestAllItems } from './GenericFunctions';

import { customerFields, customerOperations } from './CustomerDescription';

// import type { ICustomer } from './CustomerInterface';

export class ModernShopify implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Modern Shopify',
		name: 'modern_shopify',
		icon: 'file:shopify.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Shopify API',
		defaults: {
			name: 'Modern Shopify',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'shopifyAccessTokenApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['accessToken'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Access Token',
						value: 'accessToken',
					},
					{
						name: 'OAuth2',
						value: 'oAuth2',
					},
					{
						name: 'API Key',
						value: 'apiKey',
					},
				],
				default: 'apiKey',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Order',
						value: 'order',
					},
					{
						name: 'Product',
						value: 'product',
					},
				],
				default: 'order',
			},
			// CUSTOMER
			...customerOperations,
			...customerFields,
		],
	};

	methods = {
		loadOptions: {
			// Get all the available products to display them to user so that he can
			// select them easily
			async getCustomers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const customers = await shopifyApiRequestAllItems.call(
					this,
					'products',
					'GET',
					'/customers.json',
					{},
					{ fields: 'id' },
				);
				for (const customer of customers) {
					const customerId = customer.id;
					returnData.push({
						name: 'he',
						value: customerId,
					});
				}
				return returnData;
			},
			// Get all the available locations to display them to user so that he can
			// select them easily
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const length = items.length;
		let responseData;
		const qs: IDataObject = {};
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);
		for (let i = 0; i < length; i++) {
			try {
				if (resource === 'customer') {
					//https://shopify.dev/docs/admin-api/rest/reference/orders/order#index-2020-04
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const options = this.getNodeParameter('options', i);
						if (options.fields) {
							qs.fields = options.fields as string;
						}
						if (options.attributionAppId) {
							qs.attribution_app_id = options.attributionAppId as string;
						}
						if (options.createdAtMin) {
							qs.created_at_min = options.createdAtMin as string;
						}
						if (options.createdAtMax) {
							qs.created_at_max = options.createdAtMax as string;
						}
						if (options.updatedAtMax) {
							qs.updated_at_max = options.updatedAtMax as string;
						}
						if (options.updatedAtMin) {
							qs.updated_at_min = options.updatedAtMin as string;
						}
						if (options.processedAtMin) {
							qs.processed_at_min = options.processedAtMin as string;
						}
						if (options.processedAtMax) {
							qs.processed_at_max = options.processedAtMax as string;
						}
						if (options.sinceId) {
							qs.since_id = options.sinceId as string;
						}
						if (options.ids) {
							qs.ids = options.ids as string;
						}
						if (options.status) {
							qs.status = options.status as string;
						}
						if (options.financialStatus) {
							qs.financial_status = options.financialStatus as string;
						}
						if (options.fulfillmentStatus) {
							qs.fulfillment_status = options.fulfillmentStatus as string;
						}

						if (returnAll) {
							responseData = await shopifyApiRequestAllItems.call(
								this,
								'customers',
								'GET',
								'/customers.json',
								{},
								qs,
							);
						} else {
							qs.limit = this.getNodeParameter('limit', i);
							responseData = await shopifyApiRequest.call(this, 'GET', '/customers.json', {}, qs);
							responseData = responseData.orders;
						}
					}
					//https://shopify.dev/docs/admin-api/rest/reference/orders/order#update-2019-10
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject[]),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}
		return this.prepareOutputData(returnData);
	}
}
