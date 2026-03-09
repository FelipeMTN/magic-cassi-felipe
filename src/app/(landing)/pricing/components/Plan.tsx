
import { plans } from "@/content";
import { Background, Button, Column, Flex, Heading, HoloFx, Icon, Mask, MatrixFx, Particle, Row, Text } from "@once-ui-system/core";

interface PlanProps extends React.ComponentProps<typeof Row> {
  plan: (typeof plans)[keyof typeof plans];
}

export const Plan: React.FC<PlanProps> = ({ plan, ...rest }) => {
    const getScheme = `${plan.color}-medium` as const;
  
    return (
      <Column id={plan.name} border="neutral-alpha-medium" background="page" radius="xl" overflow="hidden" maxWidth={32} {...rest}>
        {plan.color === "brand" &&
          <>
            <HoloFx
              fill
              top="0"
              left="0"
              position="absolute"
              texture={{
                opacity: 0,
              }}>
              <Background
                gradient={{
                  display: true,
                  x: 125,
                  y: 100,
                  width: 150,
                  height: 150,
                  colorStart: "brand-background-strong",
                  colorEnd: "static-transparent",
                }}
              />
            </HoloFx>
            <Mask pointerEvents="none" fill position="absolute" left="0" top="0" x={0} y={0} radius={70}>
              <MatrixFx
                data-solid="color"
                size={1.5}
                spacing={5}
                fps={24}
                colors={["brand-solid-strong"]}
                bulge={{
                  type: "wave"
                }}
                flicker
              />
            </Mask>
          </>
        }
        <Column pointerEvents="none" paddingX="32" paddingY="24" gap="4" fillWidth borderBottom="neutral-alpha-medium">
          <Heading as="h3" align="left" onBackground={getScheme as any} variant="heading-default-xs">
            {plan.name}
          </Heading>
          <Text align="left" variant="heading-default-xl">
            {plan.price.original !== plan.price.discounted && (
              <Text onBackground="neutral-weak" style={{ textDecoration: "line-through" }}>
                ${plan.price.original}
              </Text>
            )}{" "}
            ${plan.price.discounted}{" "}
            <Text onBackground="neutral-strong" variant="body-default-s">
              / year
            </Text>
          </Text>
        </Column>
        <Column
          pointerEvents="none"
          padding="48"
          flex={1}
          gap="16"
          borderBottom="neutral-alpha-medium"
        >
          {plan.features.map((feature, index) => (
            <Row key={index} vertical="center" gap="12">
              <Icon name="check" size="s" onBackground={getScheme as any} />
              <Text align="left" onBackground="neutral-medium" variant="body-default-s">
                {feature}
              </Text>
            </Row>
          ))}
        </Column>
        <Flex fillWidth paddingX="24" padding="12">
          <Button
            id={plan.name + "-button"}
            href={plan.href}
            variant={plan.color === "brand" ? "primary" : "secondary"}
            fillWidth
            arrowIcon
          >
            Start free
          </Button>
        </Flex>
      </Column>
    );
}