import {
  Background,
  Badge,
  Button,
  Column,
  Heading,
  Media,
  RevealFx,
  Row,
  ShineFx,
  Tag,
  Text,
} from "@once-ui-system/core";

export const Hero: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  return (
    <Column fillWidth fitHeight horizontal="center" align="center">
      <Column maxWidth="l" gap="32" fitHeight horizontal="center" {...flex}>
        <Column maxWidth="m" horizontal="center" gap="16" marginBottom="32">
          <Badge href="#" overflow="hidden" id="badge" paddingY="4" paddingLeft="4" paddingRight="16" border="brand-alpha-medium" background="overlay" effect={false}>
            <Background
              position="absolute"
              top="0"
              left="0"
              gradient={{
                display: true,
                x: 0,
                y: 50,
                colorStart: "brand-background-strong",
              }}
            />
            <Tag data-border="rounded" size="l" variant="brand" marginRight="12"><ShineFx inverse baseOpacity={0.7} speed={2} variant="body-strong-xs">NEW</ShineFx></Tag>
            <Row textVariant="label-default-s">Magic Convert 2.0 is here</Row>
          </Badge>
          <Heading variant="display-strong-l" marginTop="12">
            Let us fight your CSS battles
          </Heading>
          <Heading wrap="balance" onBackground="neutral-medium" variant="body-default-xl" marginBottom="16">
            Once UI provides out-of-the-box solutions for advanced UI challenges
          </Heading>
          <Button id="hero-cta-2" href="#">
            Launch your app
          </Button>
        </Column>
        <Row
          fillWidth
          background="overlay"
          aspectRatio="16 / 9"
          radius="l"
          overflow="hidden"
          border="neutral-alpha-weak"
          style={{
            backdropFilter: "blur(0.25rem)",
            left: "50%",
            transform: "translateY(0rem) translateX(-40%) scaleY(1) scaleX(1.2) rotateX(30deg) rotateY(20deg) rotate(335deg)",
            transformOrigin: "center",
            transformStyle: "preserve-3d",
            maskImage: "linear-gradient(to right, black 80%, transparent 100%), linear-gradient(to bottom, black 60%, transparent 100%)",
            maskComposite: "intersect",
          }}>
          <RevealFx>
            <Media
              src="/images/dashboard-desktop.jpg"
              border="neutral-alpha-weak"
              aspectRatio="16 / 9"
              fillWidth
              priority
              radius="l"
              sizes="(max-width: 1200px) 100vw, 1200px"/>
          </RevealFx>
        </Row>
      </Column>
    </Column>
  );
};
