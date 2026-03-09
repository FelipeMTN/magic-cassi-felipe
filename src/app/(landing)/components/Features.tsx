import { Column, Heading, Row, Text, Media, Grid, Background, Button } from "@once-ui-system/core";

export const Features = ({ ...flex }: React.ComponentProps<typeof Column>) => {
  const section = {
    title: "The best of Once UI",
    subtitle: "Design that reads your mind",
    description: "Once UI is a low-code abstraction layer for design. It provides smart defaults and simple APIs, so you'll never want to write utility-soup again.",
  };

  const features = [
    {
      title: "120+ components",
      description: "Access advanced components through simple APIs",
    },
    {
      title: "1-min styling",
      description: "Create your brand, no design skills required",
    },
    {
      title: "SEO optimized",
      description: "Enjoy out of the box meta and schema support",
    },
    {
      title: "Ready to use",
      description: "Everything you need for a successful webapp",
    },
  ];

  return (
    <Row fillWidth>
      <Background
        fill
        data-solid="color"
        horizontal="center"
        position="absolute"
        paddingY="xl"
        mask={{
          x: 30,
          y: 0,
          radius: 75,
        }}
        gradient={{
          display: true,
          x: 50,
          y: -50,
          height: 200,
          colorStart: "brand-background-strong", 
        }}
        style={{
          transform: "skewY(-6deg)",
        }}>
      </Background>
      <Column fillWidth horizontal="center" overflow="hidden">
        <Column fillWidth paddingY="160" gap="xl" {...flex}>
          <Row fillWidth s={{direction: "column-reverse"}} gap="40" vertical="center">
            <Column fillWidth gap="20" paddingY="24" paddingX="20">
              <Text onBackground="brand-medium" variant="label-strong-m">
                {section.title}
              </Text>
              <Heading as="h2" variant="display-strong-m">
                {section.subtitle}
              </Heading>
              <Text wrap="balance" variant="body-default-xl" onBackground="neutral-medium" marginBottom="12">
                {section.description}
              </Text>
              <Button href="https://docs.once-ui.com" data-border="rounded" size="s" suffixIcon="chevronRight">
                Visit docs
              </Button>
            </Column>
            <Row fillWidth>
              <Media minWidth={48} border="neutral-alpha-weak" radius="l" aspectRatio="16 / 9" fitHeight src="/images/components.jpg" alt="Once UI for Next.js"/>
            </Row>
          </Row>
          <Grid fillWidth columns={4} m={{columns: 2}} gap="40">
            {features.map((feature, index) => (
              <Column fillWidth gap="12" padding="20" key={index}>
                <Row position="absolute" top="0" left="0" width="12" height="12" borderTop="brand-alpha-strong" borderLeft="brand-alpha-strong"/>
                <Text variant="label-strong-m">
                  {feature.title}
                </Text>
                <Text wrap="balance" variant="body-default-s" onBackground="neutral-medium">
                  {feature.description}
                </Text>
              </Column>
            ))}
          </Grid>
        </Column>
      </Column>
    </Row>
  );
};