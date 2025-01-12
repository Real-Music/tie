import { formatDateTime } from "@/utils/tableUtils";
import { uuid } from "@/utils/uuid";
import { TableHeadProps } from "./TableHead";
import { Table } from "@chakra-ui/react";
import { SkeletonText } from "../ui/skeleton";

export interface TableBodyProps<T> extends TableHeadProps {
  data?: T[];
  isLoading: boolean;
}

interface SkeletonProps extends TableHeadProps {
  item: number;
}

interface TableRowProps<T> extends TableBodyProps<T> {
  item: T;
  isLoading: boolean;
  notClickable?: boolean;
}

const initData = [1, 2, 3];
export default function TableBody<T>(props: TableBodyProps<T>) {
  const { data, columns } = props;

  return (
    <Table.Body>
      {(data || initData).map((item) => {
        const isNumber = typeof item === "number";
        if (isNumber)
          return <Skeleton key={item} item={item} columns={columns} />;

        const key =
          item["identifier" as keyof T] || item["id" as keyof T] || uuid();
        return <TableRow key={key as string} {...props} item={item} />;
      })}
    </Table.Body>
  );
}

function TableRow<T>(props: TableRowProps<T>) {
  const { item, isLoading, columns } = props;

  return (
    <Table.Row>
      {columns.map(({ key, type }) => {
        let content = item[key as keyof T] as string;
        if (type === "datetime") content = formatDateTime(content);

        return (
          <Table.Cell textTransform="capitalize" fontSize="small" key={uuid()}>
            <SkeletonText noOfLines={1} loading={isLoading}>
              {content}
            </SkeletonText>
          </Table.Cell>
        );
      })}
    </Table.Row>
  );
}

function Skeleton(props: SkeletonProps) {
  const { item, columns } = props;

  return (
    <Table.Row>
      {columns.map((c) => (
        <Table.Cell fontSize="small" key={item + c.key}>
          <SkeletonText noOfLines={1}>{item}</SkeletonText>
        </Table.Cell>
      ))}
    </Table.Row>
  );
}
