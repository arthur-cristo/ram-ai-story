import { Box, Text } from "@chakra-ui/react";
import { Tooltip } from "recharts";
import { EVENTS } from "@/constants";
import toBrl from "@/utils/toBrl";

const CustomHover = () => (
  <Tooltip
    cursor={{
      stroke: "#34D170",
      opacity: 0.4,
      strokeWidth: 1,
    }}
    content={({ active, payload }) => {
      if (!active || !payload?.length) return null;

      const { date, avgPrice } = payload[0].payload;

      const event = EVENTS[date];

      return (
        <Box
          bg="rgba(0,0,0,.45)"
          backdropFilter="blur(12px)"
          border="1px solid"
          borderColor="primary"
          borderRadius="16px"
          px="5"
          py="4"
          minW="260px"
          boxShadow="
            0 0 12px rgba(15,161,53,.12),
            inset 0 0 12px rgba(15,161,53,.12)
          "
        >
          <Text
            fontSize="xs"
            color="whiteAlpha.700"
            letterSpacing="0.08em"
            textTransform="uppercase"
          >
            {new Date(date).toLocaleDateString("pt-BR")}
          </Text>

          <Text
            color="primary.light"
            fontSize="2xl"
            fontWeight="800"
            mb={event ? 1 : 0}
          >
            {toBrl(avgPrice)}
          </Text>

          {event && (
            <Box
              pt="3"
              borderTop="1px solid"
              borderColor="whiteAlpha.200"
              w="25rem"
            >
              <Text
                color="primary.light"
                fontSize="sm"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
              >
                {event.title}
              </Text>

              {event.description.map((line, index) => (
                <Text
                  key={index}
                  mt="1"
                  color="whiteAlpha.800"
                  fontSize="xs"
                  lineHeight="1.5"
                  textAlign="justify"
                >
                  {line}
                </Text>
              ))}
            </Box>
          )}
        </Box>
      );
    }}
  />
);

export default CustomHover;
