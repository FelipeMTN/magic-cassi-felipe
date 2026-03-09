"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { megaMenu, mobileMenu, promo } from "@/content";
import {
  Animation,
  Button,
  Column,
  Fade,
  Logo,
  MegaMenu,
  MobileMegaMenu,
  NavIcon,
  Row,
} from "@once-ui-system/core";

export const Header: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  
  const handleClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    setIsActive(false);
  }, [pathname])

  return (
    <>
      <Fade height={4} fillWidth to="bottom" position="fixed" top="0" base="transparent" zIndex={2} pointerEvents="none"/>
      <Row
        fillWidth
        horizontal="center"
        paddingTop="8"
        paddingX="m" 
        position="sticky"
        top="0"
        zIndex={2}
      >
        <Row
          as="header"
          border="neutral-alpha-medium"
          maxWidth="l"
          radius="xl"
          paddingLeft="20"
          paddingRight="12"
          paddingY="12"
          vertical="center"
          background="page"
        >
          <Row gap="4" vertical="center">
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
                width={24}
                style={{height: "calc(100vh - 8rem)", top: "3.75rem", left: "-1.5rem"}} 
                background="page" 
                position="fixed"
                border="neutral-alpha-medium"
                vertical="between"
                radius="xl-4"
                padding="8"
                zIndex={9}>
                <MobileMegaMenu
                  overflowY="auto"
                  menuGroups={mobileMenu}
                />
                {promo}
              </Column>
            </Animation>
            <Logo dark icon="/trademarks/icon-dark.svg" wordmark="/trademarks/wordmark-dark.svg" size="s" href="/" brand={{copy: true, url: "/brand"}} />
            <Logo light icon="/trademarks/icon-light.svg" wordmark="/trademarks/wordmark-light.svg" size="s" href="/" brand={{copy: true, url: "/brand"}} />
          </Row>
          
          <Row fillWidth vertical="center" horizontal="end">
            <Row
              m={{hide: true}}
              textVariant="label-default-s"
              fillWidth
              gap="16"
              paddingX="l"
              vertical="center"
            >
              <MegaMenu
                menuGroups={megaMenu}
              />
            </Row>
            <Row fitWidth vertical="center" gap="8">
              <Button size="s" variant="secondary" label="Log in" href="/auth?login" />
              <Button size="s" variant="primary" label="Sign up" href="/auth" />
            </Row>
          </Row>
        </Row>
      </Row>
    </>
  );
};