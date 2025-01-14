import { AppTable, ExportCSV, RefreshTable } from "@/components/table";
import { TableColumnsProps } from "@/components/table/TableHead";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import useUsers from "@/hooks/useUsers";
import { Query } from "@/interface/User";
import { Card, Center, Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import {
  fellowshipOptions as options,
  seniorCellOptions,
} from "./registration";
import { useNavigate } from "react-router-dom";
import { StatLabel, StatRoot, StatValueText } from "@/components/ui/stat";

const columns: TableColumnsProps[] = [
  { key: "title", name: "Title", type: "string" },
  { key: "full_name", name: "Full Name", type: "string" },
  { key: "phone_number", name: "Phone", type: "string" },
  { key: "fellowship", name: "Fellowship", type: "string" },
  { key: "senior_cell", name: "Senior Cell", type: "string" },
  { key: "created_on", name: "Date Registered", type: "date" },
  { key: "action", name: "Action", type: "action" },
];

function Dashboard() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<Query>({
    fellowship: "all",
    page: 0,
    size: 10,
    senior_cell: "all",
  });
  const { data, isLoading, isFetching, refetch } = useUsers(query);
  const handleRegistration = () => navigate("/registration");

  return (
    <Center>
      <Flex p={4} mt="5%" flexDir="column" minW="70%" gap={4}>
        <Heading>Backend Portal</Heading>
        <HStack gap={4} flexDir={{ base: "column", md: "row" }}>
          <Card.Root w={{ base: "100%", md: "fit-content" }}>
            <Card.Body>
              <StatRoot>
                <StatLabel info="The total number of people who have registered so far">
                  Total Registration
                </StatLabel>
                <StatValueText>{data?.data.totalSize || "0"}</StatValueText>
              </StatRoot>
            </Card.Body>
          </Card.Root>

          <Card.Root w={{ base: "100%", md: "fit-content" }}>
            <Card.Body>
              <StatRoot>
                <StatLabel info="The total number of unique senior cell">
                  Total Senior Cell
                </StatLabel>
                <StatValueText>
                  {data?.data.totalSeniorCell || "0"}
                </StatValueText>
              </StatRoot>
            </Card.Body>
          </Card.Root>
        </HStack>

        <Flex justifyContent="space-between" flexWrap="wrap-reverse" gap={4}>
          <Stack direction="row" gap={4}>
            <MenuRoot
              onSelect={(d) => setQuery({ ...query, fellowship: d.value })}
            >
              <MenuTrigger asChild>
                <Button
                  size="sm"
                  variant="solid"
                  colorPalette="blue"
                  textTransform="capitalize"
                >
                  {query.fellowship} Fellowship
                </Button>
              </MenuTrigger>
              <MenuContent>
                {[{ value: "all", label: "All" }, ...options].map((f) => (
                  <MenuItem key={f.value} value={f.value}>
                    {f.label}
                  </MenuItem>
                ))}
              </MenuContent>
            </MenuRoot>

            {query.fellowship === "BLW Buea" && (
              <MenuRoot
                onSelect={(d) => setQuery({ ...query, senior_cell: d.value })}
              >
                <MenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="solid"
                    colorPalette="blue"
                    textTransform="capitalize"
                  >
                    {query.senior_cell} Senior Cell
                  </Button>
                </MenuTrigger>
                <MenuContent>
                  {[{ value: "all", label: "All" }, ...seniorCellOptions].map(
                    (f) => (
                      <MenuItem key={f.value} value={f.value}>
                        {f.label}
                      </MenuItem>
                    )
                  )}
                </MenuContent>
              </MenuRoot>
            )}
          </Stack>

          <Stack direction="row" gap={4}>
            <RefreshTable isFetching={isFetching} refetch={refetch} />
            <Button colorScheme="blue" size="sm" onClick={handleRegistration}>
              <FaSquarePlus />
              New Registration
            </Button>
            <ExportCSV data={data?.data.data} isFetching={isFetching} />
          </Stack>
        </Flex>

        <AppTable
          query={query}
          columns={columns}
          setQuery={setQuery}
          data={data?.data.data}
          isLoading={isLoading}
          isFetching={isFetching}
          totalSize={data?.data.totalSize || 0}
        />
      </Flex>
    </Center>
  );
}

export const Component = Dashboard;
export default Dashboard;
