import {
  Button,
  Input,
  Logo,
  Background,
  Column,
  PasswordInput,
  Row,
  Line,
  SmartLink,
  Heading,
  Meta,
  Schema,
  Mask,
  MatrixFx,
} from "@once-ui-system/core";

import { baseURL, auth } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: auth.auth.title,
    description: auth.auth.description,
    baseURL: baseURL,
    path: auth.auth.path,
    canonical: auth.auth.canonical,
    image: auth.auth.image,
    robots: auth.auth.robots,
    alternates: auth.auth.alternates,
  });
}

export default function Login() {
  return (
    <Row background="page" fill center>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={auth.auth.title}
        description={auth.auth.description}
        path={auth.auth.path}
      />
      <Background
        position="absolute"
        top="0"
        left="0"
        gradient={{
          display: true,
          x: 50,
          y: 0,
          width: 50,
          height: 50,
          colorStart: "neutral-background-medium",
        }}
      />
      <Row fill center position="absolute" top="0" left="0" >
        <Mask maxWidth="l" x={50} y={50} radius={50}>
          <MatrixFx
            size={1.5}
            spacing={5}
            fps={24}
            colors={["brand-solid-strong"]}
            flicker
          />
        </Mask>
      </Row>

      <Column  maxWidth={32} radius="xl" padding="1" overflow="hidden">
        {/* Gradient border */}
        <Background
          position="absolute"
          top="0"
          left="0"
          gradient={{
            display: true,
            x: 0,
            y: 0,
            colorStart: "brand-solid-strong",
          }}
          mask={{
            cursor: true
          }}
        />
        <Background
          position="absolute"
          top="0"
          left="0"
          gradient={{
            display: true,
            x: 100,
            y: 100,
            width: 200,
            height: 200,
            colorStart: "accent-solid-strong",
          }}
          mask={{
            cursor: true,
          }}
        />
        {/* Content */}
        <Column center gap="16" padding="40" fillWidth radius="xl" background="page">
          <Logo href="/" size="l" dark icon="/trademarks/icon-dark.svg" />
          <Logo href="/" size="l" light icon="/trademarks/icon-light.svg" />
          <Heading marginTop="24" variant="display-strong-xs" align="center">
            Welcome to Convert
          </Heading>
          <Row onBackground="neutral-medium" marginBottom="24" gap="4" align="center">
            Log in or
            <SmartLink href="#">sign up</SmartLink>
          </Row>
          <Column fillWidth gap="8">
            <Button
              label="Continue with Google"
              fillWidth
              variant="secondary"
              weight="default"
              prefixIcon="google"
              size="l"
            />
            <Button
              label="Continue with GitHub"
              fillWidth
              variant="secondary"
              weight="default"
              prefixIcon="github"
              size="l"
            />
          </Column>
          <Row fillWidth paddingY="24">
            <Row onBackground="neutral-weak" fillWidth gap="24" vertical="center">
              <Line />/<Line />
            </Row>
          </Row>
          <Column gap="-1" fillWidth>
            <Input id="email" placeholder="Email" radius="top" />
            <PasswordInput id="password" placeholder="Password" radius="bottom" />
          </Column>
          <Row paddingX="12" fillWidth>
            <Button type="button" id="login" label="Log in" arrowIcon fillWidth href="/dashboard" />
          </Row>
        </Column>
      </Column>

    </Row>
  );
};