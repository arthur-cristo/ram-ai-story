import { Heading, Text, VStack } from "@chakra-ui/react";

type Props = {
  isInView: boolean;
};

const GrowthIndicatorMobile = ({ isInView }: Props) => {
  return (
    <>
      {isInView && (
        <VStack
          display={{ base: "flex", lg: "none" }}
          align="end"
          gap={0}
          w="100%"
          animation="fadeIn 2s ease-in-out forwards"
        >
          <Heading color="primary.light" fontSize="2xl">
            +114%
          </Heading>
          <Text fontSize="lg">Aumento no período</Text>
        </VStack>
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

export default GrowthIndicatorMobile;
