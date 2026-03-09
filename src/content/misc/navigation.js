import { Card, MatrixFx, Background, Icon, Column, Text, Row, ToggleButton, Media, Button } from "@once-ui-system/core";

const megaMenu = [
  {
    id: "products",
    label: "Products",
    suffixIcon: "chevronDown",
    content: (
      <Row gap="8" fillWidth minHeight={20} minWidth={32} data-solid="inverse">
        <Card href="/products/landing" fill minWidth={10} radius="m" border="neutral-alpha-medium" overflow="hidden">
          <MatrixFx position="absolute" minWidth={20} minHeight={24} left="0" top="0" flicker fps={40} revealFrom="top" size={2} spacing={2} colors={["brand-solid-strong"]}/>
          <Background position="absolute" left="0" top="0" fill gradient={{display: true, colorStart: "neutral-background-weak", y: 0, width: 300, height: 100}} pointerEvents="none"/>
          <Column fillWidth paddingTop="16" paddingLeft="24" gap="8">
            <Text variant="label-strong-m">Landing page</Text>
            <Text variant="label-default-s" onBackground="neutral-weak" wrap="balance">
              Conversion-optimized
            </Text>
          </Column>
          <Media position="absolute" left="12" bottom="0" sizes="400px" src="/images/header-landing.jpg" borderTop="neutral-alpha-medium" borderLeft="neutral-alpha-medium" topLeftRadius="m"/>
        </Card>
        <Card href="/products/dashboard" fill minWidth={10} radius="m" border="neutral-alpha-medium" overflow="hidden">
          <MatrixFx position="absolute" minWidth={20} minHeight={24} left="0" top="0" flicker fps={40} revealFrom="top" size={2} spacing={2} colors={["accent-solid-strong"]}/>
          <Background position="absolute" left="0" top="0" fill gradient={{display: true, colorStart: "neutral-background-weak", y: 0, width: 300, height: 100}} pointerEvents="none"/>
          <Column fillWidth paddingTop="16" paddingLeft="24" gap="8">
            <Text variant="label-strong-m">Dashboard</Text>
            <Text variant="label-default-s" onBackground="neutral-weak" wrap="balance">
              Admin platform
            </Text>
          </Column>
          <Media position="absolute" left="12" bottom="0" sizes="400px" src="/images/header-dashboard.jpg" borderTop="neutral-alpha-medium" borderLeft="neutral-alpha-medium" topLeftRadius="m"/>
        </Card>
      </Row>
    )
  },
  {
    id: "resources",
    label: "Resources",
    suffixIcon: "chevronDown",
      content: (
        <Row gap="8" fillWidth minHeight={12} maxWidth={56} data-solid="inverse">
          <Card direction="column" vertical="between" padding="20" href="/blog" fill minWidth={10} radius="m" border="neutral-alpha-medium" overflow="hidden">
            <MatrixFx position="absolute" minWidth={24} minHeight={24} left="0" top="0" flicker fps={40} revealFrom="top" size={2} spacing={2} colors={["brand-solid-strong"]}/>
            <Background data-solid="inverse" position="absolute" left="0" top="0" fill gradient={{display: true, colorStart: "neutral-background-weak", y: 100, width: 300, height: 100}} pointerEvents="none"/>
            <Icon name="book" solid="brand-strong" onSolid="brand-strong" size="xs" padding="4" radius="m"/>
            <Column fillWidth minWidth={16} gap="8">
              <Text variant="label-strong-m">Blog</Text>
              <Text variant="label-default-s" onBackground="neutral-weak" wrap="balance">
                Useful resources
              </Text>
            </Column>
          </Card>
          <Column fillWidth gap="2">
            <Text variant="label-default-s" onBackground="neutral-weak" marginLeft="8" marginTop="16" marginBottom="12">Learn</Text>
            <ToggleButton
              href="/about"
              style={{ height: "auto", minHeight: "fit-content", paddingLeft: "var(--static-space-0)", paddingTop: "var(--static-space-4)", paddingBottom: "var(--static-space-4)", paddingRight: "var(--static-space-12)" }}
              fillWidth
              horizontal="start">
                <Row gap="12" vertical="center">
                <Icon
                  name="people"
                  size="s"
                  padding="8"
                  radius="s"
                  border="neutral-alpha-weak"
                />
                <Column gap="2">
                  <Text onBackground="neutral-strong" variant="label-strong-s">
                    About
                  </Text>
                  <Text onBackground="neutral-weak" truncate>Meet the team</Text>
                </Column>
              </Row>
            </ToggleButton>
            <ToggleButton
              href="#"
              style={{ height: "auto", minHeight: "fit-content", paddingLeft: "var(--static-space-0)", paddingTop: "var(--static-space-4)", paddingBottom: "var(--static-space-4)", paddingRight: "var(--static-space-12)" }}
              fillWidth
              horizontal="start">
              <Row gap="12" vertical="center">
                <Icon
                  name="book"
                  size="s"
                  padding="8"
                  radius="s"
                  border="neutral-alpha-weak"
                />
                <Column gap="2">
                  <Text onBackground="neutral-strong" variant="label-strong-s">
                    Discord
                  </Text>
                  <Text onBackground="neutral-weak" truncate>Join our community</Text>
                </Column>
              </Row>
            </ToggleButton>
            <ToggleButton
              href="/contact"
              style={{ height: "auto", minHeight: "fit-content", paddingLeft: "var(--static-space-0)", paddingTop: "var(--static-space-4)", paddingBottom: "var(--static-space-4)", paddingRight: "var(--static-space-12)" }}
              fillWidth
              horizontal="start">
              <Row gap="12" vertical="center">
                <Icon
                  name="book"
                  size="s"
                  padding="8"
                  radius="s"
                  border="neutral-alpha-weak"
                />
                <Column gap="2">
                  <Text onBackground="neutral-strong" variant="label-strong-s">
                    Contact
                  </Text>
                  <Text onBackground="neutral-weak" truncate>Get in touch</Text>
                </Column>
              </Row>
            </ToggleButton>
          </Column>
        </Row>
      ),
  },
  {
    id: "company",
    label: "Company",
    suffixIcon: "chevronDown",
    label: "Pricing",
    href: "/pricing",
  },
]

