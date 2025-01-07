import trackOne from "@/assets/audios/track-one.mp3";
import trackThree from "@/assets/audios/track-three.mp3";
import trackTwo from "@/assets/audios/track-two.mp3";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import { memo, useState } from "react";
import Howler from "react-howler";
import {
  IoPause,
  IoPlayOutline,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMute,
} from "react-icons/io5";
import { Slider } from "./ui/slider";

function MediaPlayer() {
  const [volume, setVolume] = useState(0.5); // Initial volume (50%)
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playlist] = useState([trackOne, trackTwo, trackThree]);

  // const getSongName = () => {
  //   const track = playlist[currentSongIndex].split("/")[4];
  //   if (track.includes("one")) return "Track 1";
  //   if (track.includes("two")) return "Track 2";
  //   return "Track 3";
  // };

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const onTogglePlayPause = () => setIsPlaying((prev) => !prev);

  const handlePreviousSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length
    );
  };

  return (
    <Box mt={5} mb={4} textAlign="center">
      {/* <Text fontWeight="bold" mb={2}>
        Now Playing: {getSongName()}
      </Text> */}
      <Howler
        loop={true}
        volume={volume}
        playing={isPlaying}
        onEnd={handleNextSong}
        src={playlist[currentSongIndex]}
      />
      <HStack justify="space-between" gap={4} flexWrap="wrap">
        <HStack justify="center" gap={4}>
          <IconButton variant="outline" size="sm" onClick={handlePreviousSong}>
            <IoPlaySkipBackSharp />
          </IconButton>

          <IconButton variant="outline" size="sm" onClick={onTogglePlayPause}>
            {isPlaying ? <IoPause /> : <IoPlayOutline />}
          </IconButton>

          <IconButton variant="outline" size="sm" onClick={handleNextSong}>
            <IoPlaySkipForwardSharp />
          </IconButton>
        </HStack>

        <HStack justify="center" gap={4}>
          <IconButton variant="outline" size="sm">
            {volume == 0 && <IoVolumeMute />}
            {volume > 0 && volume <= 0.5 && <IoVolumeLow />}
            {volume > 0.5 && <IoVolumeHigh />}
          </IconButton>
          <Slider
            min={0}
            step={1}
            max={100}
            w="200px"
            defaultValue={[50]}
            value={[volume * 100]}
            onValueChange={(e) => setVolume(e.value[0] / 100)}
            marks={[
              { value: 0, label: "0%" },
              { value: 50, label: "50%" },
              { value: 100, label: "100%" },
            ]}
          />
        </HStack>
      </HStack>
    </Box>
  );
}

export default memo(MediaPlayer);
