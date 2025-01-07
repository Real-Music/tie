import MediaPlayer from "@/components/media-player";
import PrayerHistory from "@/components/prayer-history";
import TimerCard from "@/components/timer-card";
import { Avatar } from "@/components/ui/avatar";
import useAppStore from "@/store";
import useTimerStore from "@/stores/timer-store";
import { Box, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const DailyPrayer: React.FC = () => {
  const navigate = useNavigate();
  const { isRunning, time } = useTimerStore();
  const { profileImg, name } = useAppStore();

  const getTitle = () => {
    let title = " Prayer Cloud";
    if (isRunning) title = " is sailing 🗣️🗣️";
    else if (time > 0) title = " is done sailing 🥳🥳";
    return name + title;
  };

  return (
    <Box p={5} maxW="600px" mx="auto">
      <Stack direction="column" justify="center" align="center" mb={2}>
        <Avatar
          size="2xl"
          name={name!}
          cursor="pointer"
          src={profileImg}
          onClick={() => navigate("/")}
        />
        <Text
          fontSize={{ base: "large", sm: "2xl" }}
          fontWeight="bold"
          textAlign="center"
        >
          {getTitle()}
        </Text>
      </Stack>

      <TimerCard />
      {isRunning && <MediaPlayer />}
      <PrayerHistory />
    </Box>
  );
};

export default DailyPrayer;
