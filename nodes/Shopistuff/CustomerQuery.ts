import type { INodeProperties } from 'n8n-workflow';

export const CustomerQuery: INodeProperties = {
	displayName: 'Query',
	name: 'query',
	type: 'fixedCollection',
	displayOptions: {
		show: {
			resource: ['customer'],
			operation: ['find_many'],
		},
	},
	typeOptions: {
		multipleValues: false,
	},
	options: [
		{
			name: 'accepts_marketing',
			displayName: 'Accepts Marketing',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'boolean',
					default: true,
				},
			],
		},
		{
			name: 'activation_date',
			displayName: 'Activation Date',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'dateTime',
					default: '',
				},
			],
		},
		{
			name: 'address1',
			displayName: 'Address 1',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'address2',
			displayName: 'Address 2',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'city',
			displayName: 'City',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'company',
			displayName: 'Company',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'country',
			displayName: 'Country',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'customer_date',
			displayName: 'Customer Date',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'dateTime',
					default: '',
				},
			],
		},
		{
			name: 'customer_first_name',
			displayName: 'Customer First Name',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'customer_id',
			displayName: 'Customer ID',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'number',
					default: '',
				},
			],
		},
		{
			name: 'customer_last_name',
			displayName: 'Customer Last Name',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'customer_tag',
			displayName: 'Customer Tag',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'email',
			displayName: 'Email',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'email_marketing_state',
			displayName: 'Email Marketing State',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'options',
					options: [
						{ name: 'Subscribed', value: 'subscribed' },
						{ name: 'Unsubscribed', value: 'unsubscribed' },
					],
					default: 'subscribed',
				},
			],
		},
		{
			name: 'first_name',
			displayName: 'First Name',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'first_order_date',
			displayName: 'First Order Date',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'dateTime',
					default: '',
				},
			],
		},
		{
			name: 'id',
			displayName: 'ID',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'number',
					default: '',
				},
			],
		},
		{
			name: 'last_abandoned_order_date',
			displayName: 'Last Abandoned Order Date',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'dateTime',
					default: '',
				},
			],
		},
		{
			name: 'last_name',
			displayName: 'Last Name',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'multipass_identifier',
			displayName: 'Multipass Identifier',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'orders_count',
			displayName: 'Orders Count',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'number',
					default: '',
				},
			],
		},
		{
			name: 'order_date',
			displayName: 'Order Date',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'dateTime',
					default: '',
				},
			],
		},
		{
			name: 'phone',
			displayName: 'Phone',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'province',
			displayName: 'Province',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'shop_id',
			displayName: 'Shop ID',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'number',
					default: '',
				},
			],
		},
		{
			name: 'state',
			displayName: 'State',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'tag',
			displayName: 'Tag',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
		{
			name: 'total_spent',
			displayName: 'Total Spent',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'number',
					default: '',
				},
			],
		},
		{
			name: 'updated_at',
			displayName: 'Updated At',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'dateTime',
					default: '',
				},
			],
		},
		{
			name: 'verified_email',
			displayName: 'Verified Email',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'boolean',
					default: true,
				},
			],
		},
		{
			name: 'product_subscriber_status',
			displayName: 'Product Subscriber Status',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'options',
					options: [
						{ name: 'Subscribed', value: 'subscribed' },
						{ name: 'Unsubscribed', value: 'unsubscribed' },
					],
					default: 'subscribed',
				},
			],
		},
	],
	default: [], // Initially selected options
	description: 'Query parameters for filtering the results',
};
