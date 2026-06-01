import { Box, Text } from "@chakra-ui/react";

type Props = {
  isInView: boolean;
};

const GrowthIndicatorDesktop = ({ isInView }: Props) => {
  return (
    <>
      {isInView && (
        <Box
          display={{ base: "none", lg: "flex" }}
          position="absolute"
          bottom="10%"
          right="5%"
          borderRadius="lg"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          animation="fadeIn 2s ease-in-out forwards"
          opacity="0"
          pointerEvents="none"
          bg="rgba(0,0,0,.45)"
          backdropFilter="blur(12px)"
          px="5"
          py="4"
          boxShadow="
            0 0 12px rgba(15,161,53,.12),
            inset 0 0 12px rgba(15,161,53,.12)
          "
        >
          <Text
            color="primary.light"
            fontSize={{ base: "lg", lg: "5xl" }}
            fontWeight="900"
            lineHeight="1"
            letterSpacing="-0.04em"
          >
            +114%
          </Text>
          <Text
            fontWeight="bold"
            textAlign="center"
            letterSpacing="0.05em"
            fontSize={{ base: "sm", lg: "md" }}
            mt="2"
          >
            DE AUMENTO
            <br />
            NO PERÍODO
          </Text>
        </Box>
      )}

      <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
    </>
  );
};

export default GrowthIndicatorDesktop;
