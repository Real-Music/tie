import { TableParamsProps } from "@/components/table/interfaces";

export interface Query extends TableParamsProps {
	fellowship: string;
	senior_cell?: string;
}

export interface Option {
	value: string;
	label: string;
}

export interface NewUserForm {
	title: Option | null;
	full_name: string;
	phone_number: string;
	fellowship: Option | null;
	senior_cell: Option | null;
}

export interface NewUser {
	title: string;
	full_name: string;
	fellowship: string;
	senior_cell?: string | null;
}

export interface User extends NewUser {
	id: number;
	created_on: string
	updated_on?: string;
	deleted_on?: string;
}