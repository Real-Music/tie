import useAppStore from "@/store";
import { Box, Table, Text } from "@chakra-ui/react";
import { memo } from "react";

function PrayerHistory() {
  const history = useAppStore((s) => s.history);

  return (
    <Box>
      <Text textAlign="center" fontWeight="bold" mb={3}>
        Prayer History
      </Text>

      <Table.Root size="sm" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader fontWeight="bold">Date</Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="bold">
              Duration (minutes)
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {history.map((session, index) => (
            <Table.Row key={index}>
              <Table.Cell>{new Date(session.date).toDateString()}</Table.Cell>
              <Table.Cell>
                {Math.floor(session.duration / 60)} minutes
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {history.length === 0 && (
        <Text textAlign="center">No history available yet.</Text>
      )}
    </Box>
  );
}

export default memo(PrayerHistory);
