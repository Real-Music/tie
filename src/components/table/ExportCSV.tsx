import exportToCSV from "@/utils/exportToCSV";
import { Button, IconButton, Input } from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field } from "../ui/field";
import Tooltip from "../Tooltip";
// import InputForm from "../InputForm";
// import Tooltip from "../Tooltip";
// import Wrapper from "../Wrapper";

interface Props<T extends object> {
  data?: T[];
  isFetching: boolean;
}

export default function ExportCSV<T extends object>({
  data,
  isFetching,
}: Props<T>) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const finalRef = useRef(null);

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    exportToCSV(input, data ?? []);
    setOpen(false);
    setInput("");
  };

  return (
    <>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
          <Tooltip content="Download as CSV" placement="top">
            <IconButton
              size="sm"
              ref={finalRef}
              variant="outline"
              colorScheme="gray"
              aria-label="download"
              disabled={isFetching}
              onClick={() => setOpen(true)}
            >
              <FaDownload />
            </IconButton>
          </Tooltip>
        </DialogTrigger>

        <DialogContent as="form" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Download data as csv</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Field required label="Filename">
              <Input
                required
                value={input}
                name="filename"
                onChange={(e) => setInput(e.target.value)}
              />
            </Field>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button size="sm" type="submit" colorScheme="blue" mr={3}>
              Save
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
}
