import useWakeLock from "@/hooks/useWakeLock";
import useAppStore from "@/store";
import useTimerStore from "@/stores/timer-store";
import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { Button } from "./ui/button";
import { ProgressBar, ProgressRoot } from "./ui/progress";
import { useEffect, useRef } from "react";

function TimerCard() {
  const dailyTarget = 900; // 15min (900 seconds)
  const intervalRef = useRef<number | null>(null);
  const { requestWakeLock, releaseWakeLock } = useWakeLock();

  // Store
  const setHistory = useAppStore((s) => s.setHistory);
  const { time, isRunning, stopTimer, resetTimer, startTimer } =
    useTimerStore();

  const timeInMinute = Math.floor(time / 60);

  const handleStart = () => {
    resetTimer();
    startTimer();
    requestWakeLock();
  };

  const handleReset = () => {
    resetTimer();
    releaseWakeLock();
  };

  const handleStop = () => {
    if (Math.floor(time / 60) < 15)
      return alert("You have to pray for at least 15 minutes.");

    releaseWakeLock();
    stopTimer();
    const today = new Date().toLocaleDateString();
    setHistory({ date: today, duration: time });
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        useTimerStore.setState((state) => ({ time: state.time + 1 }));
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    return () => {
      releaseWakeLock();
    };
  }, [releaseWakeLock]);

  return (
    <>
      <HStack
        p={5}
        gap={4}
        flexWrap="wrap"
        justify="center"
        textAlign="center"
        border="1px solid"
        borderColor="gray.200"
      >
        <Image src="/logo.png" alt="T.I.E Conference Logo" h={100} />
        <Box
          h={20}
          w={1}
          bgColor="gray.200"
          display={{ base: "none", sm: "block" }}
        />
        <Box>
          <Text fontSize="4xl" fontWeight="bold">
            {new Date(time * 1000).toISOString().substr(11, 8)}
          </Text>
          <HStack justify="center" gap={4}>
            <Button
              size="xs"
              colorPalette="blue"
              disabled={isRunning}
              onClick={handleStart}
            >
              Start
            </Button>
            <Button
              size="xs"
              colorPalette="orange"
              onClick={handleStop}
              disabled={!isRunning}
            >
              Stop
            </Button>
            <Button size="xs" colorPalette="red" onClick={handleReset}>
              Reset
            </Button>
          </HStack>
        </Box>
      </HStack>
      <Box w="100%" mb={5}>
        <ProgressRoot
          size="xs"
          colorPalette="green"
          value={(time / dailyTarget) * 100}
        >
          <ProgressBar />
        </ProgressRoot>

        {time > 0 && !isRunning && (
          <Text mt={2} color="gray.500" textAlign="center" fontSize="sm">
            Congratulation! You’ve prayed for {timeInMinute} minutes.
          </Text>
        )}

        {time > 0 && isRunning && (
          <Text mt={2} color="gray.500" textAlign="center" fontSize="sm">
            You’ve been praying for {timeInMinute} minutes now.
          </Text>
        )}
      </Box>
    </>
  );
}

export default TimerCard;
