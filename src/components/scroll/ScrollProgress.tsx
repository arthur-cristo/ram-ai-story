import { Box } from "@chakra-ui/react";
import { motion, useScroll, useSpring } from "framer-motion";

const MotionBox = motion.create(Box);

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <Box
      position="fixed"
      top="0"
      right="0"
      h="100dvh"
      w="4px"
      bg="whiteAlpha.100"
      zIndex={9999}
    >
      <MotionBox
        style={{
          scaleY,
          transformOrigin: "top",
        }}
        w="100%"
        h="100%"
        bg="primary"
      />
    </Box>
  );
}
