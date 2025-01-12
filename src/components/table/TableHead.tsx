import { Table } from "@chakra-ui/react";

export interface TableColumnsProps {
  key: string;
  name: string;
  type:
    | "date"
    | "datetime"
    | "string"
    | "number"
    | "status"
    | "percent"
    | "action";
}
export interface TableHeadProps {
  columns: TableColumnsProps[];
}

export default function TableHead({ columns }: TableHeadProps) {
  return (
    <Table.Header>
      <Table.Row>
        {columns.map((c) => (
          <Table.ColumnHeader color="blue" fontWeight="bold" key={c.name}>
            {c.name}
          </Table.ColumnHeader>
        ))}
      </Table.Row>
    </Table.Header>
  );
}
