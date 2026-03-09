import { Column, Heading, Text, LogoCloud, Mask, Line } from "@once-ui-system/core";

export const Brands = ({ ...flex }: React.ComponentProps<typeof Column>) => (
  <>
    <Column fillWidth horizontal="center" paddingTop="xl" gap="l" {...flex}>
      <Heading as="h2" variant="heading-default-m" align="center" wrap="balance">
        <Text onBackground="neutral-weak" marginRight="8">
          Not just a tool.
        </Text>
        A stack you own and control.
      </Heading>
      <LogoCloud
        dark
        fillWidth
        columns={3}
        m={{columns: 1}}
        logos={[
          { wordmark: "/trademarks/magic-docs-dark.svg" },
          { wordmark: "/trademarks/wordmark-dark.svg" },
          { wordmark: "/trademarks/magic-store-dark.svg" },
        ]}
      />
      <LogoCloud
        light
        columns={3}
        m={{columns: 1}}
        logos={[
          { wordmark: "/trademarks/magic-docs-light.svg" },
          { wordmark: "/trademarks/wordmark-light.svg" },
          { wordmark: "/trademarks/magic-store-light.svg" },
        ]}
      />
    </Column>
    <Mask x={50} y={0} radius={25}><Line/></Mask>
  </>
);
