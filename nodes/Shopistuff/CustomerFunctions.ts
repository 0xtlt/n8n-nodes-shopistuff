// CustomerFunctions.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { GetValueOfObj, shopifyApiRequest } from './GenericFunctions';

export default async function findMany(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index) as number;
	const order = this.getNodeParameter('order', index) as string;
	const queryParameters = this.getNodeParameter('queryParameters', index, []) as Array<{
		name: string;
		value: string;
	}>;

	const qs: { [key: string]: string } = {
		limit: limit.toString(),
		order,
	};

	queryParameters.forEach((param) => {
		qs[param.name] = param.value;
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
