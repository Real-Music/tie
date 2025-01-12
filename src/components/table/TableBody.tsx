import useDeleteUser from "@/hooks/useDeleteUser";
import { formatDateTime } from "@/utils/tableUtils";
import { uuid } from "@/utils/uuid";
import { Box, Spinner, Table, Text } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { Button } from "../ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../ui/dialog";
import { SkeletonText } from "../ui/skeleton";
import { TableHeadProps } from "./TableHead";

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
  const [open, setOpen] = useState(false);
  const { mutate, isPending, isSuccess } = useDeleteUser();
  const { item, isLoading, columns } = props;

  const handleDelete = () => mutate(item["id" as keyof T] as number);
  useEffect(() => {
    if (!isSuccess) return;
    setOpen(false); // Reset dialog after deletion
  }, [isSuccess]);

  return (
    <Table.Row>
      {columns.map(({ key, type }) => {
        let content = item[key as keyof T] as unknown;
        if (type === "datetime") content = formatDateTime(content as string);
        if (type === "action")
          content = (
            <Box onClick={() => setOpen(true)} cursor="pointer">
              {isPending ? <Spinner /> : <FaTrash />}
            </Box>
          );

        return (
          <>
            <Table.Cell
              textTransform="capitalize"
              fontSize="small"
              key={uuid()}
            >
              <SkeletonText noOfLines={1} loading={isLoading}>
                {content as ReactNode}
              </SkeletonText>
            </Table.Cell>

            {type === "action" && (
              <DialogRoot
                open={open}
                placement="center"
                closeOnEscape={false}
                onOpenChange={(e) => setOpen(e.open)}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                  </DialogHeader>
                  <DialogBody>
                    <Text display="inline">
                      Are you absolutely sure you want to delete{" "}
                      <Text
                        fontWeight="bold"
                        textTransform="capitalize"
                        display="inline"
                      >
                        {`${item["title" as keyof T]} ${
                          item["full_name" as keyof T]
                        }`}
                      </Text>
                    </Text>
                  </DialogBody>
                  <DialogFooter>
                    <DialogActionTrigger asChild>
                      <Button
                        variant="outline"
                        loading={isPending}
                        disabled={isPending}
                        colorPalette="green"
                      >
                        Cancel
                      </Button>
                    </DialogActionTrigger>
                    <Button
                      mr={3}
                      size="sm"
                      type="submit"
                      colorPalette="red"
                      loading={isPending}
                      disabled={isPending}
                      onClick={handleDelete}
                    >
                      Yes
                    </Button>
                  </DialogFooter>
                  <DialogCloseTrigger disabled={isPending} />
                </DialogContent>
              </DialogRoot>
            )}
          </>
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
