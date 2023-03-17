import type { INodeProperties } from 'n8n-workflow';

export const CustomerCreate: INodeProperties = {
	displayName: 'Create Customer',
	name: 'createCustomer',
	type: 'fixedCollection',
	displayOptions: {
		show: {
			resource: ['customer'],
			operation: ['create'],
		},
	},
	typeOptions: {
		multipleValues: false,
	},
	options: [
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
			name: 'tags',
			displayName: 'Tags',
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
			displayName: 'Addresses',
			name: 'addresses',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			values: [
				{
					displayName: 'Address',
					name: 'address',
					type: 'collection',
					default: {},
					options: [
						{
							displayName: 'Address 1',
							name: 'address1',
							type: 'string',
							default: '',
						},
						{
							displayName: 'City',
							name: 'city',
							type: 'string',
							default: '',
						},
						{
							displayName: 'Province',
							name: 'province',
							type: 'string',
							default: '',
						},
						{
							displayName: 'Phone',
							name: 'phone',
							type: 'string',
							default: '',
						},
						{
							displayName: 'Zip',
							name: 'zip',
							type: 'string',
							default: '',
						},
						{
							displayName: 'Last Name',
							name: 'last_name',
							type: 'string',
							default: '',
						},
						{
							displayName: 'First Name',
							name: 'first_name',
							type: 'string',
							default: '',
						},
						{
							displayName: 'Country',
							name: 'country',
							type: 'string',
							default: '',
						},
					],
				},
			],
			default: [],
		},
		{
			name: 'password',
			displayName: 'Password',
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
			name: 'password_confirmation',
			displayName: 'Password Confirmation',
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
			name: 'send_email_welcome',
			displayName: 'Send Email Welcome',
			values: [
				{
					displayName: 'Value',
					name: 'value',
					type: 'boolean',
					default: false,
				},
			],
		},
	],
	default: [],
	description: 'Fields for creating a new customer',
};
