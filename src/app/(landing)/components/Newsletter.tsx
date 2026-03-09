"use client";

import React from "react";
import { Background, Button, Column, HoloFx, Input, Particle, Row, Text } from "@once-ui-system/core";

export const Newsletter: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  return (
    <Column
      overflow="hidden"
      vertical="center"
      fillWidth
      paddingX="32"
      paddingY="56"
      radius="l"
      horizontal="center"
      align="center"
      border="neutral-alpha-weak"
      shadow="xl"
      {...flex}
    >
      <Particle color="accent-solid-strong" position="absolute" top="0" left="0" fill speed={2} size="1" density={100} intensity={20} pointerEvents="none"/>
        <Background
          position="absolute"
          top="0"
          left="0"
          gradient={{
            display: true,
            x: 50,
            y: 120,
            colorStart: "accent-solid-strong",
            colorEnd: "static-transparent",
          }}
        />
      <Column pointerEvents="none" horizontal="center" maxWidth="xs" gap="12">
        <Text variant="display-strong-xs">
          Join the squad
        </Text>
        <Text
          variant="body-default-s"
          wrap="balance"
          marginBottom="l"
          onBackground="neutral-weak"
        >
          Sign up for news and updates
        </Text>
      </Column>
      <Row maxWidth={20}>
        <Input
          placeholder="Email"
          id="newsletter-email"
          type="email"
          height="s"
          required 
          hasSuffix={
            <Button size="s" style={{marginRight: "-0.5rem"}} id="newsletter-button" arrowIcon>
              Sign up
            </Button>
          }
        />
      </Row>
    </Column>
  );
};