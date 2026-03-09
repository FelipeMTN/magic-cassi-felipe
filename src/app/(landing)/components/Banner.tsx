import { CelebrationFx, Row, Text } from "@once-ui-system/core";

export const Banner = ({ ...flex }: React.ComponentProps<typeof Row>) => {
  return (
    <Row fillWidth paddingX="24" paddingY="12" center background="page" borderBottom="neutral-alpha-medium" {...flex}>
      <CelebrationFx
        fill
        data-solid="inverse"
        position="absolute"
        type="fireworks"
        intensity={1000}
        duration={20}
        colors={["brand-solid-strong", "brand-solid-medium", "accent-solid-strong", "accent-solid-weak"]}
      />
      <Text variant="label-default-s"><Text weight="strong">Special offer:</Text> 20% off all plans this month!</Text>
    </Row>
  );
};