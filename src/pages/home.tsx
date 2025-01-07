import ImageCropper from "@/components/image-cropper";
import ProfileForm from "@/components/profile-form";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

function HomePage() {
  const [open, setOpen] = useState(false);
  const [uploadedImg, setUploadedImg] = useState("");

  return (
    <Box minH="100dvh">
      <ProfileForm
        setUploadedImg={setUploadedImg}
        onSelectedImage={() => setOpen(true)}
      />

      <ImageCropper
        open={open}
        image={uploadedImg}
        onOpenChange={(e) => setOpen(e.open)}
        onCropComplete={() => setOpen(false)}
      />
    </Box>
  );
}

export const Component = HomePage;
export default HomePage;
