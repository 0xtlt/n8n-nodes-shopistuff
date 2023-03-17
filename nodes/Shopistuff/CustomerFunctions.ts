// CustomerFunctions.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { GetValueOfObj, shopifyApiRequest } from './GenericFunctions';

export default async function findMany(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index) as number;
	const order = this.getNodeParameter('order', index) as string;
	const queryParameters = this.getNodeParameter('query', index, []) as Array<{
		name: string;
		value: string;
	}>;

	const qs: { [key: string]: string } = {
		limit: limit.toString(),
		order,
	};

	Object.entries(queryParameters).forEach(([key, { value }]) => {
		qs[key] = value;
	});

	const responseData = await shopifyApiRequest.call(this, 'GET', '/customers/search.json', {}, qs);

	return this.helpers.returnJsonArray(responseData.customers);
}

// CustomerFunctions.ts
export async function updateCustomer(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const customerId = this.getNodeParameter('customerId', index) as string;
	const updateFields = this.getNodeParameter('updateFields', index, {});

	const updateFieldsEnd: any = {};

	const email = GetValueOfObj(updateFields, 'email');
	const note = GetValueOfObj(updateFields, 'note');
	const tags = GetValueOfObj(updateFields, 'tags');

	if (email) {
		updateFieldsEnd.email = email;
	}

	if (note) {
		updateFieldsEnd.note = note;
	}

	if (tags) {
		updateFieldsEnd.tags = tags;
	}

	const body = {
		customer: {
			id: customerId,
			...updateFieldsEnd,
		},
	};

	const responseData = await shopifyApiRequest.call(
		this,
		'PUT',
		`/customers/${customerId}.json`,
		body,
	);

	return responseData.customer;
}

export async function getCustomer(this: IExecuteFunctions, id: string) {
	const endpoint = `/customers/${id}.json`;
	const responseData = await shopifyApiRequest.call(this, 'GET', endpoint);
	return responseData.customer;
}

// CustomerFunctions.ts
export async function createCustomer(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const customerData = this.getNodeParameter('createCustomer', index, {}) as {
		first_name: { value: string };
		tags: { value: string };
		last_name: { value: string };
		phone: { value: string };
		verified_email: { value: boolean };
		password: { value: string };
		password_confirmation: { value: string };
		send_email_welcome: { value: boolean };
		addresses: {
			address: Array<{
				address1: string;
				city: string;
				province: string;
				phone: string;
				zip: string;
				last_name: string;
				first_name: string;
				country: string;
			}>;
		};
	};

	const body = {
		customer: {
			email: this.getNodeParameter('email', index) as string,
			tags: customerData.tags?.value,
			first_name: customerData.first_name?.value,
			last_name: customerData.last_name?.value,
			phone: customerData.phone?.value,
			verified_email: customerData.verified_email?.value,
			password: customerData.password?.value,
			password_confirmation: customerData.password_confirmation?.value,
			send_email_welcome: customerData.send_email_welcome?.value,
			addresses: [customerData.addresses?.address],
		},
	};

	// Remove undefined values
	Object.entries(body.customer).forEach(([key, value]) => {
		if (value === undefined) {
			delete (body as any).customer[key];
		}
	});

	const responseData = await shopifyApiRequest.call(this, 'POST', '/customers.json', body);

	return responseData.customer;
}
