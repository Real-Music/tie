import useAppStore from "@/store";
import { Card, Center, Image, Input, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, useLayoutEffect, useState } from "react";
import { FaUpload } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Field } from "./ui/field";
import { FileUploadRoot, FileUploadTrigger } from "./ui/file-upload";

interface Props {
  onSelectedImage: () => void;
  setUploadedImg: (image: string) => void;
}

function ProfileForm(props: Props) {
  const { setUploadedImg, onSelectedImage } = props;

  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const { profileImg, setName, name } = useAppStore();

  const handleFileSelect = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result?.toString() || "";
      setUploadedImg(result);
      onSelectedImage();
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: ChangeEvent<HTMLDivElement>) => {
    event.preventDefault();
    setName(fullName);
    navigate("/daily-prayer");
  };

  useLayoutEffect(() => {
    if (name) setFullName(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Center pt="10%" as="form" onSubmit={handleSubmit}>
      <VStack>
        <Image src="/logo.png" alt="T.I.E Conference Logo" h={100} />
        <Card.Root>
          <Card.Body gap={4}>
            <VStack>
              {profileImg && (
                <Avatar src={profileImg} variant="solid" size="2xl" />
              )}
              <FileUploadRoot
                onChange={handleFileSelect}
                required={profileImg ? false : true}
              >
                <FileUploadTrigger asChild>
                  <Button w="100%" variant="outline" size="sm">
                    <FaUpload /> Upload Profile
                  </Button>
                </FileUploadTrigger>
              </FileUploadRoot>

              <Field required>
                <Input
                  name="name"
                  value={fullName}
                  placeholder="Enter your full name"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Field>

              <Button
                w="100%"
                size="sm"
                type="submit"
                variant="solid"
                colorPalette="green"
              >
                Continue
              </Button>
            </VStack>
          </Card.Body>
        </Card.Root>
        <Text fontSize="sm">Fill the form to continue</Text>
      </VStack>
    </Center>
  );
}

export default ProfileForm;
