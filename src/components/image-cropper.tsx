import useAppStore from "@/store";
import getCroppedImg from "@/utils/getCroppedImg";
import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { Button } from "./ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "./ui/dialog";
import { Slider } from "./ui/slider";

interface Props {
  open: boolean;
  image: string;
  onCropComplete: () => void;
  onOpenChange: (detail: { open: boolean }) => void;
}

function ImageCropper(props: Props) {
  const { open, image, onCropComplete: onComplete, onOpenChange } = props;
  const [zoom, setZoom] = useState(0);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });

  const setProfileImg = useAppStore((s) => s.setProfileImg);

  const onCropChange = (crop: Point) => setCrop(crop);
  const onZoomChange = (zoom: number) => setZoom(zoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const onCropComplete = (_area: Area, areaPixels: Area) =>
    setCroppedAreaPixels(areaPixels);

  const handleOnSave = async () => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels!);
    setProfileImg(croppedImage!);
    onComplete();
  };

  return (
    <DialogRoot
      lazyMount
      open={open}
      placement="center"
      closeOnEscape={false}
      onOpenChange={onOpenChange}
      closeOnInteractOutside={false}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile Picture</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4} maxH={600}>
            <Cropper
              style={{
                containerStyle: { position: "relative", height: 500 },
                mediaStyle: { position: "relative" },
              }}
              aspect={1}
              crop={crop}
              zoom={zoom}
              image={image}
              showGrid={false}
              cropShape="round"
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropComplete}
            />
            <Slider
              min={1}
              max={10}
              w="200px"
              step={0.2}
              value={[zoom]}
              marks={[
                { value: 1, label: "1%" },
                { value: 5, label: "50%" },
                { value: 10, label: "100%" },
              ]}
              onValueChange={(e) => onZoomChange(e.value[0])}
            />
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button onClick={handleOnSave}>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default ImageCropper;
