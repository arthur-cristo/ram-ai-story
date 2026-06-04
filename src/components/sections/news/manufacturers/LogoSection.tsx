import { MANUFAFACTURERS_LOGOS } from "@/constants";
import { Box, HStack, Image, VStack } from "@chakra-ui/react";
import { motion, useScroll, useTransform, useTime } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionImage = motion.create(Image);

const LogoSection = ({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const time = useTime();
  const baseFloat = useTransform(
    time,
    (t) => Math.sin((t / 5000) * Math.PI * 2) * -5 - 5,
  );

  return (
    <HStack
      w="100%"
      h="100%"
      justify="center"
      alignItems="center"
      gap={{ base: 12, lg: 20 }}
    >
      {MANUFAFACTURERS_LOGOS.map((logo) => {
        const isMicron = logo.alt.toLowerCase().includes("micron");

        const micronProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

        const y = isMicron
          ? useTransform(
              [baseFloat, micronProgress],
              ([f, p]) => (f as number) * (1 - (p as number)),
            )
          : baseFloat;

        const filter = useTransform(micronProgress, (p) => {
          if (!isMicron) {
            return `
              drop-shadow(0 0 8px rgba(${logo.color},${logo.shadowIntensity?.[0] ?? 0.8}))
              drop-shadow(0 0 20px rgba(${logo.color},${logo.shadowIntensity?.[1] ?? 0.6}))
              drop-shadow(0 0 40px rgba(${logo.color},${logo.shadowIntensity?.[2] ?? 0.4}))
            `;
          }
          const alpha = 1 - p;
          return `
            brightness(${alpha + 0.3})
            drop-shadow(0 0 8px rgba(${logo.color},${(logo.shadowIntensity?.[0] ?? 0.8) * alpha}))
            drop-shadow(0 0 20px rgba(${logo.color},${(logo.shadowIntensity?.[1] ?? 0.6) * alpha}))
            drop-shadow(0 0 40px rgba(${logo.color},${(logo.shadowIntensity?.[2] ?? 0.4) * alpha}))
          `;
        });

        const separatorBg = useTransform(micronProgress, (p) => {
          const color = isMicron && p > 0.1 ? "128, 128, 128" : logo.color;
          return `linear-gradient(90deg, rgba(${color},0) 0%, rgba(${color},1) 50%, rgba(${color},0) 100%)`;
        });

        return (
          <VStack key={logo.alt} position="relative" mt="-100px">
            <MotionBox style={{ y, willChange: "transform" }}>
              <MotionImage
                src={logo.src}
                alt={logo.alt}
                w={{ base: "200px", lg: "350px", "2xl": "500px" }}
                objectFit="contain"
                zIndex={1}
                draggable={false}
                style={{ filter }}
              />
            </MotionBox>
            <MotionBox
              w="100%"
              h="2px"
              position="relative"
              style={{
                background: separatorBg,
              }}
              borderRadius="full"
              zIndex={1}
            />
          </VStack>
        );
      })}
    </HStack>
  );
};

export default LogoSection;
