import type { INodeProperties } from 'n8n-workflow';

export const CustomerUpdate: INodeProperties = {
	displayName: 'Update Fields',
	name: 'updateFields',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: false,
	},
	displayOptions: {
		show: {
			resource: ['customer'],
			operation: ['update'],
		},
	},
	options: [
		{
			name: 'tags',
			displayName: 'Tags',
			values: [
				{
					displayName: 'Tags',
					name: 'tags',
					type: 'string',
					default: '',
					description:
						'Tags that the shop owner has attached to the customer, formatted as a string of comma-separated values',
				},
			],
		},
		{
			name: 'email',
			displayName: 'Email',
			values: [
				{
					displayName: 'Email',
					name: 'email',
					type: 'string',
					default: '',
					placeholder: 'name@email.com',
					description: 'The unique email address of the customer',
				},
			],
		},
		{
			name: 'note',
			displayName: 'Note',
			values: [
				{
					displayName: 'Note',
					name: 'note',
					type: 'string',
					default: '',
					description: 'A note about the customer',
				},
			],
		},
	],
	default: [], // Initially selected options
	description: 'The fields to update',
};
