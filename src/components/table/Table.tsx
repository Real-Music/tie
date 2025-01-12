import isNumber from "@/utils/isNumber";

import { useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination, { PaginationProps } from "./Pagination";
import TableBody, { TableBodyProps } from "./TableBody";
import TableHead from "./TableHead";
import { TableParamsProps as Query } from "./interfaces";
import { ProgressBar, ProgressRoot } from "../ui/progress";
import { Box, Table } from "@chakra-ui/react";

interface Props<T, Q> extends TableBodyProps<T>, PaginationProps<Q> {
  isFetching?: boolean;
  notClickable?: boolean;
}
function AppTable<T, Q extends Query = Query>(props: Props<T, Q>) {
  const [searchParams] = useSearchParams();

  const handleURL = () => {
    if (searchParams.size > 0) {
      const params: { [key: string]: string | number } = {};

      for (const [key, value] of searchParams.entries()) {
        if (key === "page") params[key] = Number(value) - 1;
        else params[key] = isNumber(value) ? Number(value) : value;
      }

      props.setQuery((q: Q) => ({ ...q, ...params }));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => handleURL(), []);

  return (
    <>
      <Box w="100%" h="6px">
        {props.isFetching && (
          <ProgressRoot size="xs" w="100%" value={null}>
            <ProgressBar />
          </ProgressRoot>
        )}
      </Box>

      <Table.ScrollArea>
        <Table.Root size="sm" striped stickyHeader>
          <TableHead columns={props.columns} />
          <TableBody {...props} />
        </Table.Root>
      </Table.ScrollArea>
      <Pagination {...props} />
    </>
  );
}

export default AppTable;
