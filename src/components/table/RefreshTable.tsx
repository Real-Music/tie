import { IconButton } from "@chakra-ui/react";
import { MdRefresh } from "react-icons/md";

interface Props {
  isFetching: boolean;
  refetch: () => void;
}

export default function RefreshTable({ isFetching, refetch }: Props) {
  return (
    <IconButton
      size="sm"
      variant="outline"
      colorScheme="gray"
      disabled={isFetching}
      onClick={() => refetch()}
      aria-label="reload table"
    >
      <MdRefresh />
    </IconButton>
  );
}
