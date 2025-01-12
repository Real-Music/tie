import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import useTieRegistration from "@/hooks/useTieRegistration";
import { NewUser, NewUserForm, Option } from "@/interface/User";
import {
  Box,
  Card,
  Center,
  Heading,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ActionMeta, Select, SingleValue } from "chakra-react-select";
import { ChangeEvent, useEffect, useState } from "react";

const titleOptions = [
  { value: "Bro", label: "Bro" },
  { value: "Sis", label: "Sis" },
  { value: "Pastor", label: "Pastor" },
];

export const fellowshipOptions = [
  { value: "BLW Buea", label: "BLW Buea" },
  { value: "BLW Ndongo", label: "BLW Ndongo" },
  { value: "BLW Tiko", label: "BLW Tiko" },
  { value: "BLW Kumba", label: "BLW Kumba" },
  { value: "BLW Mile 16", label: "BLW Mile 16" },
  { value: "BLW Mile 18", label: "BLW Mile 18" },
  { value: "BLW Bomaka", label: "BLW Bomaka" },
  { value: "BLW University of Douala", label: "BLW University of Douala" },
  { value: "BLW PK-14", label: "BLW PK-14" },
  { value: "BLW Foumban", label: "BLW Foumban" },
  { value: "BLW Bonaberi", label: "BLW Bonaberi" },
  { value: "BLW Yaounde 1", label: "BLW Yaounde 1" },
  { value: "BLW ICTU", label: "BLW ICTU" },
  { value: "BLW South", label: "BLW South" },
  { value: "BLW Gabon", label: "BLW Gabon" },
  { value: "BLW Chad", label: "BLW Chad" },
  { value: "BLW Congo", label: "BLW Congo" },
];

const seniorCellOptions = [
  { value: "Ambassadors", label: "Ambassadors" },
  { value: "Dominion Ambassadors 1", label: "Dominion Ambassadors 1" },
  { value: "Dominion Ambassadors 2", label: "Dominion Ambassadors 2" },
  { value: "Teknon Ambassadors", label: "Teknon Ambassadors" },
  { value: "Glorious Ambassadors", label: "Glorious Ambassadors" },
  { value: "Zoe Ambassadors", label: "Zoe Ambassadors" },
  { value: "Cloud Flourishing", label: "Cloud Flourishing" },
  { value: "Light Flourishing", label: "Light Flourishing" },
  { value: "Champions", label: "Champions" },
  { value: "Mimshack", label: "Mimshack" },
  { value: "Grace Mimshack", label: "Grace Mimshack" },
  { value: "Phronetic Mimshack", label: "Phronetic Mimshack" },
  { value: "Rabah Mimshack", label: "Rabah Mimshack" },
  { value: "Beacons of Glory", label: "Beacons of Glory" },
  { value: "Excel", label: "Excel" },
  { value: "Elite 1", label: "Elite 1" },
  { value: "Elite 2", label: "Elite 2" },
  { value: "Professional 1", label: "Professional 1" },
  { value: "Professional 2", label: "Professional 2" },
];

const initState = {
  title: null,
  full_name: "",
  fellowship: null,
  senior_cell: null,
};

function Registration() {
  const [state, setState] = useState<NewUserForm>(initState);

  const { mutate, isPending, isSuccess, data } = useTieRegistration();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSelect = (
    newValue: SingleValue<Option>,
    metaAction: ActionMeta<Option>
  ) => {
    setState({ ...state, [metaAction.name!]: newValue });
  };

  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    const fellowship = state.fellowship?.value;
    const isZonalChurch = fellowship === "BLW Buea";
    const senior_cell = isZonalChurch ? state.senior_cell?.value : null;

    const payload: NewUser = {
      ...state,
      fellowship: fellowship!,
      senior_cell,
      title: state.title!.label,
    };
    mutate(payload);
  };

  useEffect(() => {
    if (!isSuccess) return;
    setState(initState);
  }, [isSuccess]);

  return (
    <Box minH="100dvh">
      <Center pt="5%">
        <VStack maxW={400}>
          <Image src="/logo.png" h={100} />

          {isSuccess && (
            <>
              <Heading textAlign="center" textTransform="capitalize">
                Congratulation {`${data?.data.title} ${data?.data.full_name}`}
              </Heading>
              <Text mb={2} textAlign="center">
                You have successfully register under{" "}
                {data.data.senior_cell
                  ? data.data.senior_cell + " Senior Cell"
                  : data.data.fellowship}
              </Text>
            </>
          )}

          {!isSuccess && (
            <>
              <Heading textAlign="center">Registration Form</Heading>

              <Card.Root gap={4}>
                <Card.Body>
                  <Text mb={2} textAlign="center">
                    Fill in the form below to register for the T.I.E Conference.
                  </Text>

                  <VStack gap={4} as="form" onSubmit={handleSubmit}>
                    <Field label="Title" required>
                      <Select
                        required
                        name="title"
                        value={state.title}
                        isLoading={isPending}
                        options={titleOptions}
                        onChange={handleSelect}
                      />
                    </Field>

                    <Field required label="Full Name">
                      <Input
                        name="full_name"
                        disabled={isPending}
                        placeholder="John Deo"
                        value={state.full_name}
                        onChange={handleChange}
                      />
                    </Field>

                    <Field required label="Fellowship">
                      <Select
                        name="fellowship"
                        isLoading={isPending}
                        onChange={handleSelect}
                        value={state.fellowship}
                        options={fellowshipOptions}
                      />
                    </Field>

                    {state.fellowship?.value === "BLW Buea" && (
                      <Field required label="Name of Senior Cell">
                        <Select
                          name="senior_cell"
                          isLoading={isPending}
                          onChange={handleSelect}
                          value={state.senior_cell}
                          options={seniorCellOptions}
                        />
                      </Field>
                    )}

                    <Button disabled={isPending} w="100%" type="submit">
                      Register
                    </Button>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </>
          )}
        </VStack>
      </Center>
    </Box>
  );
}

export default Registration;
