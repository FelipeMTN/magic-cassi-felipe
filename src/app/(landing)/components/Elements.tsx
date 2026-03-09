import { Column, Heading, Row, Text, Media, Logo, Line, Background, SmartLink, Fade } from "@once-ui-system/core";

const features = [
  {
    content: (
      <>
        <Media
          s={{hide: true}}
          position="absolute"
          top="24"
          right="0"
          width={32}
          topLeftRadius="l"
          borderTop="neutral-alpha-medium"
          borderLeft="neutral-alpha-medium"
          aspectRatio="1200 / 1024"
          src="/images/convert.jpg"
          alt={"Magic Convert dashboard"}
          sizes={"(max-width: 1024px) 90vw, 640px"}
        />
        <Fade leftRadius="xl" position="absolute" left="0" fillHeight maxWidth={40} to="right" />
        <Column fill padding="xl" gap="12" maxWidth={40} vertical="center">
          <Logo style={{marginLeft: "-0.25rem"}} wordmark="/trademarks/wordmark-light.svg" size="xs"/>
          <Line width="24" marginTop="16" marginBottom="16"/>
          <Heading size="l">
            A strong foundation
          </Heading>
          <Text onBackground="neutral-medium" variant="body-default-m" wrap="balance">
            Magic Convert provides an optimized entry-point for your online presence. Built for conversion, scale and minimal config.
          </Text>
          <Text variant="label-strong-s" marginTop="8">
            <SmartLink href="#" suffixIcon="chevronRight">
              Learn more
            </SmartLink>
          </Text>
        </Column>
      </>
    ),
  },
  {
    content: (
      <Column fill data-theme="dark" background="page">
        <Background
          leftRadius="xl"
          position="absolute"
          fillHeight
          right="0"
          bottom="0"
          left={undefined}
          rightRadius="xl"
          mask={{
            x: 100,
            y: 100,
            radius: 75,
          }}
          dots={{
            display: true,
            size: "4",
            color: "brand-background-strong",
          }}
        />
        <Media
          s={{hide: true}}
          position="absolute"
          top="24"
          right="0"
          width={32}
          topLeftRadius="l"
          borderTop="neutral-alpha-medium"
          borderLeft="neutral-alpha-medium"
          aspectRatio="1200 / 1024"
          src="/images/docs.jpg"
          alt={"Documentation interface"}
          sizes={"(max-width: 1024px) 90vw, 640px"}
        />
        <Fade leftRadius="xl" position="absolute" left="0" fillHeight maxWidth={40} to="right" />
        <Column fill padding="xl" gap="12" maxWidth={40} vertical="center">
          <Row gap="32">
            <Logo style={{marginLeft: "-0.25rem"}} wordmark="/trademarks/magic-docs-dark.svg" size="xs"/>
            <Logo style={{marginLeft: "-0.25rem"}} wordmark="/trademarks/magic-store-dark.svg" size="xs"/>
          </Row>
          <Line width="24" marginTop="16" marginBottom="16"/>
          <Heading size="l">
            Essential extensions
          </Heading>
          <Text onBackground="neutral-medium" variant="body-default-m" wrap="balance">
            Magic Docs lets you share your knowledge without complicated setup. Frame your business as an authority in your field.
          </Text>
          <Text variant="label-strong-s" marginTop="8">
            <SmartLink href="#" suffixIcon="chevronRight">
              Learn more
            </SmartLink>
          </Text>
        </Column>
      </Column>
    ),
  },
];

export const Elements = ({ ...flex }: React.ComponentProps<typeof Column>) => {
  return (
    <Column gap="xl" fillWidth {...flex}>
      {features.map((feature, index) => (
        <Row
          key={index}
          position="sticky"
          data-theme={index === 0 ? "light" : undefined}
          top="80"
          minHeight={24}
          gap="xl"
          radius="xl"
          overflow="hidden"
          background="page"
          vertical="center"
          m={{direction: "column"}}
          border="neutral-alpha-medium"
        >
          <Column
            fill
            gap="m"
            m={{direction: "column"}}
          >
            {feature.content}
          </Column>
        </Row>
      ))}
    </Column>
  );
};