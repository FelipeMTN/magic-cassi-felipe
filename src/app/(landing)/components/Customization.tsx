import { Column, Row, Heading, Text, StylePanel, Fade, Background } from "@once-ui-system/core"

export const Customization = ({ ...flex }: React.ComponentProps<typeof Column>) => {
  return (
    <Row fillWidth style={{isolation: "isolate"}} {...flex}>
      <Row
        fillWidth
        padding="xl"
        radius="xl"
        border="neutral-alpha-medium"
        horizontal="center"
        overflow="hidden"
      >
        <Background
          radius="xl"
          position="absolute"
          top="0"
          left="0"
          gradient={{
            display: true,
            x: 50,
            y: 100,
            width: 60,
            height: 100,
            colorStart: "brand-background-strong",
            colorEnd: "static-transparent",
          }}
        />
        <Row
          maxWidth="l"
          vertical="center"
          radius="xl"
          background="page"
          paddingX="4"
          gap="l"
          border="neutral-alpha-medium"
          s={{direction: "column-reverse"}}
        >
          <Column maxHeight={31} zIndex={1} padding="8" overflowY="scroll" fillWidth>
            <StylePanel />
            <Row minHeight={4} fillWidth/>
          </Column>
          <Column fillWidth gap="24" vertical="center" paddingX="48" paddingY="32">
            <Text onBackground="brand-medium" variant="label-strong-m">
              Customization
            </Text>
            <Heading as="h2" variant="display-strong-s">
              Branding meets visitor preference
            </Heading>
            <Text wrap="balance" variant="body-default-l" onBackground="neutral-medium" marginBottom="12">
              Once UI provides an out-of-the-box solution for visitor-controlled customization. Preferences are saved and loaded from the browser.
            </Text>
          </Column>
          <Fade bottomRadius="xl" pointerEvents="none" position="absolute" bottom="0" zIndex={1} to="top" fillWidth height={12}/>
        </Row>
      </Row>
    </Row>
  )
}