import { Row, Heading, Button, Mask, Text, Column, MatrixFx } from "@once-ui-system/core";

export const Cta = () => {
  return (
    <Column fillWidth horizontal="center" borderBottom="neutral-alpha-medium" paddingX="l">
      <Row maxWidth="l" paddingX="56">
        <Row borderTop="neutral-alpha-medium" borderLeft="neutral-alpha-medium" borderRight="neutral-alpha-medium" height="20" fillWidth topRadius="xl"/>
      </Row>
      <Row maxWidth="l" paddingX="24">
        <Row borderTop="neutral-alpha-medium" borderLeft="neutral-alpha-medium" borderRight="neutral-alpha-medium" height="24" fillWidth topRadius="xl"/>
      </Row>
      <Column maxWidth="l" height={20} center paddingX="l" topRadius="xl" gap="24" s={{direction: "column"}} borderTop="neutral-alpha-medium" borderLeft="neutral-alpha-medium" borderRight="neutral-alpha-medium" overflow="hidden">
        <Heading as="h2" align="center" variant="display-strong-m">
          Build the future<Text onBackground="brand-medium">.</Text>
        </Heading>
        <Row position="absolute" minWidth={68} minHeight={28} radius="full" border="neutral-alpha-medium"/>
        <Row position="absolute" minWidth={54} minHeight={28} radius="full" border="neutral-alpha-medium"/>
        <Row position="absolute" minWidth={40} minHeight={28} radius="full" border="neutral-alpha-medium"/>
        <Row position="absolute" minWidth={28} minHeight={28} radius="full" border="neutral-alpha-medium" overflow="hidden">
          <Mask position="absolute" left="0" fill x={50} y={50} radius={20}>
            <MatrixFx
              size={1.5}
              spacing={5}
              fps={24}
              colors={["brand-solid-strong"]}
              flicker
            />
          </Mask>
        </Row>
        <Button data-border="rounded" id="hero-cta-button" href="/auth?signup" arrowIcon>
          Start now
        </Button>
      </Column>
    </Column>
  );
};