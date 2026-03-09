"use client";

import { Column, Heading, Row, StylePanel, ToggleButton } from "@once-ui-system/core";
import { useState } from "react";
import { General } from "./components/General";
import { Security } from "./components/Security";

export default function SettingsClient() {
  const [tab, setTab] = useState("general");

  return (
    <Column fillWidth horizontal="center">
      <Column maxWidth="l" gap="m">
        <Row fillWidth paddingX="16">
          <Heading variant="display-strong-s">
            Configurações
          </Heading>
        </Row>
        <Row fillWidth gap="24" s={{direction: "column"}}>
          <Column maxWidth={16} s={{direction: "row"}} paddingX="12" paddingY="8" gap="4">
            <ToggleButton size="l" onClick={() => setTab("general")} selected={tab === "general"} prefixIcon="person" fillWidth horizontal="start">Geral</ToggleButton>
            <ToggleButton size="l" onClick={() => setTab("style")} selected={tab === "style"} prefixIcon="style" fillWidth horizontal="start">Estilo</ToggleButton>
            <ToggleButton size="l" onClick={() => setTab("security")} selected={tab === "security"} prefixIcon="security" fillWidth horizontal="start">Segurança</ToggleButton>
          </Column>
          {tab === "general" && <General />}
          {tab === "style" && <StylePanel/>}
          {tab === "security" && <Security />}
        </Row>
      </Column>
    </Column>
  );
}
