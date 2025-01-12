import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import useAdminLogin from "@/hooks/useAdminLogin";
import { AdminLoginProps } from "@/interface/AdminLogin";
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
import { ChangeEvent, useState } from "react";

const initState = {
  username: "",
  password: "",
};

function AdminLogin() {
  const [state, setState] = useState<AdminLoginProps>(initState);

  const { mutate, isPending } = useAdminLogin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    mutate(state);
  };

  return (
    <Box minH="100dvh">
      <Center pt="5%">
        <VStack maxW={400}>
          <Image src="/logo.png" h={100} />

          <Heading textAlign="center">Admin Portal</Heading>

          <Card.Root gap={4} minW={{ base: "100%", md: 350 }}>
            <Card.Body>
              <Text mb={2} textAlign="center">
                Fill in the form below to login.
              </Text>

              <VStack gap={4} as="form" onSubmit={handleSubmit}>
                <Field required label="Username">
                  <Input
                    name="username"
                    disabled={isPending}
                    placeholder="John Deo"
                    value={state.username}
                    onChange={handleChange}
                  />
                </Field>

                <Field required label="Password">
                  <Input
                    type="password"
                    name="password"
                    disabled={isPending}
                    value={state.password}
                    placeholder="**********"
                    onChange={handleChange}
                  />
                </Field>

                <Button
                  colorPalette="blue"
                  disabled={isPending}
                  w="100%"
                  type="submit"
                >
                  Login
                </Button>
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Center>
    </Box>
  );
}

export default AdminLogin;
