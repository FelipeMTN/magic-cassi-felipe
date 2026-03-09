"use client";

import { kbar } from "@/content";
import {
  Animation,
  Avatar,
  Background,
  Button,
  Column,
  Icon,
  Kbar,
  Line,
  Logo,
  NavIcon,
  Option,
  Row,
  SmartLink,
  Text,
  UserMenu,
} from "@once-ui-system/core";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

interface HeaderProps {
  avatar?: string;
}

const Header: React.FC<HeaderProps> = ({ avatar }) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const [isMac, setIsMac] = useState(false);

  React.useEffect(() => {
    // Only run on the client side after hydration
    setIsMac(/Mac/i.test(navigator.platform));
  }, []);
  
  const handleClick = () => {
    setIsActive(!isActive);
  };

  const closeOverlay = () => {
    setTimeout(() => {
      const event = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      document.dispatchEvent(event);
    }, 0);
  };

  useEffect(() => {
    setIsActive(false);
  }, [pathname])

  return (
    <Row
      as="header"
      fillWidth
      minHeight="56"
      position="sticky"
      top="0"
      background="page"
      vertical="center"
      zIndex={1}
    >
      <Row gap="4" vertical="center" minWidth={18} paddingX="24">
        <Animation
          triggerType="click"
          active={isActive}
          slideDown={1}
          scale={0.9}
          blur={0.5}
          duration={200}
          trigger={
            <NavIcon hide m={{hide: false}} onClick={handleClick} isActive={isActive}/>
          }>
          <Column
            style={{top: "2.75rem", left: "-1.25rem", width: "calc(100dvw - 0.5rem)", height: "calc(100dvh - 3.5rem)"}} 
            background="page" 
            position="fixed"
            border="neutral-alpha-medium"
            vertical="between"
            radius="xl-4"
            padding="8"
            zIndex={9}>
            <Sidebar />
          </Column>
        </Animation>
        <Logo dark icon="/trademarks/icon-dark.svg" wordmark="/trademarks/wordmark-dark.svg" size="s" href="/dashboard" />
        <Logo light icon="/trademarks/icon-light.svg" wordmark="/trademarks/wordmark-light.svg" size="s" href="/dashboard" />
      </Row>
      <Row fillWidth horizontal="center" paddingX="l">
        <Row maxWidth="xl" horizontal="center">
          <Kbar s={{hide: true}} data-border="rounded" radius="full" background="neutral-alpha-weak"
            items={kbar}
          >
            <Button size="s" variant="tertiary" weight="default">
              <Row vertical="center" gap="16" onBackground="neutral-medium" style={{ marginLeft: "-0.5rem" }} paddingRight="8">
                <Row
                  background="neutral-alpha-medium"
                  paddingX="8"
                  paddingY="4"
                  radius="full"
                  textVariant="body-default-xs"
                  onBackground="neutral-medium"
                >
                  {isMac ? "Cmd" : "Ctrl"} + k
                </Row>
                Search in Convert
              </Row>
            </Button>
          </Kbar>
        </Row>
      </Row>
      <Row position="absolute" right="20" vertical="center" gap="12">
        <SmartLink prefixIcon="book" href="https://docs.once.com/magic-convert/quick-start">
          <Text variant="label-default-s">
            Docs
          </Text>
        </SmartLink>
        <UserMenu
          avatarProps={{
            empty: !avatar,
            src: avatar,
          }}
          dropdown={
            <Column paddingTop="24" minWidth={14}>
              <Background
                position="absolute"
                left="0"
                right="0"
                top="0"
                bottom="0"
                gradient={{
                  display: true,
                  x: 0,
                  y: -50,
                  colorStart: "brand-background-strong",
                  colorEnd: "static-transparent",
                }}
              />
              <Background
                position="absolute"
                left="0"
                right="0"
                top="0"
                bottom="0"
                gradient={{
                  display: true,
                  x: 100,
                  y: -50,
                  colorStart: "accent-background-strong",
                  colorEnd: "static-transparent",
                }}
              />
              <Column fillWidth horizontal="center" gap="2">
                <Avatar size={4} src={avatar} marginBottom="16"/>
                <Text variant="heading-strong-s">
                  Lorant One
                </Text>
                <Text marginBottom="12" variant="label-default-s" onBackground="neutral-weak">
                  Once UI
                </Text>
              </Column>
              <Column fillWidth padding="4" gap="2">
                <Option hasPrefix={<Icon onBackground="neutral-weak" size="s" name="settings" />} label="Settings" value="settings" href="/settings" onClick={closeOverlay} />
              </Column>
              <Line />
              <Column fillWidth padding="4" gap="2">
                <Option hasPrefix={<Icon onBackground="neutral-weak" size="s" name="logout" />} label="Log out" value="logout" href="/auth?login" onClick={closeOverlay} />
              </Column>
            </Column>
          }
        />
      </Row>
    </Row>
  );
};

export { Header };
