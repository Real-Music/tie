import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  MdNavigateBefore,
  MdNavigateNext,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { TableParamsProps as Query } from "./interfaces";
import Tooltip from "../Tooltip";
import { Button } from "../ui/button";

export interface PaginationProps<Q> {
  query: Q;
  totalSize: number;
  isLoading: boolean;
  setQuery: Dispatch<SetStateAction<Q>>;
}

function Pagination<T extends Query = Query>(props: PaginationProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryString = new URLSearchParams(searchParams.toString());

  const { isLoading, query, setQuery, totalSize } = props;
  const page = query.page + 1;
  const totalInView = page * query.size;
  const totalPage = Math.ceil(totalSize / query.size);

  const handleSize = (size: number) => {
    setQuery((s) => ({ ...s, size }));
    queryString.set("size", size.toString());
    setSearchParams(queryString);
  };

  const handleFirstPage = () => {
    setQuery((q) => ({ ...q, page: 0 }));
    queryString.set("page", "0");
    setSearchParams(queryString);
  };

  const handlePreviousPage = () => {
    setQuery((q) => {
      queryString.set("page", (q.page - 1).toString());
      return { ...q, page: q.page - 1 };
    });
    setSearchParams(queryString);
  };

  const handleNextPage = () => {
    setQuery((q) => {
      queryString.set("page", (q.page + 1).toString());
      return { ...q, page: q.page + 1 };
    });
    setSearchParams(queryString);
  };

  const handleLastPage = () => {
    setQuery((q) => ({ ...q, page: totalPage - 1 }));
    queryString.set("page", (totalPage - 1).toString());
    setSearchParams(queryString);
  };

  useEffect(() => {
    Object.keys(query).forEach((key) => {
      if (query[key as keyof Query])
        queryString.set(key, String(query[key as keyof Query]));
      else queryString.delete(key);
    });
    setSearchParams(queryString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Flex gap={2} justifyContent="space-between" flexWrap="wrap-reverse">
      <HStack>
        <Text fontSize="small">Number of rows per page</Text>
        <Tooltip
          placement="top"
          content={
            <Box borderWidth={1} bgColor="bg.subtle">
              {[5, 10, 15].map((size) => (
                <Button
                  size="sm"
                  key={size}
                  fontWeight={400}
                  onClick={() => handleSize(size)}
                  colorPalette={size === query.size ? "blue" : "gray"}
                  variant={size === query.size ? "solid" : "ghost"}
                >
                  {size}
                </Button>
              ))}
            </Box>
          }
          interactive
          trigger="click"
        >
          <Button size="sm" fontWeight={400} variant="outline">
            {query.size}
          </Button>
        </Tooltip>
        <Text fontSize="small">
          {query.page * query.size + 1} -{" "}
          {totalInView > totalSize ? totalSize : totalInView} of {totalSize}{" "}
          rows
        </Text>
      </HStack>

      <HStack>
        <Tooltip placement="top" content="First page">
          <IconButton
            size="sm"
            variant="outline"
            aria-label="first-item"
            disabled={page === 1 || isLoading}
            onClick={() => handleFirstPage()}
          >
            <MdSkipPrevious />
          </IconButton>
        </Tooltip>

        <Tooltip placement="top" content="Previous page">
          <IconButton
            size="sm"
            variant="outline"
            aria-label="previous-page"
            disabled={page === 1 || isLoading}
            onClick={() => handlePreviousPage()}
          >
            <MdNavigateBefore />
          </IconButton>
        </Tooltip>
        <Text fontSize="small">
          Page {page} of {totalPage}
        </Text>

        <Tooltip placement="top" content="Next page">
          <IconButton
            size="sm"
            variant="outline"
            aria-label="next-page"
            disabled={page === totalPage || isLoading}
            onClick={() => handleNextPage()}
          >
            <MdNavigateNext />
          </IconButton>
        </Tooltip>

        <Tooltip placement="top" content="Last page">
          <IconButton
            size="sm"
            variant="outline"
            aria-label="last-page"
            onClick={() => handleLastPage()}
            disabled={page === totalPage || isLoading}
          >
            <MdSkipNext />
          </IconButton>
        </Tooltip>
      </HStack>
    </Flex>
  );
}

export default Pagination;
