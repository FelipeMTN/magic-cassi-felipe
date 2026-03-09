"use client";

import {
  Column,
  Flex,
  Icon,
  IconButton,
  Line,
  Row,
  Tag,
  Text,
  ToggleButton,
} from "@once-ui-system/core";
import { usePathname } from "next/navigation";

interface SidebarProps extends React.ComponentProps<typeof Flex> {}

const Sidebar: React.FC<SidebarProps> = ({ ...flex }) => {
  const pathname = usePathname() ?? "";

  return (
    <Column
      fillWidth
      paddingX="16"
      paddingY="24"
      gap="m"
      {...flex}
    >
      <Column fill gap="m">
        <Column fillWidth gap="4">
          <Text
            variant="body-default-xs"
            onBackground="neutral-weak"
            marginBottom="8"
            marginLeft="16"
          >
            Início
          </Text>
          <ToggleButton href="/dashboard" fillWidth horizontal="start" selected={pathname === "/dashboard"}>
            <Row padding="4" vertical="center" gap="12" textVariant="label-default-s">
              <Icon name="home" onBackground="neutral-weak" size="xs" />
              Painel
            </Row>
          </ToggleButton>
          <ToggleButton href="/analytics" fillWidth horizontal="start" selected={pathname === "/analytics"}>
            <Row padding="4" vertical="center" gap="12" textVariant="label-default-s">
              <Icon name="trend" onBackground="neutral-weak" size="xs" />
              Análises
            </Row>
          </ToggleButton>
          <ToggleButton href="/simulador" fillWidth horizontal="start" selected={pathname === "/simulador"}>
            <Row padding="4" vertical="center" gap="12" textVariant="label-default-s">
              <Icon name="chart" onBackground="neutral-weak" size="xs" />
              Simulador
              <Tag variant="brand" size="s">
                Novo
              </Tag>
            </Row>
          </ToggleButton>
        </Column>

        <Line />

        <Column fillWidth gap="4">
          <Text variant="body-default-xs" onBackground="neutral-weak" marginY="8" marginLeft="16">
            Metas
          </Text>
          <ToggleButton fillWidth horizontal="start" href="/roadmap" selected={pathname === "/roadmap"}>
            <Row padding="4" gap="12" vertical="center" textVariant="label-default-s">
              <Icon name="target" onBackground="neutral-weak" size="xs" />
              Roadmap
            </Row>
          </ToggleButton>
          <ToggleButton fillWidth horizontal="start" href="/reserva" selected={pathname === "/reserva"}>
            <Row padding="4" vertical="center" gap="12" textVariant="label-default-s">
              <Icon name="shield" onBackground="neutral-weak" size="xs" />
              Reserva Emergência
            </Row>
          </ToggleButton>
          <ToggleButton fillWidth horizontal="start" href="/metas" selected={pathname === "/metas" || pathname.startsWith("/metas/")}>
            <Row padding="4" gap="12" vertical="center" textVariant="label-default-s">
              <Icon name="flag" onBackground="neutral-weak" size="xs" />
              Todas as Metas
            </Row>
          </ToggleButton>
        </Column>

        <Line />

        <Column fill gap="4">
          <Row fillWidth horizontal="between" vertical="center" paddingY="8" paddingX="16">
            <Text variant="body-default-xs" onBackground="neutral-weak">
              Configurações
            </Text>
          </Row>
          <ToggleButton fillWidth horizontal="start" href="/settings" selected={pathname === "/settings"}>
            <Row padding="4" gap="12" vertical="center" textVariant="label-default-s">
              <Icon name="settings" onBackground="neutral-weak" size="xs" />
              Preferências
            </Row>
          </ToggleButton>
          <ToggleButton fillWidth horizontal="start" href="/perfil" selected={pathname === "/perfil"}>
            <Row padding="4" gap="12" vertical="center" textVariant="label-default-s">
              <Icon name="user" onBackground="neutral-weak" size="xs" />
              Meu Perfil
            </Row>
          </ToggleButton>
        </Column>
      </Column>
    </Column>
  );
};

export { Sidebar };