const mobileMenu = [
  {
    id: "products",
    label: "Products",
    suffixIcon: "chevronDown",
    sections: [
        {
          links: [
            {
              label: "Landing page",
              href: "/products/landing",
              icon: "trend",
              description: "Conversion optimized",
            },
            {
              label: "Dashboard",
              href: "/products/dashboard",
              icon: "apps",
              description: "Admin platform",
            },
          ],
        },
    ]
  },
  {
    id: "resources",
    label: "Resources",
    suffixIcon: "chevronDown",
    sections: [
      {
        links: [
          {
            label: "Blog",
            href: "/blog",
            icon: "pages",
            description: "Useful resources",
          },
          {
            label: "About",
            href: "/about",
            icon: "people",
            description: "Meet the team",
          },
          {
            label: "Brand",
            href: "/brand",
            icon: "swatch",
            description: "Download brand assets",
          },
          {
            label: "Contact",
            href: "/contact",
            icon: "email",
            description: "Get in touch",
          },
          {
            label: "Discord",
            href: "#",
            icon: "discord",
            description: "Join our community",
          },
        ],
      },
    ]
  },
  {
    id: "legal",
    label: "Legal",
    suffixIcon: "chevronDown",
    sections: [
      {
        links: [
          {
            label: "Terms of Use",
            href: "/terms-of-use",
            icon: "pages",
          },
          {
            label: "Privacy Policy",
            href: "/privacy-policy",
            icon: "pages",
          },
        ],
      },
    ]
  },
  {
    id: "company",
    label: "Company",
    label: "Pricing",
    href: "/pricing",
  },
]

const promo = (
  <Card href="https://once-ui.com/pricing?ref=magic-convert" fillWidth border="neutral-alpha-medium" background="transparent" radius="l" overflow="hidden">
    <MatrixFx position="absolute" flicker revealFrom="top" size={2} spacing={2} colors={["brand-solid-strong", "static-transparent"]}/>
    <Background position="absolute" fill gradient={{display: true, colorStart: "neutral-background-weak", y: 0, width: 300, height: 300}} pointerEvents="none"/>
    <Column fillWidth padding="20" gap="12">
      <Text variant="heading-strong-s">Get Once UI Pro</Text>
      <Text variant="label-default-s" onBackground="neutral-weak" marginBottom="8">Build a digital presence with deployment-ready apps</Text>
      <Button rounded size="s" id="get-pro-banner" arrowIcon>Get Pro</Button>
    </Column>
  </Card>
)

const kbar = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: "home",
    shortcut: [],
    section: "Navigation",
    keywords: "dashboard home",
    href: "/dashboard",
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: "trend",
    shortcut: [],
    section: "Navigation",
    keywords: "analytics metrics",
    href: "/analytics",
  },
]

export { megaMenu, mobileMenu, kbar, promo }
