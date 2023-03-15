import type { INodeProperties } from 'n8n-workflow';
import { CustomerQuery } from './CustomerQuery';

export const customerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customer'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a customer',
				action: 'Get a customer',
			},
			{
				name: 'Find Many',
				value: 'find_many',
				description: 'Find many customers',
				action: 'Find many customers',
			},
		],
		default: 'get',
	},
];

export const customerFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                customer:get                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['get'],
			},
		},
		required: true,
	},
	/* -------------------------------------------------------------------------- */
	/*                              customer:find_many                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		description: 'Max number of results to return',
		default: 50,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['find_many'],
			},
		},
	},
	{
		displayName: 'Order',
		name: 'order',
		type: 'options',
		options: [
			{
				name: 'Ascending By Order Date',
				value: 'last_order_date ASC',
			},
			{
				name: 'Descending By Order Date',
				value: 'last_order_date DESC',
			},
		],
		description: 'Order of results',
		default: 'last_order_date DESC',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['find_many'],
			},
		},
	},
	CustomerQuery,
];
